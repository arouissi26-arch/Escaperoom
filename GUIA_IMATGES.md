# Guia per Afegir Imatges Reals a la Presentació

## 📸 Què he Creat

He preparat una **presentació tipus PowerPoint** amb:
- ✅ **12 diapositives** visuals
- ✅ **Animacions professionals** (zoom, slide, bounce)
- ✅ **Espais per a imatges** marcats amb placeholders
- ✅ **Fons verd fosc** (#1a4d2e)
- ✅ **Colors vermells** (#dc3545, #ff6b6b)
- ✅ **Sense emojis**

---

## 📁 Arxius Importants

- **presentacio.html** → Obre aquest arxiu per veure la presentació
- **presentacio-powerpoint.js** → Conté les 12 diapositives
- **styles.css** → Estils i animacions

---

## 🎯 On Van les Imatges

Cada diapositiva té un **placeholder** marcat amb `[Imatge del...]`:

### Diapositiva 2: El Cor
```
[Imatge del cor]
```
**Recomanació:** Imatge anatòmica del cor humà

### Diapositiva 3: Circulació Sanguínia
```
[Diagrama circulació]
```
**Recomanació:** Diagrama que mostri circulació pulmonar i sistèmica

### Diapositiva 4: La Sang
```
[Components sang]
```
**Recomanació:** Diagrama amb plasma, glòbuls vermells, blancs, plaquetes

### Diapositiva 5: Glòbuls Vermells
```
[Glòbuls vermells]
```
**Recomanació:** Microscòpia de glòbuls vermells

### Diapositiva 6: Artèries i Venes
```
[Artèries i venes]
```
**Recomanació:** Diagrama comparatiu artèria vs vena

### Diapositiva 7: Sistema Limfàtic
```
[Sistema limfàtic]
```
**Recomanació:** Diagrama del sistema limfàtic complet

### Diapositiva 8: Ganglis Limfàtics
```
[Ganglis limfàtics]
```
**Recomanació:** Imatge de ganglis limfàtics i la seva ubicació

### Diapositiva 9: Pulmons
```
[Pulmons]
```
**Recomanació:** Diagrama dels pulmons i alvèols

---

## 🔧 Com Afegir les Imatges

### Opció 1: Imatges des d'Internet (Més Ràpid)

1. Guarda les imatges a la carpeta del projecte
2. Edita `presentacio-powerpoint.js`
3. Substitueix el placeholder per:

```javascript
// ABANS:
<div class="image-placeholder">
    [Imatge del cor]
</div>

// DESPRÉS:
<img src="cor.jpg" alt="Cor humà" class="slide-image">
```

### Opció 2: Imatges amb URL Directa

```javascript
<img src="https://link-de-la-imatge.com/cor.jpg" alt="Cor humà" class="slide-image">
```

---

## 📝 Exemple Complet

```javascript
// BUSCA AIXÒ (línia ~20):
<div class="image-placeholder">
    [Imatge del cor]
</div>

// CANVIA PER:
<img src="cor-huma.jpg" alt="Cor humà" class="slide-image">
```

---

## 🖼️ Recomanacions per a les Imatges

### Mida:
- **Amplada:** 800-1200px
- **Alçada:** 600-800px
- **Format:** JPG o PNG

### Qualitat:
- Alta resolució
- Fons transparent (PNG) si és possible
- Colors vius per destacar sobre fons verd

### Fonts Gratuïtes:
- **Unsplash:** unsplash.com (fotos professionals)
- **Pixabay:** pixabay.com (imatges lliures)
- **Wikimedia Commons:** commons.wikimedia.org (imatges educatives)
- **Anatomia:** innerbody.com, kenhub.com

---

## 🎨 Estructura de cada Diapositiva

Totes les diapositives segueixen aquest patró:

```
┌─────────────────────────────────────┐
│   TÍTOL GRAN                        │
│   Subtítol                          │
│                                     │
│  ┌─────────┐   • Punt 1            │
│  │         │   • Punt 2            │
│  │ IMATGE  │   • Punt 3            │
│  │         │   • Punt 4            │
│  └─────────┘                        │
└─────────────────────────────────────┘
```

---

## ⚡ Animacions Incloses

Quan afegeixis les imatges, automàticament tindran:

### **imageZoom:**
Les imatges apareixen amb zoom (0.8 → 1.0)

### **slideInLeft:**
Els punts apareixen des de l'esquerra amb retard progressiu

### **titleBounce:**
Els títols grans fan "bounce" en entrar

---

## 🚀 Prova-ho Ara

1. Obre `presentacio.html` al navegador
2. Fes clic per començar
3. Veuràs els placeholders marcats amb `[Imatge del...]`
4. Substitueix-los seguint la guia de dalt

---

## 📋 Checklist

Abans d'afegir imatges:
- [ ] Guarda les imatges a la carpeta del projecte
- [ ] Renomena-les amb noms clars (cor.jpg, sang.jpg, etc.)
- [ ] Comprova que són JPG o PNG
- [ ] Verifica la mida (800-1200px amplada)

Després d'afegir imatges:
- [ ] Obre presentacio.html al navegador
- [ ] Fes clic per avançar i comprova cada diapositiva
- [ ] Verifica que les imatges es veuen bé
- [ ] Comprova que les animacions funcionen

---

## 💡 Consells Finals

### Si una imatge és massa gran:
```css
/* Afegeix això a styles.css si cal */
.slide-image {
    max-width: 500px; /* Ajusta aquesta xifra */
}
```

### Si vols canviar la posició:
Edita `imagePosition` a cada diapositiva:
- `"left"` → Imatge a l'esquerra
- `"right"` → Imatge a la dreta

---

## 🎯 Quan m'Enviïs les Imatges

Envia'm:
1. Les imatges amb noms clars
2. O els enllaços (URLs) de les imatges
3. I et les posaré jo automàticament a la presentació

---

## ✅ Resultat Final

Amb les imatges afegides tindràs:
- Presentació professional tipus PowerPoint
- Imatges reals d'anatomia
- Animacions fluides
- 12 diapositives completes
- Llesta per presentar a classe

---

**Ara pots enviar-me les imatges i les afegiré!** 📸
