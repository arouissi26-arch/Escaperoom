# App d'Estudi / App de Estudio

Una aplicació web d'estudi intel·ligent potenciada per IA que ajuda a processar documents i generar material d'estudi automàticament.

## Característiques

- 📄 **Pujada de documents**: Suporta PDF, DOCX, JPG i PNG amb extracció automàtica de text (OCR)
- 📝 **Resums automàtics**: Genera resums en 3 nivells (curt, mitjà, llarg)
- 🎯 **Quizzes**: Crea quizzes personalitzats amb preguntes multi-opció
- 🃏 **Flashcards**: Genera flashcards amb algoritme de repetició espaciada (SM-2)
- 💡 **Explicador de conceptes**: Cerca i explica conceptes del document
- 🌍 **Multiidioma**: Suport complet per català i castellà
- 🌓 **Tema fosc/clar**: Canvi entre modes amb un clic
- 📱 **Responsive**: Disseny adaptat per mòbil, tablet i escriptori

## Stack Tècnic

### Frontend
- **React 18** amb Vite
- **TailwindCSS** per l'estil
- **Zustand** per gestió d'estat
- **React Dropzone** per pujada d'arxius
- **React Icons** per icones
- **Axios** per peticions HTTP

### Backend
- **Node.js** + **Express**
- **SQLite** per base de dades local
- **Multer** per gestió d'arxius
- **Google Gemini 1.5 Pro** per IA
- **PDF-Parse**, **Mammoth**, **Tesseract.js** per processament de documents
- **Sharp** per optimització d'imatges

## Requisits Previs

- Node.js 18+ i npm
- API Key de Google Gemini (obtén-la a https://makersuite.google.com/app/apikey)

## Instal·lació

### 1. Clonar el repositori

```bash
git clone <url-del-repositorio>
cd study-app
```

### 2. Configurar Backend

```bash
cd backend
npm install
```

Crea un arxiu `.env` basant-te en `.env.example`:

```bash
cp .env.example .env
```

Edita `.env` i afegeix la teva API Key de Gemini:

```
PORT=3000
GEMINI_API_KEY=la_teva_api_key_aqui
MAX_FILE_SIZE=10485760
```

### 3. Configurar Frontend

```bash
cd ../frontend
npm install
```

Crea un arxiu `.env` (opcional):

```bash
cp .env.example .env
```

El contingut per defecte és:

```
VITE_API_URL=http://localhost:3000/api
```

## Execució en Desenvolupament

### Backend

```bash
cd backend
npm run dev
```

El servidor s'executarà a `http://localhost:3000`

### Frontend

En una altra terminal:

```bash
cd frontend
npm run dev
```

L'aplicació s'obrirà a `http://localhost:5173`

## Ús de l'Aplicació

### 1. Pujar un Document

- Clica "Pujar Document" o arrossega un arxiu (PDF, DOCX, JPG, PNG)
- L'aplicació extraurà automàticament el text
- Pots afegir un títol i assignatura

### 2. Generar Resums

- Selecciona un document
- Tria el nivell de resum (curt/mitjà/llarg)
- Clica "Generar resum"
- Pots marcar resums com a favorits

### 3. Crear Quizzes

- Indica quantes preguntes vols (5-50)
- Tria la dificultat (fàcil/mitjà/difícil)
- Respon les preguntes i veu la teva puntuació

### 4. Estudiar amb Flashcards

- Genera flashcards automàticament
- Gira-les per veure la resposta
- Valora com de bé recordes cada targeta (0-5)
- L'algoritme de repetició espaciada les prioritzarà

### 5. Explicar Conceptes

- Cerca un concepte dins del document
- Obté una explicació clara amb exemples i analogies

## Estructura del Projecte

```
study-app/
├── backend/
│   ├── config/          # Configuració de DB
│   ├── routes/          # Rutes de l'API
│   ├── services/        # Lògica de negoci
│   ├── middleware/      # Middleware (Multer)
│   ├── uploads/         # Arxius pujats
│   └── index.js         # Punt d'entrada
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Components React
│   │   ├── services/    # API client
│   │   ├── store/       # Zustand stores
│   │   ├── utils/       # Utilitats (i18n)
│   │   ├── locales/     # Traduccions
│   │   └── App.jsx      # Component principal
│   └── index.html
│
└── README.md
```

## API Endpoints

### Documents
- `GET /api/documents` - Llistar tots els documents
- `POST /api/documents/upload` - Pujar document
- `GET /api/documents/:id` - Obtenir document
- `PUT /api/documents/:id` - Actualitzar document
- `DELETE /api/documents/:id` - Eliminar document

### Resums
- `GET /api/summaries/document/:documentId` - Resums d'un document
- `POST /api/summaries/generate` - Generar resum

### Quizzes
- `POST /api/quiz/generate` - Generar quiz
- `POST /api/quiz/:id/results` - Guardar resultats

### Flashcards
- `POST /api/flashcards/generate` - Generar flashcards
- `PUT /api/flashcards/:id/review` - Actualitzar progres

### Explicar
- `POST /api/explain` - Explicar concepte

## Característiques Tècniques

### Caché de Respostes
El backend implementa un sistema de caché per evitar crides repetides a l'API de Gemini amb els mateixos paràmetres.

### Algoritme de Repetició Espaciada
Les flashcards utilitzen l'algoritme SM-2 per optimitzar l'aprenentatge basat en com recordes cada targeta.

### OCR per Imatges
Les imatges es processen amb Tesseract.js per extreure text automàticament.

### Prompt Engineering
Els prompts per Gemini estan optimitzats per generar contingut educatiu de qualitat en català i castellà.

## Limitacions Actuals

- No hi ha autenticació d'usuaris
- Base de dades SQLite local (no sync cloud)
- Màxim 10MB per arxiu
- No suporta vídeo/àudio

## Futures Millores

- [ ] Sistema de login/registre
- [ ] Sincronització cloud
- [ ] Compartir quizzes amb altres usuaris
- [ ] Exportar a PDF
- [ ] Suport per més idiomes
- [ ] Mode d'estudi cronometrat
- [ ] Estadístiques d'aprenentatge

## Contribuir

Si vols contribuir al projecte, fes un fork i envia un pull request!

## Llicència

MIT

## Contacte

Per preguntes o suggeriments, obre un issue al repositori.

---

Desenvolupat amb ❤️ usant React, Node.js i Google Gemini AI
