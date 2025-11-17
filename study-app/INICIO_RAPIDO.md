# Inici Ràpid / Inicio Rápido

## Configuració Ràpida (5 minuts)

### 1. Obtenir API Key de Google Gemini

1. Ves a https://makersuite.google.com/app/apikey
2. Inicia sessió amb el teu compte de Google
3. Clica "Create API Key"
4. Copia la clau

### 2. Configurar el Backend

```bash
cd study-app/backend

# Instal·lar dependències
npm install

# Configurar l'API Key
# Edita el fitxer .env i substitueix YOUR_GEMINI_API_KEY_HERE per la teva clau
```

### 3. Configurar el Frontend

```bash
cd study-app/frontend

# Instal·lar dependències
npm install
```

### 4. Executar l'Aplicació

**Terminal 1 - Backend:**
```bash
cd study-app/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd study-app/frontend
npm run dev
```

### 5. Obrir l'Aplicació

Obre el navegador a: **http://localhost:5173**

## Primer Ús

1. **Puja un document**: Clica "Pujar Document" i selecciona un PDF o arxiu Word
2. **Genera un resum**: Un cop processat, clica "Generar resum"
3. **Crea un quiz**: Ves a la pestanya "Quiz" i genera preguntes
4. **Estudia amb flashcards**: Genera flashcards i repassa-les

## Solució de Problemes

### Error: "GEMINI_API_KEY is not defined"
- Assegura't d'haver editat el fitxer `backend/.env`
- La clau API ha d'estar entre cometes: `GEMINI_API_KEY="la_teva_clau"`

### El backend no arrenca
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### El frontend no arrenca
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Error de CORS
- Assegura't que el backend està executant-se a http://localhost:3000
- Verifica que el frontend està a http://localhost:5173

## Consells

- Usa documents amb text clar per millors resultats
- Les imatges haurien de tenir text llegible per l'OCR
- Els PDFs escanejats poden trigar més a processar
- Pots canviar l'idioma entre català i castellà al header

Gaudeix estudiant! 📚✨
