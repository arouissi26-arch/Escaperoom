// Dades de les diapositives tipus PowerPoint
const slidesData = [
    {
        title: "El Transport de Substàncies al Cos Humà",
        layout: "title",
        content: `
            <div class="slide-content single-column">
                <h1 class="big-title">El Transport de Substàncies<br>al Cos Humà</h1>
                <p style="font-size: 1.8rem; color: #ff9090; margin-top: 30px;">
                    Una exploració interactiva del sistema circulatori
                </p>
                <div style="margin-top: 60px; font-size: 1.3rem; color: #d0d0d0;">
                    <p>Presentat per:</p>
                    <p style="margin-top: 15px;">Aissa Rousi • Ivan Rios • Roger Omegna</p>
                    <p>Unai Jimenez • Yeremi Suarez</p>
                </div>
            </div>
        `
    },
    {
        title: "El Cor",
        subtitle: "La bomba vital del cos humà",
        layout: "image-text",
        imagePosition: "left",
        imagePlaceholder: "Imatge del cor humà",
        content: `
            <div class="slide-content two-columns">
                <div class="slide-image-container">
                    <div class="image-placeholder">
                        [Imatge del cor]
                    </div>
                </div>
                <div class="slide-text-container">
                    <h3 style="font-size: 2rem; margin-bottom: 30px;">Anatomia del Cor</h3>
                    <ul class="bullet-list">
                        <li>4 cambres: 2 aurícules i 2 ventricles</li>
                        <li>Batega 100.000 vegades al dia</li>
                        <li>Bombeja 7.000 litres de sang diàriament</li>
                        <li>No descansa mai durant tota la vida</li>
                    </ul>
                </div>
            </div>
        `
    },
    {
        title: "Circulació Sanguínia",
        subtitle: "Dos circuits en un sol sistema",
        layout: "image-text",
        imagePosition: "right",
        imagePlaceholder: "Diagrama de la circulació",
        content: `
            <div class="slide-content two-columns">
                <div class="slide-text-container">
                    <h3 style="font-size: 2rem; margin-bottom: 30px;">Doble Circulació</h3>
                    <ul class="bullet-list">
                        <li><strong>Circulació Pulmonar:</strong> Cor → Pulmons → Cor</li>
                        <li><strong>Circulació Sistèmica:</strong> Cor → Tot el cos → Cor</li>
                        <li>Ambdues funcionen simultàniament</li>
                        <li>Circuit complet en menys d'1 minut</li>
                    </ul>
                </div>
                <div class="slide-image-container">
                    <div class="image-placeholder">
                        [Diagrama circulació]
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "La Sang",
        subtitle: "El vehicle de transport vital",
        layout: "image-text",
        imagePosition: "left",
        imagePlaceholder: "Components de la sang",
        content: `
            <div class="slide-content two-columns">
                <div class="slide-image-container">
                    <div class="image-placeholder">
                        [Components sang]
                    </div>
                </div>
                <div class="slide-text-container">
                    <h3 style="font-size: 2rem; margin-bottom: 30px;">Composició</h3>
                    <ul class="bullet-list">
                        <li><strong>Plasma (55%):</strong> Part líquida</li>
                        <li><strong>Glòbuls vermells (44%):</strong> Transporten O₂</li>
                        <li><strong>Glòbuls blancs:</strong> Defensa immunitària</li>
                        <li><strong>Plaquetes:</strong> Coagulació</li>
                    </ul>
                </div>
            </div>
        `
    },
    {
        title: "Glòbuls Vermells",
        subtitle: "Els transportadors d'oxigen",
        layout: "image-text",
        imagePosition: "right",
        imagePlaceholder: "Glòbuls vermells microscopi",
        content: `
            <div class="slide-content two-columns">
                <div class="slide-text-container">
                    <h3 style="font-size: 2rem; margin-bottom: 30px;">Eritròcits</h3>
                    <ul class="bullet-list">
                        <li>Forma de disc bicòncau</li>
                        <li>Contenen hemoglobina</li>
                        <li>Viuen 120 dies</li>
                        <li>El cos produeix 2,4 milions per segon</li>
                    </ul>
                </div>
                <div class="slide-image-container">
                    <div class="image-placeholder">
                        [Glòbuls vermells]
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "Artèries i Venes",
        subtitle: "Les carreteres del cos",
        layout: "image-text",
        imagePosition: "left",
        imagePlaceholder: "Artèries i venes",
        content: `
            <div class="slide-content two-columns">
                <div class="slide-image-container">
                    <div class="image-placeholder">
                        [Artèries i venes]
                    </div>
                </div>
                <div class="slide-text-container">
                    <h3 style="font-size: 2rem; margin-bottom: 30px;">Diferències</h3>
                    <ul class="bullet-list">
                        <li><strong>Artèries:</strong> Parets gruixudes, sang oxigenada</li>
                        <li><strong>Venes:</strong> Parets primes, amb vàlvules</li>
                        <li>100.000 km de vasos sanguinis totals</li>
                        <li>Pressió més alta a les artèries</li>
                    </ul>
                </div>
            </div>
        `
    },
    {
        title: "Sistema Limfàtic",
        subtitle: "La xarxa paral·lela de defensa",
        layout: "image-text",
        imagePosition: "right",
        imagePlaceholder: "Sistema limfàtic",
        content: `
            <div class="slide-content two-columns">
                <div class="slide-text-container">
                    <h3 style="font-size: 2rem; margin-bottom: 30px;">Funcions Clau</h3>
                    <ul class="bullet-list">
                        <li>Retorna líquid a la sang</li>
                        <li>Transporta greixos</li>
                        <li>Defensa immunitària</li>
                        <li>600-700 ganglis limfàtics</li>
                    </ul>
                </div>
                <div class="slide-image-container">
                    <div class="image-placeholder">
                        [Sistema limfàtic]
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "Ganglis Limfàtics",
        subtitle: "Estacions de filtratge",
        layout: "image-text",
        imagePosition: "left",
        imagePlaceholder: "Ganglis limfàtics",
        content: `
            <div class="slide-content two-columns">
                <div class="slide-image-container">
                    <div class="image-placeholder">
                        [Ganglis limfàtics]
                    </div>
                </div>
                <div class="slide-text-container">
                    <h3 style="font-size: 2rem; margin-bottom: 30px;">Com Funcionen</h3>
                    <ul class="bullet-list">
                        <li>Filtren la limfa</li>
                        <li>Detecten microorganismes</li>
                        <li>Produeixen anticossos</li>
                        <li>S'inflamen quan estàs malalt</li>
                    </ul>
                </div>
            </div>
        `
    },
    {
        title: "Pulmons",
        subtitle: "Intercanvi de gasos",
        layout: "image-text",
        imagePosition: "right",
        imagePlaceholder: "Pulmons i alvèols",
        content: `
            <div class="slide-content two-columns">
                <div class="slide-text-container">
                    <h3 style="font-size: 2rem; margin-bottom: 30px;">Respiració</h3>
                    <ul class="bullet-list">
                        <li>600 milions d'alvèols</li>
                        <li>Superfície de 70 m²</li>
                        <li>Oxigen entra, CO₂ surt</li>
                        <li>20.000 respiracions al dia</li>
                    </ul>
                </div>
                <div class="slide-image-container">
                    <div class="image-placeholder">
                        [Pulmons]
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "Dades Fascinants",
        subtitle: "El cos humà en xifres",
        layout: "centered",
        content: `
            <div class="slide-content single-column">
                <div class="content-grid" style="max-width: 900px;">
                    <div class="curiosity-box">
                        3.000 milions de batecs del cor en 80 anys
                    </div>
                    <div class="curiosity-box">
                        Circuit sanguini complet en menys d'1 minut
                    </div>
                    <div class="curiosity-box">
                        2,4 milions de glòbuls vermells produïts per segon
                    </div>
                    <div class="curiosity-box">
                        100.000 km de vasos sanguinis
                    </div>
                    <div class="curiosity-box">
                        180 litres de sang filtrats pels ronyons al dia
                    </div>
                    <div class="curiosity-box">
                        El 70% de l'energia neuronal per la bomba Na⁺/K⁺
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "Consells de Salut",
        subtitle: "Cuida el teu sistema circulatori",
        layout: "centered",
        content: `
            <div class="slide-content single-column">
                <div class="content-grid" style="max-width: 1000px;">
                    <div class="grid-item">
                        <div class="grid-item-title">Alimentació Equilibrada</div>
                        <div class="grid-item-content">
                            Fruites, verdures, proteïnes i cereals integrals
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="grid-item-title">Exercici Regular</div>
                        <div class="grid-item-content">
                            Millora la circulació fins a un 300%
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="grid-item-title">Hidratació</div>
                        <div class="grid-item-content">
                            1,5-2 litres d'aigua diàriament
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="grid-item-title">Descans</div>
                        <div class="grid-item-content">
                            8-9 hores de son per nit
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="grid-item-title">Evita el Tabac</div>
                        <div class="grid-item-content">
                            Danya els vasos sanguinis
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="grid-item-title">Controla l'Estrès</div>
                        <div class="grid-item-content">
                            Afecta la pressió arterial
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "Conclusió",
        layout: "centered",
        content: `
            <div class="slide-content single-column">
                <h2 class="big-title">Gràcies per la vostra atenció</h2>
                <div class="info-box" style="margin-top: 50px; max-width: 800px; font-size: 1.3rem; background: rgba(220, 53, 69, 0.2); border: 2px solid #dc3545;">
                    <div class="info-box-content">
                        El transport de substàncies és un procés complex i meravellosament coordinat que treballa les 24 hores del dia per mantenir-nos vius i saludables.
                    </div>
                </div>
                <div style="margin-top: 60px; font-size: 1.2rem; color: #d0d0d0;">
                    <p>Aissa Rousi • Ivan Rios • Roger Omegna</p>
                    <p style="margin-top: 10px;">Unai Jimenez • Yeremi Suarez</p>
                </div>
            </div>
        `
    }
];

