// EXEMPLES DE DIAPOSITIVES AMB VÍDEOS
// Copia i enganxa aquestes diapositives a l'array slidesData[] dins de presentacio-final.html

// ============================================
// EXEMPLE 1: Vídeo de YouTube embegut
// ============================================
{
    content: `
        <div class="slide-bg bg-red-blue"></div>
        <div class="slide-content">
            <h1 class="slide-title">El Cor en Acció</h1>
            <p class="slide-subtitle">Animació 3D del funcionament del cor</p>

            <div style="text-align: center; margin: 30px auto; max-width: 850px;">
                <iframe width="100%" height="480"
                    src="https://www.youtube.com/embed/oHMmtqKgs50"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    style="border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                </iframe>
            </div>

            <div class="highlight-box" style="margin-top: 30px;">
                <p style="font-size: 1.2rem;">Observa com les vàlvules del cor s'obren i es tanquen per evitar que la sang retrocedeixi</p>
            </div>
        </div>
    `
},

// ============================================
// EXEMPLE 2: Vídeo amb text explicatiu al costat
// ============================================
{
    content: `
        <div class="slide-bg bg-blue-red"></div>
        <div class="slide-content">
            <h1 class="slide-title">Sistema Circulatori</h1>
            <p class="slide-subtitle">Vídeo explicatiu + Punts clau</p>

            <div class="two-columns" style="align-items: center;">
                <div class="column">
                    <iframe width="100%" height="350"
                        src="https://www.youtube.com/embed/ZF3XHNF_k2k"
                        frameborder="0"
                        allowfullscreen
                        style="border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                    </iframe>
                </div>
                <div class="column">
                    <h3 style="color: #FFD700; margin-bottom: 20px;">Punts Clau:</h3>
                    <ul class="elegant-list">
                        <li>El cor és una bomba muscular</li>
                        <li>Té 4 cambres: 2 aurícula i 2 ventricles</li>
                        <li>Batega 100.000 vegades al dia</li>
                        <li>Bombeja 7.500 litres de sang diaris</li>
                        <li>La sang fa el recorregut complet en 60 segons</li>
                    </ul>
                </div>
            </div>
        </div>
    `
},

// ============================================
// EXEMPLE 3: Vídeo local (fitxer .mp4)
// ============================================
{
    content: `
        <div class="slide-bg bg-green-dark"></div>
        <div class="slide-content">
            <h1 class="slide-title">Transport Cel·lular</h1>
            <p class="slide-subtitle">Vídeo d'animació microscòpica</p>

            <div style="text-align: center; margin: 30px auto; max-width: 850px;">
                <video width="100%" height="480" controls
                    style="border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                    <source src="video-osmosi.mp4" type="video/mp4">
                    <source src="video-osmosi.webm" type="video/webm">
                    El teu navegador no suporta vídeos HTML5.
                </video>
            </div>

            <p style="margin-top: 20px; color: #d0d0d0; font-size: 1.1rem;">
                Observa com les molècules d'aigua es mouen a través de la membrana
            </p>
        </div>
    `
},

