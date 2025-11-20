# 🎥 Guia Ràpida: Afegir Vídeos en 3 Passos

## Opció 1: Vídeo de YouTube (MÉS FÀCIL) ⭐

### Pas 1: Troba el vídeo a YouTube
Exemple: `https://www.youtube.com/watch?v=oHMmtqKgs50`

### Pas 2: Copia aquest codi i canvia l'ID

```javascript
{
    content: `
        <div class="slide-bg bg-red-blue"></div>
        <div class="slide-content">
            <h1 class="slide-title">El Teu Títol Aquí</h1>

            <div style="text-align: center; margin: 30px auto; max-width: 850px;">
                <iframe width="100%" height="480"
                    src="https://www.youtube.com/embed/oHMmtqKgs50"
                    frameborder="0" allowfullscreen
                    style="border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                </iframe>
            </div>
        </div>
    `
},
```

**Important:** Canvia `oHMmtqKgs50` per l'ID del teu vídeo (la part després de `v=`)

### Pas 3: Afegeix-ho a presentacio-final.html

1. Obre `presentacio-final.html` amb un editor
2. Busca `slidesData = [` (línia ~490)
3. Afegeix el codi després de qualsevol diapositiva
4. **NO OBLIDIS LA COMA `,` ABANS!**

---

## Opció 2: Enllaç a Vídeo (BOTÓ)

### Només necessites copiar això:

```javascript
{
    content: `
        <div class="slide-bg bg-red-blue"></div>
        <div class="slide-content">
            <h1 class="slide-title">Recursos en Vídeo</h1>

            <div style="margin-top: 50px; text-align: center;">
                <a href="https://www.youtube.com/watch?v=oHMmtqKgs50"
                   target="_blank"
                   style="display: inline-block; padding: 25px 50px; font-size: 1.4rem;
                          background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
                          color: white; text-decoration: none; border-radius: 15px;
                          box-shadow: 0 10px 20px rgba(231, 76, 60, 0.4);">
                    ▶ Veure Vídeo del Cor
                </a>
            </div>
        </div>
    `
},
```

---

## 🎯 Vídeos Recomanats (Gratuïts)

Pots usar aquests vídeos educatius directament:

### Sistema Circulatori
- **El Cor:** `oHMmtqKgs50`
- **Circulació:** `ZF3XHNF_k2k`
- **La Sang:** `Vf9s7q5K0Xs`

### Transport Cel·lular
- **Osmosi:** `uATzPHvLddg`
- **Difusió:** `v2QCLS_N8KE`

**Com usar-los:** Canvia l'ID al codi d'exemple!

---

## 📍 On Afegir el Vídeo?

### Opció A: Al final de la presentació
Afegeix després de la diapositiva 37 (abans de "Gràcies")

### Opció B: A una posició específica
Troba la diapositiva on vols el vídeo i afegeix-lo després

### Exemple visual:

```javascript
const slidesData = [
    // ... diapositives existents ...

    {
        content: `última diapositiva existent`
    },    // ← COMA IMPORTANT!

    // AQUÍ VA LA TEVA NOVA DIAPOSITIVA AMB VÍDEO
    {
        content: `
            <div class="slide-bg bg-red-blue"></div>
            <div class="slide-content">
                <h1 class="slide-title">El Cor</h1>
                <iframe width="100%" height="480"
                    src="https://www.youtube.com/embed/oHMmtqKgs50"
                    frameborder="0" allowfullscreen
                    style="border-radius: 15px;">
                </iframe>
            </div>
        `
    },    // ← COMA SI HI HA MÉS DIAPOSITIVES DESPRÉS

    // ... més diapositives ...
];
```

---

## ⚡ Consells Ràpids

✅ **Fes això:**
- Prova el vídeo abans de la presentació
- Assegura't de tenir Internet (per YouTube)
- Usa vídeos curts (2-5 minuts)

❌ **Evita això:**
- No posis `autoplay` amb so
- No usis vídeos locals molt grans
- No oblidis les comes `,`

---

## 🆘 Resolució d'Errors

### Error: "Unexpected token"
- **Causa:** Falta una coma `,`
- **Solució:** Afegeix `,` després de cada diapositiva excepte l'última

### El vídeo no es veu
- **Causa 1:** ID incorrecte de YouTube
- **Solució:** Revisa l'ID (després de `v=` a YouTube)

- **Causa 2:** Sense Internet
- **Solució:** Connecta't a Internet

### El vídeo es veu molt petit
- **Solució:** Canvia `height="480"` per un número més gran (ex: `600`)

---

## 📦 Arxius d'Ajuda Creats

1. **GUIA_VIDEOS.md** - Guia completa amb tots els detalls
2. **exemples-videos.js** - 7 exemples de diapositives amb vídeos
3. **GUIA_RAPIDA_VIDEOS.md** - Aquest arxiu (guia ràpida)

---

## 🚀 Vols que ho faci jo?

Si em dius:
1. **Quin vídeo vols?** (enllaç de YouTube o tema)
2. **On vols afegir-lo?** (número de diapositiva o "al final")

Ho afegeixo directament a `presentacio-final.html` ara mateix! 😊