// Variables globals
let currentSlide = 0;
let isWelcomeScreen = true;

// Inicialització
document.addEventListener('DOMContentLoaded', () => {
    showWelcomeScreen();
    setupEventListeners();
});

// Mostra la pantalla de benvinguda
function showWelcomeScreen() {
    const container = document.querySelector('.presentation-container');
    container.innerHTML = `
        <div class="welcome-screen">
            <h1 class="welcome-title">El Transport de Substàncies al Cos Humà</h1>
            <p class="welcome-subtitle">Presentació interactiva educativa</p>
            <div class="authors-list">
                <strong>Presentat per:</strong><br>
                Aissa Rousi • Ivan Rios • Roger Omegna<br>
                Unai Jimenez • Yeremi Suarez
            </div>
            <p style="color: #ff9090; font-size: 1.5rem; margin-top: 50px; animation: buttonPulse 2s ease infinite;">
                Fes clic per començar
            </p>
        </div>
    `;
}

// Inicia la presentació
function startPresentation() {
    isWelcomeScreen = false;
    currentSlide = 0;

    const container = document.querySelector('.presentation-container');
    container.innerHTML = '';

    // Crear estructura de diapositives
    slidesData.forEach((slideData, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.id = `slide-${index}`;

        let slideHTML = '';

        if (slideData.subtitle) {
            slideHTML = `
                <h1 class="slide-title">${slideData.title}</h1>
                <p class="slide-subtitle">${slideData.subtitle}</p>
                ${slideData.content}
            `;
        } else {
            slideHTML = slideData.content;
        }

        slide.innerHTML = slideHTML;
        container.appendChild(slide);
    });

    // Mostrar primera diapositiva
    showSlide(0);
}