// ============================================
// EXEMPLE 4: Múltiples enllaços a vídeos
// ============================================
{
    content: `
        <div class="slide-bg bg-purple-dark"></div>
        <div class="slide-content">
            <h1 class="slide-title">Recursos en Vídeo</h1>
            <p class="slide-subtitle">Per aprofundir més</p>

            <div style="margin-top: 50px; display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                <div>
                    <a href="https://www.youtube.com/watch?v=oHMmtqKgs50"
                       target="_blank"
                       style="display: block; padding: 30px; font-size: 1.2rem;
                              background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
                              color: white; text-decoration: none; border-radius: 15px;
                              box-shadow: 0 10px 20px rgba(231, 76, 60, 0.4);
                              transition: all 0.3s; text-align: center;"
                       onmouseover="this.style.transform='translateY(-5px)'"
                       onmouseout="this.style.transform='translateY(0)'">
                        <div style="font-size: 3rem; margin-bottom: 10px;">❤️</div>
                        <strong>El Cor Humà</strong>
                        <div style="font-size: 0.9rem; margin-top: 10px; opacity: 0.9;">Anatomia i funcionament</div>
                    </a>
                </div>

                <div>
                    <a href="https://www.youtube.com/watch?v=Vf9s7q5K0Xs"
                       target="_blank"
                       style="display: block; padding: 30px; font-size: 1.2rem;
                              background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
                              color: white; text-decoration: none; border-radius: 15px;
                              box-shadow: 0 10px 20px rgba(231, 76, 60, 0.4);
                              transition: all 0.3s; text-align: center;"
                       onmouseover="this.style.transform='translateY(-5px)'"
                       onmouseout="this.style.transform='translateY(0)'">
                        <div style="font-size: 3rem; margin-bottom: 10px;">🩸</div>
                        <strong>La Sang</strong>
                        <div style="font-size: 0.9rem; margin-top: 10px; opacity: 0.9;">Components i funcions</div>
                    </a>
                </div>

                <div>
                    <a href="https://www.youtube.com/watch?v=uATzPHvLddg"
                       target="_blank"
                       style="display: block; padding: 30px; font-size: 1.2rem;
                              background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
                              color: white; text-decoration: none; border-radius: 15px;
                              box-shadow: 0 10px 20px rgba(52, 152, 219, 0.4);
                              transition: all 0.3s; text-align: center;"
                       onmouseover="this.style.transform='translateY(-5px)'"
                       onmouseout="this.style.transform='translateY(0)'">
                        <div style="font-size: 3rem; margin-bottom: 10px;">💧</div>
                        <strong>Osmosi</strong>
                        <div style="font-size: 0.9rem; margin-top: 10px; opacity: 0.9;">Moviment de l'aigua</div>
                    </a>
                </div>

                <div>
                    <a href="https://www.youtube.com/watch?v=v2QCLS_N8KE"
                       target="_blank"
                       style="display: block; padding: 30px; font-size: 1.2rem;
                              background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
                              color: white; text-decoration: none; border-radius: 15px;
                              box-shadow: 0 10px 20px rgba(52, 152, 219, 0.4);
                              transition: all 0.3s; text-align: center;"
                       onmouseover="this.style.transform='translateY(-5px)'"
                       onmouseout="this.style.transform='translateY(0)'">
                        <div style="font-size: 3rem; margin-bottom: 10px;">🔬</div>
                        <strong>Difusió</strong>
                        <div style="font-size: 0.9rem; margin-top: 10px; opacity: 0.9;">Transport passiu</div>
                    </a>
                </div>
            </div>
        </div>
    `
},

// ============================================
// EXEMPLE 5: Vídeo amb reproducció automàtica (sense so)
// ============================================
{
    content: `
        <div class="slide-bg bg-cyan-dark"></div>
        <div class="slide-content">
            <h1 class="slide-title">Circulació de la Sang</h1>
            <p class="slide-subtitle">Animació en bucle</p>

            <div style="text-align: center; margin: 30px auto; max-width: 850px;">
                <video width="100%" height="480" autoplay muted loop
                    style="border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                    <source src="circulacio-sang.mp4" type="video/mp4">
                    El teu navegador no suporta vídeos HTML5.
                </video>
            </div>

            <p style="margin-top: 20px; color: #FFD700; font-size: 1.2rem;">
                ⚡ El vídeo es reprodueix automàticament en bucle
            </p>
        </div>
    `
},

// ============================================
// EXEMPLE 6: Vídeo amb miniatura personalitzada
// ============================================
{
    content: `
        <div class="slide-bg bg-orange-dark"></div>
        <div class="slide-content">
            <h1 class="slide-title">El Sistema Limfàtic</h1>
            <p class="slide-subtitle">Vídeo amb miniatura</p>

            <div style="text-align: center; margin: 30px auto; max-width: 850px;">
                <video width="100%" height="480" controls
                    poster="imagen-sistema-sanguineo.jpg"
                    style="border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                    <source src="sistema-limfatic.mp4" type="video/mp4">
                    El teu navegador no suporta vídeos HTML5.
                </video>
            </div>

            <p style="margin-top: 20px; color: #d0d0d0;">
                Fes clic al botó de play per començar el vídeo
            </p>
        </div>
    `
},

// ============================================
// EXEMPLE 7: Diapositiva només amb vídeo (pantalla completa)
// ============================================
{
    content: `
        <div class="slide-bg bg-red-blue"></div>
        <div class="slide-content" style="padding: 20px;">
            <h1 class="slide-title" style="margin-bottom: 20px;">Vídeo: Transport de Substàncies</h1>

            <div style="text-align: center; margin: 0 auto; max-width: 95%;">
                <iframe width="100%" height="600"
                    src="https://www.youtube.com/embed/oHMmtqKgs50"
                    frameborder="0"
                    allowfullscreen
                    style="border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                </iframe>
            </div>
        </div>
    `
}
