# 🎯 Presentació Tipus Canvas - El Transport de Substàncies

## 📁 Arxius de la Presentació

Aquest projecte ara inclou **dues versions**:

### 1. Versió Interactiva (index.html)
- Aplicació amb clicks
- Exploració lliure
- Panells laterals
- Millor per a estudi individual

### 2. Versió Presentació (presentacio.html) ⭐ **NOVA**
- **Format tipus Canvas/PowerPoint**
- **Botons per avançar i retrocedir**
- **15 diapositives** preparades
- **Perfecte per a exposició**

---

## 🚀 Com Obrir la Presentació

### Opció 1: Doble Clic (Més Fàcil)
```
Obre "presentacio.html" amb doble clic
```

### Opció 2: Navegador
```
Arrossega "presentacio.html" al navegador
```

### Opció 3: Servidor Local
```bash
python3 -m http.server 8000
# Després obre: http://localhost:8000/presentacio.html
```

---

## ⌨️ Controls de la Presentació

### Amb el Ratolí:
- **Botó "Següent"** → Avança una diapositiva
- **Botó "Anterior"** → Retrocedeix una diapositiva

### Amb el Teclat:
- **Fletxa Dreta** o **Espai** → Següent diapositiva
- **Fletxa Esquerra** → Anterior diapositiva
- **Home** → Primera diapositiva
- **End** → Última diapositiva

---

## 📊 Estructura de la Presentació

### **15 Diapositives** amb tot el contingut:

1. **Introducció** - Per què és important el transport?
2. **Transport Cel·lular** - Passiu i actiu (bomba Na⁺/K⁺)
3. **La Sang** - Composició (plasma, glòbuls, plaquetes)
4. **El Cor** - Anatomia (aurícules i ventricles)
5. **Vàlvules Cardíaques** - Les 4 vàlvules
6. **Circulació Sanguínia** - Pulmonar i sistèmica
7. **Vasos Sanguinis** - Artèries i venes
8. **Sistema Limfàtic** - La xarxa paral·lela
9. **Ganglis Limfàtics** - Estacions de control
10. **Comparació** - Circulatori vs Limfàtic (taula)
11. **Òrgans Digestius** - Fetge, intestins
12. **Ronyons i Pulmons** - Filtratge i intercanvi
13. **Curiositats** - Dades fascinants
14. **Consells de Salut** - Com cuidar-te
15. **Conclusió** - Resum final

**Durada estimada:** 20-25 minuts

---

## 🎨 Característiques de la Presentació

### Animacions CSS:
- ✨ Transicions suaus entre diapositives
- 🌊 Gradient animat al fons
- 💫 Efectes fade-in per al contingut
- 💓 Icona del cor amb animació heartbeat
- 📊 Elements que apareixen progressivament

### Elements Visuals:
- 📈 **Barra de progrés** a la part superior
- 🔢 **Comptador** de diapositives (esquina superior dreta)
- 🎯 **Botons grans** amb efectes hover
- 📦 **Caixes d'informació** destacades
- 🎨 **Colors educatius** (blau, morat, rosa)
- 📊 **Taules comparatives**
- 💡 **Caixes de curiositats** amb gradients

### Responsive:
- 💻 Optimitzat per PC (pantalla gran)
- 📱 Adaptat per tablet
- 🖥️ Perfect per a projectors

---

## 🎬 Mode Presentació

### Abans de Començar:
1. Obre `presentacio.html`
2. Prem **F11** per pantalla completa
3. Fes clic a **"Començar la Presentació"**
4. Navega amb botons o fletxes

### Durant la Presentació:
- Cada diapositiva té títol i subtítol
- El contingut apareix progressivament
- Utilitza els botons grans a la part inferior
- La barra de progrés mostra l'avenç
- El comptador indica diapositiva actual

### Consells:
- 💡 Llegeix el contingut abans de canviar
- ⏸️ Pren pauses per explicar
- 🗣️ Amplia amb exemples propis
- ❓ Deixa espai per a preguntes

---

## 📂 Estructura d'Arxius

