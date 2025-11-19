const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

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
    console.log('Client connected:', socket.id);

    // Host creates a new room
    socket.on('create-room', (callback) => {
        const roomCode = generateRoomCode();
        const room = {
            code: roomCode,
            host: socket.id,
            players: new Map(),
            currentQuestion: -1,
            questionStartTime: null,
            gameState: 'waiting' // waiting, playing, finished
        };

        rooms.set(roomCode, room);
        socket.join(roomCode);
        socket.roomCode = roomCode;
        socket.isHost = true;

        console.log(`Room created: ${roomCode}`);
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
            answers: []
        });

        console.log(`${name} joined room ${code}`);

        // Notify host and all players
        io.to(code).emit('player-joined', {
            players: Array.from(room.players.values()).map(p => ({ name: p.name, score: p.score }))
        });

        callback({ success: true });
    });

    // Host starts the game
    socket.on('start-game', () => {
        const room = rooms.get(socket.roomCode);
        if (!room || room.host !== socket.id) return;

        room.gameState = 'playing';
        room.currentQuestion = 0;

        io.to(socket.roomCode).emit('game-started');
        console.log(`Game started in room ${socket.roomCode}`);
    });

    // Host sends next question
    socket.on('next-question', (questionData) => {
        const room = rooms.get(socket.roomCode);
        if (!room || room.host !== socket.id) return;

        room.currentQuestion++;
        room.questionStartTime = Date.now();

        // Send question to all players (without correct answer)
        io.to(socket.roomCode).emit('question', {
            questionNumber: room.currentQuestion,
            question: questionData.question,
            answers: questionData.answers,
            totalQuestions: questionData.totalQuestions
        });

        console.log(`Question ${room.currentQuestion} sent to room ${socket.roomCode}`);
    });

    // Player submits answer
    socket.on('submit-answer', (data, callback) => {
        const room = rooms.get(socket.roomCode);
        if (!room) return;

        const player = room.players.get(socket.id);
        if (!player) return;

        const { answerIndex, correctAnswer, timeLeft } = data;
        const isCorrect = answerIndex === correctAnswer;

        // Calculate points: 1000 base + time bonus (up to 500 points)
        let points = 0;
        if (isCorrect) {
            points = Math.round(1000 + (timeLeft * 25)); // 20s * 25 = 500 max bonus
        }

        player.score += points;
        player.answers.push({
            questionNumber: room.currentQuestion,
            answerIndex,
            isCorrect,
            points,
            timeUsed: 20 - timeLeft
        });

        // Notify host of the answer
        io.to(room.host).emit('player-answered', {
            playerName: player.name,
            isCorrect,
            points
        });

        callback({ success: true, points, isCorrect });
    });

    // Show results after question
    socket.on('show-results', () => {
        const room = rooms.get(socket.roomCode);
        if (!room || room.host !== socket.id) return;

        const leaderboard = Array.from(room.players.values())
            .map(p => ({ name: p.name, score: p.score }))
            .sort((a, b) => b.score - a.score);

        io.to(socket.roomCode).emit('question-results', { leaderboard });
        console.log(`Results shown in room ${socket.roomCode}`);
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
                correctAnswers: p.answers.filter(a => a.isCorrect).length,
                totalQuestions: p.answers.length
            }))
            .sort((a, b) => b.score - a.score);

        io.to(socket.roomCode).emit('game-ended', {
            leaderboard: finalLeaderboard
        });

        console.log(`Game ended in room ${socket.roomCode}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);

        const roomCode = socket.roomCode;
        if (!roomCode) return;

        const room = rooms.get(roomCode);
        if (!room) return;

        if (socket.isHost) {
            // Host disconnected, notify all players and close room
            io.to(roomCode).emit('host-disconnected');
            rooms.delete(roomCode);
            console.log(`Room ${roomCode} closed (host disconnected)`);
        } else {
            // Player disconnected
            const player = room.players.get(socket.id);
            if (player) {
                room.players.delete(socket.id);
                io.to(roomCode).emit('player-left', {
                    playerName: player.name,
                    players: Array.from(room.players.values()).map(p => ({ name: p.name, score: p.score }))
                });
                console.log(`${player.name} left room ${roomCode}`);
            }
        }
    });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`\n========================================`);
    console.log(`  Quiz Multiplayer Server`);
    console.log(`========================================`);
    console.log(`  Server running on port ${PORT}`);
    console.log(`  Local: http://localhost:${PORT}`);
    console.log(`  Network: Check your IP address`);
    console.log(`========================================\n`);
});
