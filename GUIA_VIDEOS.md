# Com Afegir Vídeos a la Presentació

Hi ha 3 formes principals d'afegir vídeos a `presentacio-final.html`:

## 1️⃣ Vídeos de YouTube (Recomanat)

La forma més fàcil! No cal descarregar res, només necessites l'enllaç de YouTube.

### Com fer-ho:

**Pas 1:** Ves a YouTube i troba el vídeo que vols

**Pas 2:** Fes clic a "Compartir" → "Insertar" (Embed)

**Pas 3:** Copia el codi que comença amb `<iframe>`

**Pas 4:** Afegeix-lo a una diapositiva:

```javascript
{
    content: `
        <div class="slide-bg bg-red-blue"></div>
        <div class="slide-content">
            <h1 class="slide-title">El Cor en Acció</h1>
            <p class="slide-subtitle">Vídeo educatiu</p>

            <!-- VÍDEO DE YOUTUBE -->
            <div style="text-align: center; margin: 30px auto; max-width: 800px;">
                <iframe width="100%" height="450"
                    src="https://www.youtube.com/embed/ID_DEL_VIDEO"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    style="border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                </iframe>
            </div>

            <p style="margin-top: 20px; color: #d0d0d0;">Font: YouTube</p>
        </div>
    `
}
```

### Exemple real amb vídeo del cor:

```javascript
{
    content: `
        <div class="slide-bg bg-red-blue"></div>
        <div class="slide-content">
            <h1 class="slide-title">Com Funciona el Cor?</h1>
            <p class="slide-subtitle">Animació educativa</p>

            <div style="text-align: center; margin: 30px auto; max-width: 800px;">
                <iframe width="100%" height="450"
                    src="https://www.youtube.com/embed/oHMmtqKgs50"
                    frameborder="0"
                    allowfullscreen
                    style="border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                </iframe>
            </div>
        </div>
    `
}
```

**Nota:** Canvia `oHMmtqKgs50` per l'ID del teu vídeo (la part després de `watch?v=` a YouTube)

---

## 2️⃣ Vídeos Locals (fitxers .mp4, .webm)

Si tens un vídeo descarregat al teu ordinador.

### Com fer-ho:

**Pas 1:** Guarda el vídeo a la mateixa carpeta que `presentacio-final.html`

Exemple: `video-cor.mp4`

**Pas 2:** Afegeix-lo a una diapositiva:

```javascript
{
    content: `
        <div class="slide-bg bg-red-blue"></div>
        <div class="slide-content">
            <h1 class="slide-title">El Sistema Circulatori</h1>
            <p class="slide-subtitle">Vídeo explicatiu</p>

            <!-- VÍDEO LOCAL -->
            <div style="text-align: center; margin: 30px auto; max-width: 800px;">
                <video width="100%" height="450" controls
                    style="border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                    <source src="video-cor.mp4" type="video/mp4">
                    <source src="video-cor.webm" type="video/webm">
                    El teu navegador no suporta vídeos HTML5.
                </video>
            </div>
        </div>
    `
}
```

**Opcions del vídeo:**
- `controls` - Mostra controls (play, pausa, volum)
- `autoplay` - Reprodueix automàticament (no recomanat)
- `loop` - Repeteix el vídeo
- `muted` - Sense so (necessari si vols autoplay)

Exemple amb autoplay:
```html
<video width="100%" height="450" autoplay muted loop controls>
    <source src="video-cor.mp4" type="video/mp4">
</video>
```

---

## 3️⃣ Enllaços a Vídeos Externs

Si només vols un botó que obri el vídeo en una nova pestanya.