// Mostra una diapositiva específica
function showSlide(index) {
    const slides = document.querySelectorAll('.slide');

    // Amagar totes
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Mostrar nova diapositiva
    setTimeout(() => {
        slides[index].classList.add('active');
    }, 100);
}

// Diapositiva següent
function nextSlide() {
    if (currentSlide < slidesData.length - 1) {
        const currentSlideEl = document.getElementById(`slide-${currentSlide}`);
        currentSlideEl.classList.add('slide-transition-out');

        setTimeout(() => {
            currentSlide++;
            showSlide(currentSlide);
        }, 500);
    } else {
        // Tornar al principi
        restartPresentation();
    }
}

// Diapositiva anterior
function previousSlide() {
    if (currentSlide > 0) {
        const currentSlideEl = document.getElementById(`slide-${currentSlide}`);
        currentSlideEl.classList.add('slide-transition-out');

        setTimeout(() => {
            currentSlide--;
            showSlide(currentSlide);
        }, 500);
    }
}

// Configurar listeners
function setupEventListeners() {
    // Click a la pantalla
    document.addEventListener('click', (e) => {
        if (isWelcomeScreen) {
            startPresentation();
        } else {
            nextSlide();
        }
    });

    // Teclat
    document.addEventListener('keydown', (e) => {
        if (isWelcomeScreen) {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                startPresentation();
            }
            return;
        }

        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            previousSlide();
        } else if (e.key === 'Home') {
            e.preventDefault();
            currentSlide = 0;
            showSlide(0);
        } else if (e.key === 'End') {
            e.preventDefault();
            currentSlide = slidesData.length - 1;
            showSlide(currentSlide);
        }
    });
}

// Reiniciar presentació
function restartPresentation() {
    isWelcomeScreen = true;
    currentSlide = 0;
    document.querySelectorAll('.slide').forEach(el => el.remove());
    showWelcomeScreen();
}