```
Escaperoom/
├── presentacio.html     ← NOVA VERSIÓ (Presentació tipus Canvas)
├── styles.css           ← Estils i animacions
├── script.js            ← Lògica de navegació i diapositives
├── index.html           ← Versió interactiva original
├── README.md            ← Documentació original
└── README_PRESENTACIO.md ← Aquesta guia
```

---

## 🎯 Diferències Entre Versions

| Característica | index.html | presentacio.html |
|---------------|------------|------------------|
| Format | Interactiu | Presentació lineal |
| Navegació | Clics lliures | Botons següent/anterior |
| Estructura | Barra lateral + cos | Diapositives completes |
| Millor per a | Exploració | Exposició ordenada |
| Control | Usuari decideix | Flux guiat |
| Durada | Variable | ~20-25 minuts |

---

## ⚙️ Personalització

### Canviar Colors (styles.css):
```css
/* Línia 26-28: Canviar gradient de fons */
background: linear-gradient(135deg, #TeuColor1, #TeuColor2, ...);
```

### Afegir/Eliminar Diapositives (script.js):
```javascript
// Línia 2: Array slidesData
// Afegir nova diapositiva:
{
    title: "El Teu Títol",
    subtitle: "El teu subtítol",
    content: `<div>El teu contingut HTML</div>`
}
```

### Canviar Temps d'Animació (styles.css):
```css
/* Línia 60: Velocitat transició diapositives */
transition: all 0.5s ease;  /* Canvia 0.5s per altra durada */
```

---

## 🔧 Solució de Problemes

### Les diapositives no es mostren:
- ✅ Comprova que `script.js` i `styles.css` estan a la mateixa carpeta
- ✅ Obre la consola del navegador (F12) per veure errors
- ✅ Assegura't que JavaScript està habilitat

### Els botons no funcionen:
- ✅ Espera que la pàgina carregui completament
- ✅ Prova amb un navegador diferent
- ✅ Comprova la consola per errors de JavaScript

### Les animacions van lentes:
- ✅ Tanca altres programes i pestanyes
- ✅ Actualitza el navegador
- ✅ Prova amb Chrome (millor rendiment)

### Pantalla completa no funciona:
- ✅ Prem **F11** (Windows/Linux)
- ✅ Prem **Cmd+Ctrl+F** (Mac)
- ✅ O utilitza el menú del navegador

---

## 📖 Guia Ràpida d'Ús

### Per a l'Exposició de 20 Minuts:

1. **Preparació (abans):**
   - Obre `presentacio.html`
   - Revisa totes les diapositives
   - Practica les transicions
   - Prepara notes addicionals

2. **Inici (diapositiva 0):**
   - Presenteu-vos
   - Fes clic a "Començar"
   - Primera diapositiva: Introducció (2 min)

3. **Desenvolupament (diapositives 1-13):**
   - 1-2 minuts per diapositiva
   - Utilitza les curiositats per captar atenció
   - Explica les taules i gràfics

4. **Tancament (diapositives 14-15):**
   - Consells de salut pràctics
   - Conclusió amb resum
   - Agraïments i preguntes

---

## 🌟 Avantatges d'Aquesta Versió

✅ **Format professional** tipus PowerPoint/Canvas
✅ **No cal internet** per funcionar
✅ **Fàcil de navegar** amb botons grans
✅ **Animacions fluides** que impressionen
✅ **Contingut complet** del PDF inclòs
✅ **Barra de progrés** per control visual
✅ **Responsive** per a qualsevol pantalla
✅ **Controls de teclat** per a presentadors experts

---

## 📞 Suport

Si tens problemes:
1. Revisa aquesta guia
2. Comprova `INICI_RAPID.md` per instruccions bàsiques
3. Consulta la consola del navegador (F12)

---

## 👥 Autors

**Aissa Rousi** • **Ivan Rios** • **Roger Omegna**
**Unai Jimenez** • **Yeremi Suarez**

---

## 🎉 Gaudeix de la Presentació!

Ara tens una eina professional per fer una exposició impressionant sobre el transport de substàncies al cos humà.

**Molta sort! 🍀**

---

**© 2025 - Projecte Educatiu de Biologia**