```javascript
{
    content: `
        <div class="slide-bg bg-red-blue"></div>
        <div class="slide-content">
            <h1 class="slide-title">Recursos Addicionals</h1>
            <p class="slide-subtitle">Vídeos recomanats</p>

            <div style="margin-top: 50px;">
                <!-- BOTÓ PER VÍDEO EXTERN -->
                <a href="https://www.youtube.com/watch?v=oHMmtqKgs50"
                   target="_blank"
                   style="display: inline-block; padding: 20px 40px; font-size: 1.3rem;
                          background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
                          color: white; text-decoration: none; border-radius: 15px;
                          box-shadow: 0 10px 20px rgba(231, 76, 60, 0.4);
                          transition: all 0.3s;"
                   onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 15px 30px rgba(231, 76, 60, 0.6)'"
                   onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 20px rgba(231, 76, 60, 0.4)'">
                    ▶ Veure Vídeo: Com Funciona el Cor
                </a>
            </div>

            <div style="margin-top: 30px;">
                <a href="https://www.youtube.com/watch?v=ALTRE_VIDEO"
                   target="_blank"
                   style="display: inline-block; padding: 20px 40px; font-size: 1.3rem;
                          background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
                          color: white; text-decoration: none; border-radius: 15px;
                          box-shadow: 0 10px 20px rgba(52, 152, 219, 0.4);">
                    ▶ Veure Vídeo: El Sistema Limfàtic
                </a>
            </div>
        </div>
    `
}
```

---

## 🎥 Vídeos Recomanats de YouTube (Gratuïts)

### Sobre el Sistema Circulatori:
- **Com funciona el cor:** https://www.youtube.com/watch?v=oHMmtqKgs50
- **Sistema circulatori:** https://www.youtube.com/watch?v=ZF3XHNF_k2k
- **La sang:** https://www.youtube.com/watch?v=Vf9s7q5K0Xs

### Sobre Transport Cel·lular:
- **Osmosi:** https://www.youtube.com/watch?v=uATzPHvLddg
- **Difusió:** https://www.youtube.com/watch?v=v2QCLS_N8KE

---

## 📝 Exemple Complet: Diapositiva amb Vídeo

Aquí tens un exemple complet llest per copiar i enganxar:

```javascript
// Afegeix això a l'array slidesData[] dins de presentacio-final.html

{
    content: `
        <div class="slide-bg bg-red-blue"></div>
        <div class="slide-content">
            <h1 class="slide-title">El Cor: L'Òrgan que No Para</h1>
            <p class="slide-subtitle">Vídeo educatiu sobre el funcionament del cor</p>

            <div style="text-align: center; margin: 40px auto; max-width: 900px;">
                <!-- Vídeo de YouTube embegut -->
                <iframe width="100%" height="500"
                    src="https://www.youtube.com/embed/oHMmtqKgs50"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    style="border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                </iframe>
            </div>

            <div class="highlight-box" style="margin-top: 30px; max-width: 700px;">
                <p style="font-size: 1.2rem;">El cor batega aproximadament <strong>100.000 vegades al dia</strong>, bombeant uns <strong>7.500 litres de sang</strong>!</p>
            </div>
        </div>
    `
}
```

---

## 🛠️ Com Afegir-ho a la Teva Presentació

### Opció A: Afegir una nova diapositiva

1. Obre `presentacio-final.html` amb un editor de text
2. Busca l'array `slidesData = [` (línia ~490)
3. Afegeix la nova diapositiva amb el vídeo després de qualsevol diapositiva existent
4. Posa una coma `,` després de l'última diapositiva abans de la teva

### Opció B: Reemplaçar una diapositiva existent

1. Troba la diapositiva que vols reemplaçar
2. Substitueix tot el `content: \`...\`` per l'exemple amb vídeo

---

## ⚠️ Consells Importants

✅ **DO:**
- Utilitza vídeos curts (2-5 minuts màxim)
- Comprova que els vídeos funcionen abans de la presentació
- Tingues connexió a Internet si uses vídeos de YouTube
- Prova el so abans de començar

❌ **DON'T:**
- No posis `autoplay` en vídeos amb so (molesta l'audiència)
- No usis vídeos locals molt grans (>50MB) - es carregaran lentament
- No confiïs només en vídeos - tingues contingut de reforç per si falla Internet

---

## 🎬 Exemples de Diapositives amb Vídeos

Vols que et creï algunes diapositives d'exemple amb vídeos integrats? Digues-me:

1. **Quin tema?** (cor, sang, osmosi, etc.)
2. **Vídeo de YouTube o local?**
3. **On vols afegir-lo?** (número de diapositiva o després de quina)

I ho faig ara mateix! 🚀
