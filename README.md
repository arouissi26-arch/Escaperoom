# El Transport de Substàncies al Cos Humà

Projecte educatiu interactiu per a 3r ESO sobre el transport de substàncies, sistema circulatori i sistema limfàtic.

## 📁 Contingut del Projecte

### Presentació Principal
- **presentacio-final.html** - Presentació completa de 38 diapositives amb animacions i colors variats

### Imatges
- imagen-membrana-celular.jpg - Transport a través de la membrana cel·lular
- imagen-corazon-anatomia.jpg - Anatomia del cor
- imagen-corazon-detall.jpg - Detall del cor humà
- imagen-sistema-sanguineo.jpg - Sistema de vasos sanguinis
- imagen-cuerpo-masculino.jpg - Cos humà complet

### Sistema de Quiz Multiplayer
- **quiz-multiplayer/** - Sistema complet de quiz en temps real per WiFi/LAN
  - server.js - Servidor Node.js amb Socket.IO
  - host.html - Interfície per l'amfitrió/professor
  - player.html - Interfície per als estudiants
  - README.md - Instruccions detallades d'ús

## 🚀 Ús Ràpid

### Opció 1: Només Presentació

1. Descarrega tot el projecte com a ZIP
2. Descomprimeix la carpeta
3. Obre **presentacio-final.html** amb un navegador web
4. Fes clic per avançar entre diapositives
5. A l'última diapositiva pots iniciar el quiz multiplayer

**Controls de la presentació:**
- **Clic esquerre** o **Fletxa dreta** → Següent diapositiva
- **Fletxa esquerra** → Diapositiva anterior
- **Home** → Primera diapositiva
- **End** → Última diapositiva
- **Esc** → Tornar al principi

### Opció 2: Amb Quiz Multiplayer

#### Requisits
- Node.js instal·lat (versió 14 o superior)
- Tots els dispositius a la mateixa xarxa WiFi

#### Passos

1. **Instal·lar dependències:**
```bash
cd quiz-multiplayer
npm install
```

2. **Iniciar el servidor:**
```bash
npm start
```

Veuràs un missatge amb la IP del servidor (ex: `http://192.168.1.100:3000`)

3. **Fer la presentació:**
   - Obre `presentacio-final.html`
   - Avança fins l'última diapositiva
   - Fes clic a "Iniciar Quiz Multiplayer"

4. **Els estudiants es connecten:**
   - Obren el navegador al mòbil/tablet
   - Van a: `http://[IP-DEL-SERVIDOR]:3000/player.html`
   - Introdueixen el codi de 6 dígits
   - Introdueixen el seu nom

5. **Jugar:**
   - L'amfitrió controla el ritme del quiz
   - 15 preguntes sobre transport de substàncies
   - Puntuació amb bonificació per velocitat
   - Classificació en temps real

## 📊 Contingut Educatiu

### Temes Tractats:
1. **Transport Cel·lular**
   - Difusió simple i facilitada
   - Osmosi
   - Transport actiu
   - Endocitosi i exocitosi

2. **Sistema Circulatori**
   - Anatomia del cor (4 cambres)
   - Cicle cardíac (sístole i diàstole)
   - Vasos sanguinis (artèries, venes, capil·lars)
   - Composició de la sang

3. **Sistema Limfàtic**
   - Linfa i vasos limfàtics
   - Funcions de defensa
   - Relació amb el sistema circulatori

4. **Metabolisme i Salut**
   - Nutrients essencials
   - Malalties cardiovasculars
   - Hàbits saludables

## 👥 Autors

**3r ESO - Projecte de Biologia**
- Aissa Rousi
- Ivan Rios
- Roger Omegna
- Unai Jimenez
- Yeremi Suarez

## 📱 Compatibilitat

- **Navegadors:** Chrome, Firefox, Safari, Edge (versions recents)
- **Dispositius:** Ordinadors, tablets i mòbils
- **Sistema Operatiu:** Windows, macOS, Linux, Android, iOS

## ⚙️ Tecnologies Utilitzades

- **Presentació:** HTML5, CSS3, JavaScript (vanilla)
- **Quiz Multiplayer:** Node.js, Express, Socket.IO
- **Comunicació en temps real:** WebSockets

## 📝 Notes

- La presentació funciona **offline** (no cal Internet)
- El quiz multiplayer necessita **xarxa local WiFi/LAN**
- Les dependències del quiz es descarreguen una sola vegada amb `npm install`
- Durada aproximada de la presentació: **25-30 minuts**
- Durada del quiz: **10-15 minuts**

## 🔧 Solució de Problemes

### La presentació no es veu bé
- Assegura't que totes les imatges estan a la mateixa carpeta
- Utilitza un navegador actualitzat
- Obre el fitxer directament (no arrosseguis a una pestanya oberta)

### El quiz no funciona
- Verifica que Node.js està instal·lat: `node --version`
- Verifica que les dependències s'han instal·lat: `npm install`
- Comprova que el port 3000 no està en ús
- Assegura't que tots els dispositius estan a la mateixa xarxa

Per més detalls sobre el quiz, consulta `quiz-multiplayer/README.md`

## 📦 Estructura de Carpetes

```
Escaperoom/
├── presentacio-final.html          # Presentació principal
├── imagen-membrana-celular.jpg     # Imatge 1
├── imagen-corazon-anatomia.jpg     # Imatge 2
├── imagen-corazon-detall.jpg       # Imatge 3
├── imagen-sistema-sanguineo.jpg    # Imatge 4
├── imagen-cuerpo-masculino.jpg     # Imatge 5
├── README.md                       # Aquest fitxer
├── README_PRESENTACIO_FINAL.md     # Documentació de la presentació
└── quiz-multiplayer/               # Sistema de quiz
    ├── server.js                   # Servidor
    ├── host.html                   # Amfitrió
    ├── player.html                 # Jugadors
    ├── package.json                # Dependències
    ├── README.md                   # Instruccions del quiz
    └── node_modules/               # Llibreries (després de npm install)
```

---

**Versió Final - Llista per Descarregar i Utilitzar**

Per qualsevol dubte o problema, revisa els arxius README dins de cada carpeta.
