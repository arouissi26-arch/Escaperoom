// Dades de les diapositives
const slidesData = [
    {
        title: "Introducció",
        subtitle: "Per què és important el transport de substàncies?",
        content: `
            <div class="content-section">
                <div class="content-text">
                    <p>El nostre cos és com una <strong>ciutat molt ben organitzada</strong>. Igual que una ciutat necessita carreteres per transportar aliments, aigua i retirar escombraries, el nostre organisme necessita sistemes que portin nutrients, oxigen i aigua a totes les cèl·lules.</p>
                    <br>
                    <p>Sense aquest transport constant, les cèl·lules no podrien sobreviure.</p>
                </div>
                <div class="info-box">
                    <div class="info-box-title"> Objectiu d'Avui</div>
                    <div class="info-box-content">
                        Explorarem els mecanismes fascinants que fan possible aquest transport vital al cos humà, des del nivell cel·lular fins al sistema circulatori complet.
                    </div>
                </div>
            </div>
            <div class="visual-container content-section">
                <div class="icon-large"></div>
            </div>
        `
    },
    {
        title: "Transport Cel·lular",
        subtitle: "La membrana plasmàtica com a porta d'entrada",
        content: `
            <div class="content-section">
                <h3 style="color: #dc3545; margin-bottom: 20px; font-size: 1.5rem;"> Transport Passiu (sense energia)</h3>
                <ul class="content-list">
                    <li><strong>Difusió simple:</strong> Molècules petites com O₂ i CO₂ travessen directament la membrana</li>
                    <li><strong>Osmosi:</strong> L'aigua es mou a través de proteïnes especials (aquaporines)</li>
                    <li><strong>Difusió facilitada:</strong> Molècules més grans com la glucosa necessiten proteïnes transportadores</li>
                </ul>
                <div class="info-box" style="margin-top: 30px;">
                    <div class="info-box-content">
                         <strong>Exemple:</strong> Quan respirem, l'oxigen entra als pulmons i passa a la sang per difusió simple.
                    </div>
                </div>
            </div>
            <div class="content-section">
                <h3 style="color: #c82333; margin-bottom: 20px; font-size: 1.5rem;"> Transport Actiu (amb energia ATP)</h3>
                <ul class="content-list">
                    <li><strong>Bomba Na⁺/K⁺:</strong> Expulsa 3 ions de sodi i introdueix 2 ions de potassi</li>
                    <li>Essencial per a impulsos nerviosos</li>
                    <li>Necessària per a la contracció muscular</li>
                    <li>Manté l'equilibri cel·lular</li>
                </ul>
                <div class="curiosity-box" style="margin-top: 30px;">
                     Les neurones utilitzen el <strong>70%</strong> de la seva energia només per mantenir aquesta bomba funcionant!
                </div>
            </div>
        `
    },
    {
        title: "La Sang",
        subtitle: "El vehicle de transport del cos",
        content: `
            <div class="content-section">
                <h3 style="color: #dc143c; margin-bottom: 20px; font-size: 1.5rem;"> Composició de la Sang</h3>
                <div class="content-grid">
                    <div class="grid-item">
                        <div class="grid-item-title"> Plasma (55%)</div>
                        <div class="grid-item-content">
                            Aigua, proteïnes, nutrients, hormones. És la part líquida que transporta tots els elements.
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="grid-item-title"> Glòbuls Vermells (44%)</div>
                        <div class="grid-item-content">
                            Transporten oxigen gràcies a l'hemoglobina. Viuen 120 dies.
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="grid-item-title"> Glòbuls Blancs (<1%)</div>
                        <div class="grid-item-content">
                            Soldats del sistema immunitari. Defensen contra infeccions.
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="grid-item-title"> Plaquetes (<1%)</div>
                        <div class="grid-item-content">
                            Responsables de la coagulació. Tanquen ferides.
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-section">
                <h3 style="color: #dc3545; margin-bottom: 20px; font-size: 1.5rem;"> Quantitats</h3>
                <ul class="content-list">
                    <li>Homes: <strong>5,7 litres</strong> de sang</li>
                    <li>Dones: <strong>4,3 litres</strong> de sang</li>
                    <li>Nens/es: <strong>70-75 ml/kg</strong> de pes</li>
                </ul>
                <div class="curiosity-box" style="margin-top: 30px;">
                     El cos produeix <strong>2,4 milions</strong> de glòbuls vermells per segon!
                </div>
                <div class="curiosity-box">
                     Una gota de sang conté <strong>5 milions</strong> de glòbuls vermells
                </div>
            </div>
        `
    },
    {
        title: "El Cor",
        subtitle: "La bomba vital que mai descansa",
        content: `
            <div class="content-section">
                <h3 style="color: #c41e3a; margin-bottom: 20px; font-size: 1.5rem;"> Anatomia del Cor</h3>
                <div class="content-text">
                    <p>El cor és un òrgan muscular del tamany d'un puny que actua com una <strong>bomba doble</strong>. Està dividit en quatre cambres:</p>
                </div>
                <div class="content-grid">
                    <div class="grid-item">
                        <div class="grid-item-title"> Aurícula Dreta</div>
                        <div class="grid-item-content">
                            Rep sang pobra en O₂ de les venes caves i la impulsa al ventricle dret
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="grid-item-title"> Ventricle Dret</div>
                        <div class="grid-item-content">
                            Bombeja sang als pulmons via artèria pulmonar (pressió més baixa)
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="grid-item-title"> Aurícula Esquerra</div>
                        <div class="grid-item-content">
                            Rep sang rica en O₂ de les venes pulmonars i la impulsa al ventricle esquerre
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="grid-item-title"> Ventricle Esquerre</div>
                        <div class="grid-item-content">
                            Bombeja sang a tot el cos via aorta (paret muscular molt gruixuda)
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-section">
                <h3 style="color: #c82333; margin-bottom: 20px; font-size: 1.5rem;"> El Batec Cardíac</h3>
                <ul class="content-list">
                    <li><strong>Diàstole:</strong> Relaxació - Les cambres s'omplen de sang</li>
                    <li><strong>Sístole auricular:</strong> Les aurícules es contrauen</li>
                    <li><strong>Sístole ventricular:</strong> Els ventricles es contrauen amb força</li>
                </ul>
                <div class="curiosity-box" style="margin-top: 30px;">
                     El cor batega aproximadament <strong>100.000 vegades al dia</strong>
                </div>
                <div class="curiosity-box">
                     Durant una vida de 80 anys: <strong>3.000 milions de batecs</strong>
                </div>
            </div>
        `
    },
    {
        title: "Vàlvules Cardíaques",
        subtitle: "Les portes que asseguren el flux correcte",
        content: `
            <div class="content-section single-column">
                <h3 style="color: #dc3545; margin-bottom: 30px; font-size: 1.8rem; text-align: center;"> Les Quatre Vàlvules del Cor</h3>
                <div class="content-grid">
                    <div class="grid-item">
                        <div class="grid-item-title"> Vàlvula Tricúspide</div>
                        <div class="grid-item-content">
                            Entre aurícula i ventricle drets. Té 3 làmines. Es tanca durant la sístole ventricular.
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="grid-item-title"> Vàlvula Pulmonar</div>
                        <div class="grid-item-content">
                            A la sortida del ventricle dret cap a l'artèria pulmonar. Evita el retrocés de la sang.
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="grid-item-title"> Vàlvula Mitral</div>
                        <div class="grid-item-content">
                            Entre aurícula i ventricle esquerres. Té 2 làmines. També anomenada bicúspide.
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="grid-item-title"> Vàlvula Aòrtica</div>
                        <div class="grid-item-content">
                            A la sortida del ventricle esquerre cap a l'aorta. Suporta la pressió més alta.
                        </div>
                    </div>
                </div>
                <div class="info-box" style="margin-top: 40px;">
                    <div class="info-box-title"> El So del Batec</div>
                    <div class="info-box-content">
                        El so doble "lub-dub" és degut al tancament simultani de les vàlvules:
                        <br><br>
                        <strong>"Lub"</strong> → Tancament de tricúspide i mitral
                        <br>
                        <strong>"Dub"</strong> → Tancament de pulmonar i aòrtica
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "Circulació Sanguínia",
        subtitle: "Dos circuits simultanis",
        content: `
            <div class="content-section">
                <h3 style="color: #4169e1; margin-bottom: 20px; font-size: 1.5rem;"> Circulació Pulmonar (Petita)</h3>
                <div class="content-text">
                    <p><strong>Cor → Pulmons → Cor</strong></p>
                </div>
                <ul class="content-list">
                    <li>La sang pobra en O₂ surt del ventricle dret</li>
                    <li>Viatja per l'artèria pulmonar fins als capil·lars pulmonars</li>
                    <li>Als alvèols es produeix l'intercanvi de gasos</li>
                    <li>La sang <strong>perd CO₂</strong> i <strong>guanya O₂</strong></li>
                    <li>Torna al cor per les venes pulmonars</li>
                </ul>
                <div class="info-box" style="margin-top: 20px;">
                    <div class="info-box-content">
                         Pressió més baixa per protegir els delicats capil·lars pulmonars
                    </div>
                </div>
            </div>
            <div class="content-section">
                <h3 style="color: #dc143c; margin-bottom: 20px; font-size: 1.5rem;"> Circulació Sistèmica (Gran)</h3>
                <div class="content-text">
                    <p><strong>Cor → Tot el Cos → Cor</strong></p>
                </div>
                <ul class="content-list">
                    <li>La sang rica en O₂ surt del ventricle esquerre</li>
                    <li>Viatja per l'aorta i les seves ramificacions</li>
                    <li>Arriba als capil·lars de tots els òrgans</li>
                    <li>La sang <strong>perd O₂</strong> i <strong>guanya CO₂</strong></li>
                    <li>Retorna al cor per les venes caves</li>
                </ul>
                <div class="curiosity-box" style="margin-top: 20px;">
                     Ambdues circulacions ocorren <strong>al mateix temps</strong>!
                </div>
                <div class="curiosity-box">
                     La sang completa un circuit complet en <strong>menys d'1 minut</strong>
                </div>
            </div>
        `
    },
    {
        title: "Vasos Sanguinis",
        subtitle: "Les carreteres del cos",
        content: `
            <div class="content-section">
                <h3 style="color: #dc143c; margin-bottom: 20px; font-size: 1.5rem;"> Artèries</h3>
                <div class="content-text">
                    <p>Vasos que transporten sang <strong>rica en oxigen</strong> des del cor cap a tots els teixits.</p>
                </div>
                <ul class="content-list">
                    <li><strong>Parets gruixudes</strong> i elàstiques</li>
                    <li>Suporten <strong>pressió elevada</strong></li>
                    <li>L'aorta és l'artèria més gran (2,5 cm diàmetre)</li>
                    <li>La sang viatja a <strong>5 km/h</strong> a les artèries grans</li>
                </ul>
                <div class="info-box" style="margin-top: 20px;">
                    <div class="info-box-title">Estructura en 3 capes:</div>
                    <div class="info-box-content">
                        • Túnica íntima (interna llisa)<br>
                        • Túnica mitjana (muscular i elàstica)<br>
                        • Túnica adventícia (teixit connectiu extern)
                    </div>
                </div>
            </div>
            <div class="content-section">
                <h3 style="color: #4169e1; margin-bottom: 20px; font-size: 1.5rem;"> Venes</h3>
                <div class="content-text">
                    <p>Vasos que retornen sang <strong>pobra en oxigen</strong> des dels teixits cap al cor.</p>
                </div>
                <ul class="content-list">
                    <li><strong>Parets més primes</strong> que les artèries</li>
                    <li>Pressió sanguínia <strong>més baixa</strong></li>
                    <li>Contenen <strong>vàlvules antiretorn</strong></li>
                    <li>Color blavós visible sota la pell</li>
                </ul>
                <div class="curiosity-box" style="margin-top: 20px;">
                     El cos humà té aproximadament <strong>100.000 km</strong> de vasos sanguinis!
                </div>
                <div class="curiosity-box">
                     Les venes transporten el <strong>70%</strong> del volum sanguini total
                </div>
            </div>
        `
    },
    {
        title: "Sistema Limfàtic",
        subtitle: "La xarxa paral·lela de transport i defensa",
        content: `
            <div class="content-section">
                <h3 style="color: #ff6b6b; margin-bottom: 20px; font-size: 1.5rem;"> Què és el Sistema Limfàtic?</h3>
                <div class="content-text">
                    <p>Una xarxa de transport paral·lela al sistema circulatori que transporta <strong>limfa</strong> (líquid transparent).</p>
                </div>
                <ul class="content-list">
                    <li>Es forma quan el plasma surt dels capil·lars</li>
                    <li>No té glòbuls vermells (per això és transparent)</li>
                    <li>Conté més limfòcits (glòbuls blancs)</li>
                    <li><strong>No té cor</strong> - es mou amb els músculs</li>
                    <li>Circula molt més lentament que la sang</li>
                </ul>
            </div>
            <div class="content-section">
                <h3 style="color: #dc3545; margin-bottom: 20px; font-size: 1.5rem;"> Funcions Principals</h3>
                <div class="grid-item" style="margin-bottom: 20px;">
                    <div class="grid-item-title">1⃣ Retornar Líquid a la Sang</div>
                    <div class="grid-item-content">
                        Cada dia 3 litres de plasma surten dels capil·lars. El sistema limfàtic els recull i retorna.
                    </div>
                </div>
                <div class="grid-item" style="margin-bottom: 20px;">
                    <div class="grid-item-title">2⃣ Transportar Greixos</div>
                    <div class="grid-item-content">
                        Els greixos de l'intestí són massa grans per als capil·lars. Viatgen primer per la limfa.
                    </div>
                </div>
                <div class="grid-item">
                    <div class="grid-item-title">3⃣ Defensa Immunitària</div>
                    <div class="grid-item-content">
                        Els ganglis filtren microorganismes i produeixen anticossos.
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "Ganglis Limfàtics",
        subtitle: "Estacions de control de seguretat",
        content: `
            <div class="content-section single-column">
                <h3 style="color: #dc3545; margin-bottom: 30px; font-size: 1.8rem; text-align: center;"> Els Ganglis Limfàtics</h3>
                <div class="info-box" style="font-size: 1.1rem; margin-bottom: 30px;">
                    <div class="info-box-content">
                        Els ganglis són petits òrgans amb forma de mongeta ubicats al llarg dels vasos limfàtics. Actuen com <strong>"estacions de control de seguretat"</strong> que filtren la limfa.
                    </div>
                </div>
                <div class="content-grid">
                    <div class="grid-item">
                        <div class="grid-item-title"> Entrada de Limfa</div>
                        <div class="grid-item-content">
                            La limfa amb possibles microorganismes entra al gangli
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="grid-item-title"> Examinació</div>
                        <div class="grid-item-content">
                            Els limfòcits examinen el líquid buscant invasors
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="grid-item-title"> Atac</div>
                        <div class="grid-item-content">
                            Si detecten patògens, els ataquen i destrueixen
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="grid-item-title"> Producció</div>
                        <div class="grid-item-content">
                            Produeixen anticossos específics contra la infecció
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="grid-item-title"> Sortida Neta</div>
                        <div class="grid-item-content">
                            La limfa neta i segura surt del gangli
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="grid-item-title"> Ubicacions</div>
                        <div class="grid-item-content">
                            Coll, aixelles, engonals, abdomen i tòrax
                        </div>
                    </div>
                </div>
                <div class="curiosity-box" style="margin-top: 30px;">
                     El cos té entre <strong>600-700 ganglis limfàtics</strong>
                </div>
                <div class="curiosity-box">
                     Quan estàs malalt, els ganglis poden augmentar <strong>10 vegades</strong> de mida!
                </div>
            </div>
        `
    },
    {
        title: "Comparació de Sistemes",
        subtitle: "Circulatori vs Limfàtic",
        content: `
            <div class="content-section single-column">
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>Característica</th>
                            <th>Sistema Circulatori</th>
                            <th>Sistema Limfàtic</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Líquid</strong></td>
                            <td>Sang (vermella)</td>
                            <td>Limfa (transparent)</td>
                        </tr>
                        <tr>
                            <td><strong>Bomba</strong></td>
                            <td>Cor</td>
                            <td>No en té (músculs i vàlvules)</td>
                        </tr>
                        <tr>
                            <td><strong>Circuit</strong></td>
                            <td>Tancat i circular</td>
                            <td>Obert (un sol sentit)</td>
                        </tr>
                        <tr>
                            <td><strong>Velocitat</strong></td>
                            <td>Ràpida (&lt;1 minut)</td>
                            <td>Lenta (hores o dies)</td>
                        </tr>
                        <tr>
                            <td><strong>Funció principal</strong></td>
                            <td>Transport d'O₂ i nutrients</td>
                            <td>Retorn líquid, greixos, defensa</td>
                        </tr>
                        <tr>
                            <td><strong>Longitud</strong></td>
                            <td>97.000 km</td>
                            <td>Encara més extens</td>
                        </tr>
                        <tr>
                            <td><strong>Filtratge</strong></td>
                            <td>Pels ronyons</td>
                            <td>Pels ganglis limfàtics</td>
                        </tr>
                    </tbody>
                </table>
                <div class="info-box" style="margin-top: 40px; font-size: 1.2rem;">
                    <div class="info-box-title"> Conclusió</div>
                    <div class="info-box-content">
                        Ambdós sistemes treballen junts les 24 hores del dia per mantenir l'equilibri i la salut del cos!
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "Òrgans del Sistema Digestiu",
        subtitle: "Processament i absorció de nutrients",
        content: `
            <div class="content-section">
                <h3 style="color: #a0522d; margin-bottom: 20px; font-size: 1.5rem;"> Fetge - La Fàbrica Química</h3>
                <ul class="content-list">
                    <li>Òrgan més gran (pesa 1,5 kg)</li>
                    <li>Més de <strong>500 funcions</strong> diferents</li>
                    <li>Produeix bilis per digerir greixos</li>
                    <li>Desintoxica substàncies nocives</li>
                    <li>Emmagatzema vitamines i ferro</li>
                </ul>
                <div class="curiosity-box" style="margin-top: 20px;">
                     És l'única glàndula que pot <strong>regenerar-se</strong> fins al 75%!
                </div>
            </div>
            <div class="content-section">
                <h3 style="color: #e8b4a0; margin-bottom: 20px; font-size: 1.5rem;"> Intestins - Absorció</h3>
                <div class="grid-item" style="margin-bottom: 15px;">
                    <div class="grid-item-title">Intestí Prim (6-7 metres)</div>
                    <div class="grid-item-content">
                        • Digestió completa dels aliments<br>
                        • Absorció de nutrients a la sang<br>
                        • Superfície d'absorció: <strong>300 m²</strong>!
                    </div>
                </div>
                <div class="grid-item">
                    <div class="grid-item-title">Intestí Gros (1,5 metres)</div>
                    <div class="grid-item-content">
                        • Absorció d'aigua i sals<br>
                        • Conté bilions de bacteris beneficiosos<br>
                        • Síntesi de vitamines K i B
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "Ronyons i Pulmons",
        subtitle: "Filtratge i intercanvi de gasos",
        content: `
            <div class="content-section">
                <h3 style="color: #8b4513; margin-bottom: 20px; font-size: 1.5rem;"> Ronyons - Filtratge</h3>
                <ul class="content-list">
                    <li>Dos òrgans en forma de mongeta</li>
                    <li>Filtren <strong>180 litres</strong> de sang al dia!</li>
                    <li>Produeixen 1-2 litres d'orina diària</li>
                    <li>Cada ronyó té 1 milió de nefrons</li>
                    <li>Regulen l'equilibri d'aigua i sals</li>
                </ul>
                <div class="info-box" style="margin-top: 20px;">
                    <div class="info-box-content">
                         Una persona pot viure amb un sol ronyó - moltes persones donen un ronyó!
                    </div>
                </div>
            </div>
            <div class="content-section">
                <h3 style="color: #ff9999; margin-bottom: 20px; font-size: 1.5rem;"> Pulmons - Intercanvi</h3>
                <ul class="content-list">
                    <li>Superfície dels alvèols: <strong>70 m²</strong></li>
                    <li>600 milions d'alvèols per intercanvi</li>
                    <li>Respirem unes 20.000 vegades al dia</li>
                    <li>Processen 10.000 litres d'aire diàriament</li>
                </ul>
                <div class="curiosity-box" style="margin-top: 20px;">
                     Superfície equivalent a una <strong>pista de tennis</strong>!
                </div>
            </div>
        `
    },
    {
        title: "Curiositats Fascinants",
        subtitle: "Dades que impressionen",
        content: `
            <div class="content-section single-column">
                <div class="content-grid">
                    <div class="curiosity-box">
                         El cor batega <strong>3.000 milions</strong> de vegades durant una vida de 80 anys
                    </div>
                    <div class="curiosity-box">
                         La sang completa un circuit en <strong>menys d'1 minut</strong> (20 segons durant exercici!)
                    </div>
                    <div class="curiosity-box">
                         Els glòbuls vermells fan uns <strong>250.000 viatges</strong> abans de morir
                    </div>
                    <div class="curiosity-box">
                         El cos produeix <strong>2,4 milions</strong> de glòbuls vermells per segon
                    </div>
                    <div class="curiosity-box">
                         La limfa circula a només <strong>0,3 mm/s</strong> (la sang a 30 cm/s)
                    </div>
                    <div class="curiosity-box">
                         Sense sistema limfàtic, <strong>moriríem en 24 hores</strong>
                    </div>
                    <div class="curiosity-box">
                         Les neurones gasten el <strong>70% de la seva energia</strong> en la bomba Na⁺/K⁺
                    </div>
                    <div class="curiosity-box">
                         Tenim <strong>100.000 km</strong> de vasos sanguinis (2,5 vegades la volta al món!)
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "Consells de Salut",
        subtitle: "Cuida el teu sistema de transport",
        content: `
            <div class="content-section single-column">
                <h3 style="color: #dc3545; margin-bottom: 30px; font-size: 1.8rem; text-align: center;"> Com Cuidar els Teus Sistemes</h3>
                <div class="content-grid">
                    <div class="grid-item">
                        <div class="grid-item-title"> Alimentació Equilibrada</div>
                        <div class="grid-item-content">
                            Menja fruites, verdures, proteïnes i cereals integrals. Evita l'excés de sal i greixos saturats.
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="grid-item-title"> Hidratació Adequada</div>
                        <div class="grid-item-content">
                            Beu 1,5-2 litres d'aigua al dia. El 60% del teu cos és aigua!
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="grid-item-title"> Exercici Regular</div>
                        <div class="grid-item-content">
                            Caminar, córrer o nedar millora la circulació sanguínia i limfàtica fins a un 300%.
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="grid-item-title"> Descans Adequat</div>
                        <div class="grid-item-content">
                            Dorm 8-9 hores. Durant el son, el sistema limfàtic neteja el cervell de toxines.
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="grid-item-title"> Evita Hàbits Nocius</div>
                        <div class="grid-item-content">
                            No fumar: el tabac danya els vasos. No abusar de l'alcohol: afecta el fetge.
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="grid-item-title"> Gestió de l'Estrès</div>
                        <div class="grid-item-content">
                            L'estrès afecta la pressió arterial. Practica relaxació i mindfulness.
                        </div>
                    </div>
                </div>
                <div class="info-box" style="margin-top: 40px; font-size: 1.2rem;">
                    <div class="info-box-title"> Recordatori Final</div>
                    <div class="info-box-content">
                        El teu cos és una màquina increïble. Tracta-la amb respecte i t'acompanyarà durant tota la vida!
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "Conclusió",
        subtitle: "Un sistema perfectament coordinat",
        content: `
            <div class="content-section single-column">
                <div class="content-text" style="font-size: 1.2rem; text-align: center; margin-bottom: 40px;">
                    <p>El transport de substàncies en el cos humà és un procés <strong>complex i meravellosament coordinat</strong> que ocorre simultàniament a tres nivells:</p>
                </div>
                <div class="content-grid">
                    <div class="grid-item">
                        <div class="grid-item-title"> Nivell Cel·lular</div>
                        <div class="grid-item-content">
                            La membrana plasmàtica regula què entra i surt mitjançant transport passiu i actiu
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="grid-item-title"> Sistema Circulatori</div>
                        <div class="grid-item-content">
                            Distribueix ràpidament oxigen i nutrients a tot el cos en menys d'1 minut
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="grid-item-title"> Sistema Limfàtic</div>
                        <div class="grid-item-content">
                            Recull líquids, transporta greixos i defensa l'organisme de patògens
                        </div>
                    </div>
                </div>
                <div class="info-box" style="margin-top: 50px; background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); color: white; padding: 40px; font-size: 1.3rem; text-align: center;">
                    <div class="info-box-content" style="color: white;">
                        <strong>Tots aquests sistemes treballen junts les 24 hores del dia, 7 dies a la setmana,</strong> perquè cada una dels bilions de cèl·lules del teu cos rebi el que necessita per viure i funcionar correctament. 
                    </div>
                </div>
                <div style="text-align: center; margin-top: 50px; font-size: 2rem; color: #dc3545;">
                    <strong>Gràcies per la vostra atenció!</strong> 
                </div>
                <div style="text-align: center; margin-top: 20px; font-size: 1.2rem; color: #666;">
                    Aissa Rousi • Ivan Rios • Roger Omegna • Unai Jimenez • Yeremi Suarez
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
            <div class="heart-icon"></div>
            <h1 class="welcome-title">El Transport de Substàncies al Cos Humà</h1>
            <p class="welcome-subtitle">Una experiència interactiva educativa</p>
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
        slide.innerHTML = `
            <h1 class="slide-title">${slideData.title}</h1>
            <p class="slide-subtitle">${slideData.subtitle}</p>
            <div class="slide-content">
                ${slideData.content}
            </div>
        `;
        container.appendChild(slide);
    });

    // Crear controls de navegació
    createNavigation();

    // Mostrar primera diapositiva
    showSlide(0);
}

// Crea els botons de navegació
function createNavigation() {
    // Barra de progrés
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.id = 'progress-bar';
    document.body.appendChild(progressBar);

    // Comptador de diapositives
    const counter = document.createElement('div');
    counter.className = 'slide-counter';
    counter.id = 'slide-counter';
    document.body.appendChild(counter);

    // Botons de navegació
    const navButtons = document.createElement('div');
    navButtons.className = 'nav-buttons';
    navButtons.innerHTML = `
        <button class="nav-btn" id="prev-btn" onclick="previousSlide()">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Anterior
        </button>
        <button class="nav-btn" id="next-btn" onclick="nextSlide()">
            Següent
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
        </button>
    `;
    document.body.appendChild(navButtons);
}

// Mostra una diapositiva específica
function showSlide(index) {
    const slides = document.querySelectorAll('.slide');

    // Ocultar diapositiva actual
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Mostrar nova diapositiva
    slides[index].classList.add('active');

    // Actualitzar comptador
    updateCounter();

    // Actualitzar barra de progrés
    updateProgressBar();

    // Actualitzar estat dels botons
    updateButtons();
}

// Diapositiva següent
function nextSlide() {
    if (currentSlide < slidesData.length - 1) {
        currentSlide++;
        showSlide(currentSlide);
    } else {
        // Tornar al principi
        restartPresentation();
    }
}

// Diapositiva anterior
function previousSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
}

// Actualitza el comptador
function updateCounter() {
    const counter = document.getElementById('slide-counter');
    if (counter) {
        counter.textContent = `${currentSlide + 1} / ${slidesData.length}`;
    }
}

// Actualitza la barra de progrés
function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        const progress = ((currentSlide + 1) / slidesData.length) * 100;
        progressBar.style.width = `${progress}%`;
    }
}

// Actualitza l'estat dels botons
function updateButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (prevBtn) {
        prevBtn.disabled = currentSlide === 0;
    }

    if (nextBtn) {
        nextBtn.disabled = currentSlide === slidesData.length - 1;
        if (currentSlide === slidesData.length - 1) {
            nextBtn.textContent = 'Final';
        } else {
            nextBtn.innerHTML = `
                Següent
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            `;
        }
    }
}

// Configurar listeners de teclat i click
function setupEventListeners() {
    // Click a la pantalla per avançar
    document.addEventListener('click', (e) => {
        if (isWelcomeScreen) {
            startPresentation();
        } else {
            nextSlide();
        }
    });

    // També amb tecles
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

// Funció per reiniciar la presentació
function restartPresentation() {
    isWelcomeScreen = true;
    currentSlide = 0;

    // Eliminar tots els elements
    document.querySelectorAll('.slide, .nav-buttons, .slide-counter, .progress-bar').forEach(el => el.remove());

    // Mostrar pantalla de benvinguda
    showWelcomeScreen();
}
