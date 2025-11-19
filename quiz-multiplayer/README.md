# Quiz Multiplayer - Sistema de Quiz en Temps Real

Sistema de quiz multiplayer sobre "El Transport de Substàncies al Cos Humà" amb connexió per WiFi/LAN.

## Característiques

- Quiz en temps real amb Socket.IO
- Connexió per WiFi/LAN (sense necessitat d'Internet)
- Sistema de puntuació amb bonificació per velocitat
- Classificació en temps real
- 15 preguntes sobre transport de substàncies

## Requisits

- Node.js (versió 14 o superior)
- Navegador web modern
- Tots els dispositius a la mateixa xarxa WiFi/LAN

## Instal·lació

1. Navega a la carpeta del projecte:
```bash
cd quiz-multiplayer
```

2. Instal·la les dependències:
```bash
npm install
```

## Com Utilitzar

### Pas 1: Iniciar el Servidor

```bash
npm start
```

El servidor s'iniciarà al port 3000. Veuràs un missatge similar a:

```
========================================
  Quiz Multiplayer Server
========================================
  Server running on port 3000
  Local: http://localhost:3000
  Network: Check your IP address
========================================
```

### Pas 2: Obtenir la IP del Servidor

Per saber quina IP utilitzar, executa:

**A Linux/Mac:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**A Windows:**
```bash
ipconfig
```

Busca l'adreça IPv4 (per exemple: `192.168.1.100`)

### Pas 3: Fer la Presentació

1. Obre la presentació principal: `presentacio-final.html`
2. Avança fins a l'última diapositiva (38)
3. Fes clic al botó **"Iniciar Quiz Multiplayer"**
4. S'obrirà una nova finestra amb el **Host** del quiz
5. El host generarà automàticament un **codi de 6 dígits**

### Pas 4: Els Jugadors es Connecten

Els estudiants han de:

1. Obrir el navegador al seu mòbil/tablet/ordinador
2. Anar a: `http://[IP-DEL-SERVIDOR]:3000/player.html`
   - Exemple: `http://192.168.1.100:3000/player.html`
3. Introduir el **codi de 6 dígits** mostrat al host
4. Introduir el seu **nom**
5. Fer clic a **"Unir-se"**

### Pas 5: Jugar

1. El host veu tots els jugadors connectats
2. Quan tothom estigui llest, el host fa clic a **"Iniciar Quiz"**
3. El host controla el ritme del quiz (passa les preguntes)
4. Els jugadors responen al seu dispositiu
5. Després de cada pregunta es mostra la classificació
6. Al final, es mostra el podi amb els 3 primers

## Estructura del Projecte

```
quiz-multiplayer/
├── server.js          # Servidor Node.js amb Express i Socket.IO
├── host.html          # Interfície per al presentador (host)
├── player.html        # Interfície per als jugadors
├── package.json       # Dependències del projecte
└── README.md          # Aquest arxiu
```

## Sistema de Puntuació

- **Resposta correcta:** 1000 punts base + bonificació per temps
- **Bonificació per temps:** Fins a 500 punts (25 punts per segon restant)
- **Resposta incorrecta:** 0 punts
- **Temps per pregunta:** 20 segons

### Exemple de Puntuació:
- Resposta correcta en 2 segons: 1000 + (18 × 25) = **1450 punts**
- Resposta correcta en 15 segons: 1000 + (5 × 25) = **1125 punts**
- Resposta incorrecta: **0 punts**

## Preguntes del Quiz

El quiz conté 15 preguntes sobre:
- Transport cel·lular (difusió, osmosi, transport actiu)
- Sistema circulatori (cor, vasos sanguinis, sang)
- Sistema limfàtic
- Metabolisme i salut

## Solució de Problemes

### El servidor no s'inicia

```bash
# Assegura't que el port 3000 no està en ús
# A Linux/Mac:
lsof -ti:3000 | xargs kill -9

# A Windows (PowerShell):
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

### Els jugadors no es poden connectar

1. Verifica que tots els dispositius estan a la mateixa xarxa WiFi
2. Verifica que la IP del servidor és correcta
3. Comprova que el tallafocs no està bloquejant el port 3000
4. Intenta desactivar temporalment el tallafocs per provar

**Permetre el port 3000 al tallafocs (Linux):**
```bash
sudo ufw allow 3000
```

**Permetre el port 3000 al tallafocs (Windows):**
```powershell
netsh advfirewall firewall add rule name="Quiz Server" dir=in action=allow protocol=TCP localport=3000
```

### La presentació no obre el quiz

1. Assegura't que el servidor està en marxa
2. Permet les finestres emergents al navegador
3. Verifica que l'arxiu `quiz-multiplayer/host.html` existeix

## Consells per a la Presentació

1. **Prova abans:** Fes una prova completa abans de la presentació real
2. **IP ben visible:** Escriu la IP en gran a la pissarra per als estudiants
3. **Temps de connexió:** Deixa 2-3 minuts perquè tots es connectin
4. **Ritme controlat:** El host controla el ritme, no hi ha pressa
5. **Pantalla compartida:** Projecta la pantalla del host perquè tots vegin la pregunta

## Tecnologies Utilitzades

- **Backend:** Node.js + Express + Socket.IO
- **Frontend:** HTML5 + CSS3 + JavaScript (vanilla)
- **Comunicació:** WebSockets (Socket.IO)
- **Temps real:** Sincronització de preguntes i classificació

## Autors

- Aissa Rousi
- Ivan Rios
- Roger Omegna
- Unai Jimenez
- Yeremi Suarez

**3r ESO - Projecte de Biologia**

---

**Nota:** Aquest sistema està dissenyat per funcionar en xarxes locals (LAN/WiFi). No requereix connexió a Internet un cop instal·lades les dependències.
