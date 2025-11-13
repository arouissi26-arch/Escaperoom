# El Transport de Substàncies al Cos Humà

## 📚 Descripció del Projecte

Aquesta és una aplicació web interactiva educativa que presenta el funcionament del sistema circulatori i el transport de substàncies al cos humà de manera visual i immersiva.

## 👥 Autors

- **Aissa Rousi**
- **Ivan Rios**
- **Roger Omegna**
- **Unai Jimenez**
- **Yeremi Suarez**

## 🎯 Objectius Educatius

L'aplicació permet explorar:

1. **Transport a nivell cel·lular**
   - Transport passiu (difusió simple, osmosi, difusió facilitada)
   - Transport actiu (bomba Na⁺/K⁺)

2. **Sistema circulatori**
   - El cor (aurícules, ventricles, vàlvules)
   - Vasos sanguinis (artèries, venes, capil·lars)
   - La sang (glòbuls vermells, glòbuls blancs, plaquetes, plasma)
   - Circulació pulmonar i sistèmica

3. **Sistema limfàtic**
   - Vasos limfàtics
   - Ganglis limfàtics
   - Funcions de defensa i transport

4. **Òrgans principals**
   - Pulmons (intercanvi de gasos)
   - Fetge (metabolisme i desintoxicació)
   - Estómac i intestins (digestió i absorció)
   - Ronyons (filtratge i depuració)

## 🚀 Com Utilitzar l'Aplicació

### Instal·lació

No cal instal·lació! Simplement obre el fitxer `index.html` amb qualsevol navegador modern:

```bash
# Opció 1: Obre directament amb el navegador
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows

# Opció 2: Amb un servidor local
python3 -m http.server 8000
# Després obre http://localhost:8000 al navegador
```

### Navegació

1. **Pantalla de Benvinguda**
   - Fes clic a "Començar l'Exploració" per iniciar

2. **Barra de Profunditat (esquerra)**
   - Selecciona el nivell que vols visualitzar:
     - 🧑 Pell i epidermis
     - 🩸 Vasos sanguinis
     - 🫁 Òrgans principals
     - ❤️ Cor (nivell més profund)

3. **Model del Cos Humà (centre)**
   - Fes clic a qualsevol element visible per obtenir informació
   - Elements disponibles segons el nivell:
     - **Nivell 0 (Pell)**: Pell, Sang, Sistema Limfàtic
     - **Nivell 1 (Vasos)**: Artèries, Venes
     - **Nivell 2 (Òrgans)**: Estómac, Fetge, Intestins, Ronyons
     - **Nivell 3 (Cor)**: Cor, Pulmons

4. **Panel Informatiu (dreta)**
   - S'obre automàticament quan fas clic a un element
   - Navega per les pestanyes per veure diferents aspectes
   - Fes clic a la "✕" per tancar el panel

## 📖 Contingut Educatiu Inclòs

### Transport Cel·lular
- Mecanismes de transport passiu i actiu
- Bomba de sodi-potassi
- Difusió, osmosi i difusió facilitada

### La Sang
- Composició: plasma, glòbuls vermells, glòbuls blancs, plaquetes
- Funcions de cada component
- Dades quantitatives (volum, producció, vida útil)

### Sistema Limfàtic
- Components: vasos, ganglis, òrgans limfàtics
- Funcions: retorn de líquid, transport de greixos, defensa
- Comparació amb el sistema circulatori

### El Cor
- Anatomia: aurícules i ventricles
- Vàlvules cardíaques (tricúspide, pulmonar, mitral, aòrtica)
- Fases del batec cardíac
- Circulació pulmonar i sistèmica

### Òrgans del Sistema Digestiu i Excretor
- Estómac: digestió
- Fetge: metabolisme i desintoxicació
- Intestins: absorció de nutrients
- Ronyons: filtratge i regulació

## 🎨 Característiques Tècniques

### Tecnologies Utilitzades
- **React 18**: Framework principal
- **Framer Motion**: Animacions fluides
- **Tailwind CSS**: Estils i disseny responsiu
- **SVG**: Gràfics vectorials escalables

### Animacions
- Transicions suaves entre nivells de profunditat
- Efecte de pulsació en elements interactius
- Animació de flux sanguini als vasos
- Fade-in/out en panells informatius

### Disseny Responsiu
- Optimitzat per a PC i tablet
- Paleta de colors pastel amb degradats
- Interfície neta i moderna

## 📊 Durada de la Presentació

L'aplicació està dissenyada per suportar una presentació d'almenys **20 minuts**, amb:
- Navegació per 4 nivells de profunditat
- Més de 10 òrgans/sistemes diferents
- Múltiples pestanyes d'informació per a cada element
- Curiositats i dades fascinants

## 🎓 Ús Educatiu

### Per a Professors
- Eina de demostració per a classes de biologia
- Suport visual per explicar el sistema circulatori
- Contingut basat en documentació científica

### Per a Estudiants
- Aprenentatge interactiu i autoguiat
- Reforç visual dels conceptes teòrics
- Preparació per a exàmens i presentacions

## 📝 Notas Addicionals

- Tots els textos estan en català
- El contingut està basat en el document "EL TRANSPORT DE SUBSTÀNCIES - BIO.pdf"
- Les dades i xifres són científicament precises
- Imatges i colors utilitzats són representatius de l'anatomia real

## 🔧 Requisits del Sistema

- Navegador modern (Chrome, Firefox, Safari, Edge)
- JavaScript habilitat
- Connexió a internet (per carregar CDN de llibreries)
- Resolució mínima recomanada: 1280x720px

## 🐛 Solució de Problemes

Si l'aplicació no funciona correctament:

1. Assegura't que tens una connexió a internet (per als CDN)
2. Obre la consola del navegador (F12) per veure errors
3. Prova amb un navegador diferent
4. Comprova que JavaScript està habilitat
5. Neteja la caché del navegador

## 📧 Contacte

Per a preguntes o suggeriments sobre aquest projecte, contacta amb qualsevol dels autors esmentats.

---

**© 2025 - Projecte Educatiu de Biologia**
