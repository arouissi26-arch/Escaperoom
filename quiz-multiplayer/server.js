const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Serve static files
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, '..')));

// Store active rooms
const rooms = new Map();

// Generate random 6-digit room code
function generateRoomCode() {
    let code;
    do {
        code = Math.floor(100000 + Math.random() * 900000).toString();
    } while (rooms.has(code));
    return code;
}

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('✓ Client connected:', socket.id);

    // Host creates a new room
    socket.on('create-room', (callback) => {
        const roomCode = generateRoomCode();
        const room = {
            code: roomCode,
            host: socket.id,
            players: new Map(),
            currentQuestion: 0,
            questionStartTime: null,
            gameState: 'waiting', // waiting, question, results, finished
            answers: new Map() // Store answers for current question
        };

        rooms.set(roomCode, room);
        socket.join(roomCode);
        socket.roomCode = roomCode;
        socket.isHost = true;

        console.log(`📝 Room created: ${roomCode}`);
        callback({ success: true, code: roomCode });
    });

    // Player joins a room
    socket.on('join-room', (data, callback) => {
        const { code, name } = data;
        const room = rooms.get(code);

        if (!room) {
            callback({ success: false, message: 'Codi de sala no vàlid' });
            return;
        }

        if (room.gameState !== 'waiting') {
            callback({ success: false, message: 'La partida ja ha començat' });
            return;
        }

        // Check if name is already taken
        const nameTaken = Array.from(room.players.values()).some(p => p.name === name);
        if (nameTaken) {
            callback({ success: false, message: 'Aquest nom ja està en ús' });
            return;
        }

        socket.join(code);
        socket.roomCode = code;
        socket.playerName = name;

        room.players.set(socket.id, {
            id: socket.id,
            name: name,
            score: 0,
            correctAnswers: 0
        });

        console.log(`👤 ${name} joined room ${code}`);

        // Notify everyone
        const playersList = Array.from(room.players.values()).map(p => ({
            name: p.name,
            score: p.score
        }));

        io.to(code).emit('players-updated', { players: playersList });

        callback({ success: true });
    });

    // Host starts the game
    socket.on('start-game', () => {
        const room = rooms.get(socket.roomCode);
        if (!room || room.host !== socket.id) return;

        if (room.players.size === 0) {
            socket.emit('error-message', 'No hi ha jugadors connectats');
            return;
        }

        room.gameState = 'playing';
        io.to(socket.roomCode).emit('game-started');
        console.log(`🎮 Game started in room ${socket.roomCode}`);
    });

    // Host sends question to all players
    socket.on('show-question', (questionData) => {
        const room = rooms.get(socket.roomCode);
        if (!room || room.host !== socket.id) return;

        room.gameState = 'question';
        room.answers = new Map();
        room.questionStartTime = Date.now();
        room.currentQuestion = questionData.questionNumber;

        // Send to all players (without correct answer)
        io.to(socket.roomCode).emit('question', {
            questionNumber: questionData.questionNumber,
            totalQuestions: questionData.totalQuestions,
            question: questionData.question,
            answers: questionData.answers
        });

        console.log(`❓ Question ${questionData.questionNumber} sent to room ${socket.roomCode}`);
    });

    // Player submits answer
    socket.on('submit-answer', (data, callback) => {
        const room = rooms.get(socket.roomCode);
        if (!room || room.gameState !== 'question') {
            callback({ success: false });
            return;
        }

        const player = room.players.get(socket.id);
        if (!player || room.answers.has(socket.id)) {
            callback({ success: false });
            return;
        }

        const { answerIndex, timeLeft, correctAnswer } = data;
        const isCorrect = answerIndex === correctAnswer;

        // Calculate points
        let points = 0;
        if (isCorrect) {
            points = Math.round(1000 + (timeLeft * 25)); // Max 1500 points
            player.correctAnswers++;
        }
        player.score += points;

        // Store answer
        room.answers.set(socket.id, {
            answerIndex,
            isCorrect,
            points,
            timeLeft
        });

        // Notify host
        io.to(room.host).emit('player-answered', {
            playerName: player.name,
            answeredCount: room.answers.size,
            totalPlayers: room.players.size
        });

        callback({ success: true, isCorrect, points });
    });

    // Host shows results
    socket.on('show-results', (correctAnswer) => {
        const room = rooms.get(socket.roomCode);
        if (!room || room.host !== socket.id) return;

        room.gameState = 'results';

        // Calculate leaderboard
        const leaderboard = Array.from(room.players.values())
            .map(p => ({
                name: p.name,
                score: p.score,
                correctAnswers: p.correctAnswers
            }))
            .sort((a, b) => b.score - a.score);

        // Send results to all
        io.to(socket.roomCode).emit('results', {
            correctAnswer,
            leaderboard
        });

        console.log(`📊 Results shown in room ${socket.roomCode}`);
    });

    // End game
    socket.on('end-game', () => {
        const room = rooms.get(socket.roomCode);
        if (!room || room.host !== socket.id) return;

        room.gameState = 'finished';

        const finalLeaderboard = Array.from(room.players.values())
            .map(p => ({
                name: p.name,
                score: p.score,
                correctAnswers: p.correctAnswers
            }))
            .sort((a, b) => b.score - a.score);

        io.to(socket.roomCode).emit('game-ended', {
            leaderboard: finalLeaderboard
        });

        console.log(`🏁 Game ended in room ${socket.roomCode}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('✗ Client disconnected:', socket.id);

        const roomCode = socket.roomCode;
        if (!roomCode) return;

        const room = rooms.get(roomCode);
        if (!room) return;

        if (socket.isHost) {
            // Host disconnected
            io.to(roomCode).emit('host-disconnected');
            rooms.delete(roomCode);
            console.log(`🗑️  Room ${roomCode} deleted (host left)`);
        } else {
            // Player disconnected
            const player = room.players.get(socket.id);
            if (player) {
                room.players.delete(socket.id);

                const playersList = Array.from(room.players.values()).map(p => ({
                    name: p.name,
                    score: p.score
                }));

                io.to(roomCode).emit('players-updated', { players: playersList });
                console.log(`👋 ${player.name} left room ${roomCode}`);
            }
        }
    });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, '0.0.0.0', () => {
    console.log('\n' + '='.repeat(50));
    console.log('  🎮 QUIZ MULTIPLAYER SERVER');
    console.log('='.repeat(50));
    console.log(`  ✓ Server running on port ${PORT}`);
    console.log(`  🌐 Local: http://localhost:${PORT}`);
    console.log(`  📱 Network: http://[YOUR-IP]:${PORT}`);
    console.log('='.repeat(50) + '\n');
});
