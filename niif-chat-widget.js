/* NIIF PYMES Chat Widget - Loader Externo v2.1 - 3a Edicion Febrero 2025 */
/* KB-first: consulta local antes de llamar a Claude */
(function() {
    'use strict';
    if (document.getElementById('niif-chat-toggle')) return;
    var style = document.createElement('style');
    style.textContent = "\n/* ---- CHAT FLOTANTE NIIF PYMES ---- */\n#niif-chat-toggle {\n  position: fixed;\n  bottom: 28px;\n  right: 28px;\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #C62828, #E53935);\n  color: #fff;\n  border: none;\n  cursor: pointer;\n  font-size: 26px;\n  box-shadow: 0 4px 20px rgba(198,40,40,0.45);\n  z-index: 9999;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: transform .2s, box-shadow .2s;\n}\n#niif-chat-toggle:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(198,40,40,0.6); }\n#niif-chat-badge {\n  position: absolute;\n  top: -4px; right: -4px;\n  background: #F4A811;\n  color: #1B2638;\n  border-radius: 50%;\n  width: 20px; height: 20px;\n  font-size: 11px;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n#niif-chat-window {\n  position: fixed;\n  bottom: 100px;\n  right: 24px;\n  width: 480px;\n  max-height: 640px;\n  background: #fff;\n  border-radius: 18px;\n  box-shadow: 0 8px 40px rgba(0,0,0,0.2);\n  display: flex;\n  flex-direction: column;\n  z-index: 9998;\n  overflow: hidden;\n  transform: scale(0.85) translateY(20px);\n  opacity: 0;\n  pointer-events: none;\n  transition: all .25s cubic-bezier(.4,0,.2,1);\n}\n#niif-chat-window.open {\n  transform: scale(1) translateY(0);\n  opacity: 1;\n  pointer-events: all;\n}\n#niif-chat-header {\n  background: linear-gradient(135deg, #C62828, #B71C1C);\n  color: #fff;\n  padding: 14px 16px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  border-radius: 18px 18px 0 0;\n}\n#niif-chat-header .niif-chat-title { display: flex; align-items: center; gap: 10px; }\n#niif-chat-header .niif-avatar { width: 36px; height: 36px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; }\n#niif-chat-header h3 { margin: 0; font-size: 16px; font-weight: 700; line-height: 1.2; }\n#niif-chat-header p { margin: 0; font-size: 11px; opacity: 0.85; }\n#niif-close-btn { background: none; border: none; color: #fff; font-size: 22px; cursor: pointer; line-height: 1; padding: 0; opacity: 0.85; }\n#niif-close-btn:hover { opacity: 1; }\n#niif-chat-messages {\n  flex: 1;\n  overflow-y: auto;\n  padding: 14px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  background: #F9F4F4;\n  min-height: 200px;\n  max-height: 400px;\n}\n#niif-chat-messages::-webkit-scrollbar { width: 5px; }\n#niif-chat-messages::-webkit-scrollbar-thumb { background: #C62828; border-radius: 3px; }\n.niif-msg-row { display: flex; gap: 8px; align-items: flex-end; }\n.niif-msg-row.user { flex-direction: row-reverse; }\n.niif-msg-avatar { width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, #C62828, #E53935); display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }\n.niif-bubble { max-width: 82%; padding: 9px 13px; border-radius: 14px; font-size: 15px; line-height: 1.55; }\n.niif-bubble.bot { background: #fff; color: #1B2638; border: 1px solid #e5d5d5; border-bottom-left-radius: 4px; }\n.niif-bubble.user { background: linear-gradient(135deg, #C62828, #E53935); color: #fff; border-bottom-right-radius: 4px; }\n.niif-typing { display: none; align-items: flex-end; gap: 8px; }\n.niif-typing .niif-dots { background: #fff; border: 1px solid #e5d5d5; border-radius: 14px; border-bottom-left-radius: 4px; padding: 10px 14px; display: flex; gap: 4px; }\n.niif-typing .niif-dots span { width: 7px; height: 7px; background: #C62828; border-radius: 50%; animation: niifBounce 1.2s infinite ease-in-out; }\n.niif-typing .niif-dots span:nth-child(2) { animation-delay: .2s; }\n.niif-typing .niif-dots span:nth-child(3) { animation-delay: .4s; }\n@keyframes niifBounce { 0%,80%,100% { transform: translateY(0); } 40% { transform: translateY(-7px); } }\n#niif-chat-suggestions { padding: 8px 12px 4px; display: flex; flex-wrap: wrap; gap: 6px; background: #F9F4F4; border-top: 1px solid #f0e0e0; }\n.niif-suggestion { background: #fff; border: 1px solid #C62828; color: #C62828; border-radius: 20px; padding: 4px 11px; font-size: 13px; cursor: pointer; transition: all .15s; white-space: nowrap; }\n.niif-suggestion:hover { background: #C62828; color: #fff; }\n#niif-chat-input-area { display: flex; padding: 10px 12px; gap: 8px; border-top: 1px solid #f0e0e0; background: #fff; }\n#niif-chat-input { flex: 1; border: 1px solid #ddd; border-radius: 22px; padding: 9px 14px; font-size: 15px; outline: none; font-family: inherit; color: #1B2638; }\n#niif-chat-input:focus { border-color: #C62828; }\n#niif-chat-send { background: linear-gradient(135deg, #C62828, #E53935); border: none; border-radius: 50%; width: 38px; height: 38px; color: #fff; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: transform .15s; }\n#niif-chat-send:hover { transform: scale(1.1); }\n@media (max-width: 420px) { #niif-chat-window { width: calc(100vw - 20px); right: 10px; } }\n";
    document.head.appendChild(style);
    var container = document.createElement('div');
    container.innerHTML = '<button id="niif-chat-toggle" title="Asistente NIIF para PYMES">\uD83D\uDCDA<span id="niif-chat-badge">1</span></button><div id="niif-chat-window"><div id="niif-chat-header"><div class="niif-chat-title"><div class="niif-avatar">\uD83D\uDCDA</div><div><h3>Asistente NIIF PYMES</h3><p>IA Conversacional \u2013 3a ed. Febrero 2025</p></div></div><button id="niif-close-btn" title="Cerrar">\u2715</button></div><div id="niif-chat-messages"></div><div class="niif-typing" id="niif-typing"><div class="niif-msg-avatar">\uD83D\uDCDA</div><div class="niif-dots"><span></span><span></span><span></span></div></div><div id="niif-chat-suggestions"><button class="niif-suggestion" data-msg="\u00BFQu\u00E9 son las NIIF para PYMES?">\u00BFQu\u00E9 son NIIF PYMES?</button><button class="niif-suggestion" data-msg="Novedades 3a edicion 2025">Novedades 3a ed.</button><button class="niif-suggestion" data-msg="concepto de activo">Concepto de Activo</button><button class="niif-suggestion" data-msg="Secci\u00F3n 23 ingresos">S23 Ingresos</button><button class="niif-suggestion" data-msg="Secci\u00F3n 20 arrendamientos">S20 Arrendamientos</button><button class="niif-suggestion" data-msg="Secci\u00F3n 29 impuesto diferido">S29 Imp. Diferido</button><button class="niif-suggestion" data-msg="Diferencias NIIF PYMES vs NIIF completas">PYMES vs Completas</button></div><div id="niif-chat-input-area"><input type="text" id="niif-chat-input" placeholder="Pregunta sobre NIIF PYMES 2025..." autocomplete="off" /><button id="niif-chat-send" title="Enviar">\u27A4</button></div></div>';
    document.body.appendChild(container);
  (function () {
      var ANTHROPIC_API_KEY = "use-cloudflare-worker";
      var KB = {
            "que son niif pymes": "Las <strong>NIIF para PYMES</strong> son la Norma de Contabilidad del IASB para entidades sin obligaci\u00f3n p\u00fablica de rendir cuentas. La <strong>3a edici\u00f3n, febrero 2025</strong>, contiene 35 secciones y es aplicable a partir de periodos que comiencen el 1 de enero de 2027 (adopci\u00f3n anticipada permitida).",
            "que es niif pymes": "Las <strong>NIIF para PYMES</strong> son normas contables para entidades sin obligaci\u00f3n p\u00fablica de rendir cuentas. <strong>3a edici\u00f3n 2025</strong>: 35 secciones, IASB, febrero 2025. Vigencia: periodos desde 1 enero 2027.",
            "novedades 3a edicion 2025": "<strong>Principales cambios 3a edici\u00f3n (Febrero 2025):</strong><br>\u2022 S2: Definiciones activo/pasivo alineadas al MC 2018 (sin 'probable' en la definici\u00f3n).<br>\u2022 S11: Eliminaci\u00f3n opci\u00f3n NIC 39; reclasificaci\u00f3n prospectiva (p\u00e1rr. 11.11A).<br>\u2022 S12: Nueva secci\u00f3n exclusiva de valor razonable.<br>\u2022 S20: Mantiene clasificaci\u00f3n financiero/operativo (p\u00e1rr. 20.4).<br>\u2022 S23: Modelo 5 pasos para ingresos (similar NIIF 15).<br>\u2022 S28: Actuariales en resultados u ORI (opci\u00f3n, p\u00e1rr. 28.24).<br>\u2022 S17: Prohibe depreciaci\u00f3n basada en ingresos (p\u00e1rr. 17.22).",
            "novedades 3a edicion": "<strong>Cambios 3a edici\u00f3n 2025:</strong><br>\u2022 S2: activo/pasivo sin 'probable' en definici\u00f3n.<br>\u2022 S11: sin opci\u00f3n NIC 39.<br>\u2022 S12: nueva secci\u00f3n VR.<br>\u2022 S23: 5 pasos ingresos.<br>\u2022 S17: depreciaci\u00f3n por ingresos prohibida.<br>\u2022 S28: actuariales en resultados u ORI.",
            "vigencia": "<strong>Vigencia 3a edici\u00f3n:</strong> Periodos anuales que comiencen a partir del <strong>1 de enero de 2027</strong>. Adopci\u00f3n anticipada permitida.",
            "concepto de activo": "<strong>Activo \u2013 3a edici\u00f3n (p\u00e1rr. 2.44):</strong><br>\u2018Un recurso econ\u00f3mico presente controlado por la entidad como resultado de sucesos pasados.\u2019<br><br><strong>CAMBIO CLAVE vs 2a edici\u00f3n:</strong> Se elimin\u00f3 la frase \u2018del que la entidad espera obtener, en el futuro, beneficios econ\u00f3micos\u2019. La probabilidad de beneficios ya <strong>NO</strong> es requisito de la definici\u00f3n; pas\u00f3 a ser criterio de <strong>reconocimiento</strong>.<br><br><strong>Recurso econ\u00f3mico (p\u00e1rr. 2.45):</strong> Derecho con potencial de producir BEF. No tiene que ser seguro ni probable para que exista ese potencial.",
            "activo": "<strong>Activo \u2013 3a edici\u00f3n (p\u00e1rr. 2.44):</strong><br>\u2018Un recurso econ\u00f3mico presente controlado por la entidad como resultado de sucesos pasados.\u2019<br><strong>CAMBIO:</strong> Ya no se exige \u2018beneficios econ\u00f3micos futuros probables\u2019 en la definici\u00f3n. La probabilidad es ahora criterio de reconocimiento (p\u00e1rr. 2.45).",
            "definicion activo": "<strong>Activo (3a ed. p\u00e1rr. 2.44):</strong> Recurso econ\u00f3mico presente controlado por la entidad como resultado de sucesos pasados. Un recurso econ\u00f3mico es un derecho con potencial de producir beneficios econ\u00f3micos. La probabilidad ya no forma parte de la definici\u00f3n.",
            "activo 3a edicion": "<strong>Activo 3a edici\u00f3n (p\u00e1rr. 2.44):</strong> Recurso econ\u00f3mico presente controlado por la entidad como resultado de sucesos pasados. La probabilidad pas\u00f3 de definici\u00f3n a reconocimiento. Alineado con Marco Conceptual IASB 2018.",
            "concepto de pasivo": "<strong>Pasivo \u2013 3a edici\u00f3n (p\u00e1rr. 2.49):</strong><br>\u2018Una obligaci\u00f3n presente de la entidad de transferir un recurso econ\u00f3mico como resultado de sucesos pasados.\u2019<br><strong>CAMBIO:</strong> Ya no se exige \u2018probable salida de recursos\u2019 en la definici\u00f3n.",
            "pasivo": "<strong>Pasivo \u2013 3a edici\u00f3n (p\u00e1rr. 2.49):</strong> Obligaci\u00f3n presente de la entidad de transferir un recurso econ\u00f3mico como resultado de sucesos pasados. La probabilidad ya no forma parte de la definici\u00f3n.",
            "definicion pasivo": "<strong>Pasivo (3a ed. p\u00e1rr. 2.49):</strong> Obligaci\u00f3n presente de la entidad de transferir un recurso econ\u00f3mico como resultado de sucesos pasados.",
            "seccion 2": "<strong>Secci\u00f3n 2 \u2013 Conceptos y Principios (3a ed.):</strong> Alineada al Marco Conceptual IASB 2018.<br><strong>Activo (p\u00e1rr. 2.44):</strong> Recurso econ\u00f3mico presente controlado por la entidad como resultado de sucesos pasados.<br><strong>Pasivo (p\u00e1rr. 2.49):</strong> Obligaci\u00f3n presente de transferir un recurso econ\u00f3mico como resultado de sucesos pasados.<br>La probabilidad ya no es parte de la definici\u00f3n; es un factor de reconocimiento.",
            "marco conceptual": "<strong>Marco Conceptual (3a ed. S2):</strong> La 3a edici\u00f3n alinea S2 con el MC IASB 2018. Reincorpora la prudencia junto con la neutralidad. Activo y pasivo redefinidos sin exigir probabilidad en la definici\u00f3n.",
            "seccion 1": "<strong>Secci\u00f3n 1:</strong> NIIF PYMES aplica a entidades que: (a) no tienen obligaci\u00f3n p\u00fablica de rendir cuentas, y (b) publican EE.FF. de prop\u00f3sito general. Excluye bancos, aseguradoras y entidades con instrumentos cotizados.",
            "obligacion publica": "<strong>Obligaci\u00f3n p\u00fablica (S1):</strong> Existe si instrumentos de deuda/patrimonio cotizan en mercado p\u00fablico, o la entidad mantiene activos en calidad fiduciaria para un amplio grupo.",
            "estados financieros": "<strong>Conjunto completo EE.FF. (S3):</strong><br>1. Situaci\u00f3n Financiera (S4)<br>2. Resultado Integral (S5)<br>3. Cambios en Patrimonio (S6)<br>4. Flujos de Efectivo (S7)<br>5. Notas (S8)<br>Comparativos obligatorios de un periodo anterior.",
            "flujo efectivo": "<strong>Flujos de Efectivo (S7):</strong> Operaci\u00f3n, Inversi\u00f3n, Financiamiento. Equivalentes: hasta 3 meses.",
            "seccion 9": "<strong>S9 \u2013 Consolidaci\u00f3n (3a ed.):</strong> Control = modelo 3 elementos (p\u00e1rr. 9.4A): Poder + Rendimientos variables + V\u00ednculo. CAMBIO: reemplaza el criterio de mayor\u00eda de votos (>50%) por sustancia econ\u00f3mica. Presunci\u00f3n refutable (p\u00e1rr. 9.5).",
            "modelo control": "<strong>Modelo control 3a ed. (p\u00e1rr. 9.4A):</strong> Poder sobre actividades relevantes + Exposici\u00f3n a rendimientos variables + Capacidad de usar el poder para influir en esos rendimientos. Aplica a S9, S15 y S19.",
            "seccion 10": "<strong>S10 \u2013 Pol\u00edticas, Estimaciones y Errores (3a ed.):</strong> Nueva definici\u00f3n de \u2018estimaci\u00f3n contable\u2019 (p\u00e1rr. 10.14A). Pol\u00edtica: retroactivo. Estimaci\u00f3n: prospectivo. Errores: correcci\u00f3n retroactiva.",
            "seccion 11": "<strong>S11 \u2013 Instrumentos Financieros (3a ed.):</strong> Se elimin\u00f3 la opci\u00f3n NIC 39. Instrumentos b\u00e1sicos: costo amortizado. Reclasificaci\u00f3n: solo cuando cambia el modelo de negocio, prospectiva (p\u00e1rr. 11.11A).",
            "instrumentos financieros basicos": "<strong>Instrumentos b\u00e1sicos (S11):</strong> Efectivo, dep\u00f3sitos, CxC/CxP, pr\u00e9stamos simples, bonos simples. Costo amortizado con tasa de inter\u00e9s efectiva.",
            "costo amortizado": "<strong>Costo Amortizado (S11):</strong> Distribuye flujos contractuales con tasa de inter\u00e9s efectiva. Separa cada cuota en inter\u00e9s y capital.",
            "seccion 12": "<strong>S12 \u2013 Valor Razonable (3a ed. \u2014 nueva secci\u00f3n):</strong> Unifica todos los requerimientos de VR. Precio de salida entre participantes del mercado. Jerarqu\u00eda: Nivel 1 (cotizado), Nivel 2 (observable), Nivel 3 (no observable).",
            "valor razonable": "<strong>Valor Razonable (S12):</strong> Precio de salida entre participantes del mercado en transacci\u00f3n ordenada. Nivel 1: mayor prioridad. Nivel 3: menor prioridad.",
            "seccion 13": "<strong>S13 \u2013 Inventarios:</strong> Menor entre costo y VNR. FIFO o Promedio Ponderado. Prohibido LIFO.",
            "inventarios": "<strong>Inventarios (S13):</strong> Menor entre costo y VNR. FIFO o Promedio (sin LIFO). VNR = precio venta estimado \u2212 costos de terminaci\u00f3n y venta.",
            "seccion 17": "<strong>S17 \u2013 PPE (3a ed.):</strong> Costo \u2212 depreciaci\u00f3n \u2212 deterioro. Sin revaluaci\u00f3n. Plantas productoras medibles por separado: incluidas (p\u00e1rr. 17.3(a)). Depreciaci\u00f3n basada en ingresos: <strong>PROHIBIDA</strong> (p\u00e1rr. 17.22).",
            "ppe propiedades planta": "<strong>PPE (S17):</strong> Costo \u2212 depreciaci\u00f3n \u2212 deterioro. Sin revaluaci\u00f3n. Sin depreciaci\u00f3n por ingresos (prohibida 3a ed.).",
            "depreciacion": "<strong>Depreciaci\u00f3n (S17):</strong> Lineal, unidades de producci\u00f3n o saldo decreciente. M\u00e9todo basado en ingresos: no apropiado (p\u00e1rr. 17.22, 3a ed.).",
            "depreciacion ingresos": "<strong>Depreciaci\u00f3n basada en ingresos (p\u00e1rr. 17.22):</strong> PROHIBIDA en 3a ed. para PPE e intangibles. Los ingresos no son proxy v\u00e1lido del consumo del activo.",
            "plantas productoras": "<strong>Plantas productoras (p\u00e1rr. 17.3(a), 3a ed.):</strong> CAMBIO: migran de S34 (valor razonable) a S17 (costo \u2212 depreciaci\u00f3n \u2212 deterioro) cuando pueden medirse por separado.",
            "seccion 18": "<strong>S18 \u2013 Intangibles:</strong> Costo \u2212 amortizaci\u00f3n \u2212 deterioro. Sin revaluaci\u00f3n. Vida indefinida: deterioro anual. Depreciaci\u00f3n por ingresos: no apropiada (3a ed.).",
            "seccion 19": "<strong>S19 \u2013 Combinaciones (3a ed.):</strong> M\u00e9todo adquisici\u00f3n. Plusval\u00eda: no amortizar, deterioro anual. Contraprestaci\u00f3n contingente: revisada en 3a ed.",
            "plusvalia": "<strong>Plusval\u00eda (S19):</strong> Precio \u2212 VR activos netos. No amortiza. Deterioro anual obligatorio. No reversible.",
            "seccion 20": "<strong>S20 \u2013 Arrendamientos (3a ed.):</strong> MANTIENE clasificaci\u00f3n financiero/operativo (p\u00e1rr. 20.4). NO adopt\u00f3 modelo \u00fanico de NIIF 16.<br>Arrendatario financiero (p\u00e1rr. 20.9): activo + pasivo al menor entre VR y VP pagos m\u00ednimos.<br>Arrendatario operativo (p\u00e1rr. 20.15): gasto lineal.",
            "arrendamiento": "<strong>Arrendamientos (S20, 3a ed.):</strong> Clasificaci\u00f3n fin/op vigente. Financiero: activo + pasivo. Operativo: gasto lineal.",
            "seccion 21": "<strong>S21 \u2013 Provisiones (3a ed.):</strong> Obligaci\u00f3n presente + probable + estimable. Reestructuraci\u00f3n (p\u00e1rr. 21.6A-21.6B): plan formal con 5 elementos + expectativa real, ambas simult\u00e1neas. Garant\u00edas intragrupo gratuitas: incluidas (p\u00e1rr. 21.1A).",
            "provision": "<strong>Provisiones (S21):</strong> Obligaci\u00f3n presente + probable salida + estimaci\u00f3n fiable.",
            "reestructuracion": "<strong>Reestructuraci\u00f3n (p\u00e1rr. 21.6A, 3a ed.):</strong> Plan formal con 5 elementos + expectativa real v\u00e1lida, ambas simult\u00e1neas. La 2a ed. solo exig\u00eda plan + comunicaci\u00f3n O inicio.",
            "seccion 23": "<strong>S23 \u2013 Ingresos (3a ed. \u2014 renovada):</strong> Modelo 5 pasos:<br>1. (p\u00e1rr. 23.6) Contrato con derechos/obligaciones exigibles.<br>2. (p\u00e1rr. 23.14) Compromisos del contrato.<br>3. (p\u00e1rr. 23.23) Precio de la transacci\u00f3n.<br>4. (p\u00e1rr. 23.39) Asignar precio a compromisos.<br>5. (p\u00e1rr. 23.52) Reconocer al transferir control.",
            "5 pasos ingresos": "<strong>Modelo 5 pasos S23 (3a ed.):</strong><br>Paso 1: Contrato (p\u00e1rr. 23.6).<br>Paso 2: Compromisos distintos (p\u00e1rr. 23.14).<br>Paso 3: Precio transacci\u00f3n (p\u00e1rr. 23.23).<br>Paso 4: Asignar (p\u00e1rr. 23.39).<br>Paso 5: Reconocer al transferir control (p\u00e1rr. 23.52).",
            "ingresos contratos": "<strong>Ingresos S23 \u2014 5 pasos:</strong> Contrato \u2192 Compromisos \u2192 Precio \u2192 Asignaci\u00f3n \u2192 Reconocimiento al transferir control.",
            "precio variable s23": "<strong>Precio variable S23 (p\u00e1rr. 23.27, 3a ed.):</strong> CAMBIO: la 2a ed. reconoc\u00eda cuando 'probable'; la 3a ed. exige 'altamente probable de no revertirse'.",
            "financiacion implicita": "<strong>Componente financiaci\u00f3n significativo (p\u00e1rr. 23.38, 3a ed.):</strong> NOVEDAD: si el periodo entrega-cobro supera 12 meses con diferencia significativa, ajustar el precio. Sin regla en 2a edici\u00f3n.",
            "costos prestamos": "<strong>Costos por Pr\u00e9stamos (S25):</strong> Siempre a gasto del periodo. Sin capitalizaci\u00f3n. Diferencia clave vs NIC 23.",
            "seccion 28": "<strong>S28 \u2013 Beneficios Empleados (3a ed.):</strong> CP: gasto al prestar servicio. Plan definido: costo servicio + inter\u00e9s neto en resultados. Ganancias/p\u00e9rdidas actuariales (p\u00e1rr. 28.24): la entidad ELIGE reconocer en resultados o en ORI.",
            "beneficios empleados": "<strong>Beneficios Empleados (S28):</strong> Plan definido: m\u00e9todo unidad cr\u00e9dito proyectada. Actuariales: opci\u00f3n resultados u ORI (3a ed., p\u00e1rr. 28.24).",
            "seccion 29": "<strong>S29 \u2013 Impuesto Diferido (3a ed.):</strong> ADT: VL < base fiscal. PDT: VL > base fiscal. P\u00e9rdidas no realizadas (p\u00e1rr. 29.16A): pueden generar ADT. Tratamiento fiscal incierto (p\u00e1rr. 29.34A-29.34D): reflejar en base fiscal. Pilar 2: EXCEPCI\u00d3N \u2014 no reconocer diferidos.",
            "impuesto diferido": "<strong>Impuesto Diferido (S29):</strong> Diferencias temporarias VL vs base fiscal. ADT si probable realizaci\u00f3n. Tasa fiscal aprobada.",
            "pilar 2": "<strong>Pilar 2 OCDE \u2013 Impuesto m\u00ednimo global 15% (3a ed.):</strong> EXCEPCI\u00d3N temporal obligatoria: NO reconocer activos ni pasivos diferidos relacionados con Pilar 2. Solo revelar exposici\u00f3n.",
            "perdidas no realizadas diferido": "<strong>P\u00e9rdidas no realizadas (p\u00e1rr. 29.16A, 3a ed.):</strong> NOVEDAD: pueden generar diferencias temporarias deducibles y activo por impuesto diferido.",
            "seccion 30": "<strong>S30 \u2013 Moneda Extranjera:</strong> Monetarias al tipo de cierre \u2192 diferencias en resultados. No monetarias: tipo hist\u00f3rico.",
            "moneda extranjera": "<strong>Moneda Extranjera (S30):</strong> Monetarias al cierre, diferencias en resultados. No monetarias: tipo hist\u00f3rico.",
            "moneda no convertible": "<strong>Moneda no convertible (p\u00e1rr. 30.5A, 3a ed.):</strong> NOVEDAD: estimar la tasa que refleje una transacci\u00f3n ordenada de mercado cuando no existe tasa observable.",
            "contraprestacion anticipada": "<strong>Contraprestaci\u00f3n anticipada \u2013 tasa cambio (p\u00e1rr. 30.8A, 3a ed.):</strong> NOVEDAD: usar la tasa de la fecha del anticipo, no la de la entrega.",
            "seccion 35": "<strong>S35 \u2013 Transici\u00f3n (3a ed.):</strong> Contratos S23 completados antes de transici\u00f3n: no se reexpresan (p\u00e1rr. 35.9(g)). S23 puede aplicarse retroactiva o prospectivamente (p\u00e1rr. 35.10(o)).",
            "diferencias": "<strong>NIIF PYMES vs. NIIF Completas:</strong><br>\u2022 Sin LIFO (S13)<br>\u2022 Sin capitalizar costos pr\u00e9stamos (S25)<br>\u2022 Sin revaluaci\u00f3n PPE ni intangibles<br>\u2022 Arrendamientos: clasificaci\u00f3n fin/op (S20, no NIIF 16)<br>\u2022 Menos revelaciones<br>\u2022 Actualizaci\u00f3n cada 3 a\u00f1os",
            "deterioro": "<strong>Deterioro (S27):</strong> Recuperable = max(VR neto, Valor en Uso). Si VL > Recuperable: p\u00e9rdida. Reversal permitida excepto plusval\u00eda.",
            "partes relacionadas": "<strong>Partes Relacionadas (S33, 3a ed.):</strong> Revelar importes de entidades de gesti\u00f3n separadas (p\u00e1rr. 33.7A). Compromisos: revelar (p\u00e1rr. 33.9(b)).",
            "reconocimiento ingresos": "<strong>Reconocimiento de ingresos \u2013 Paso 5 (p\u00e1rr. 23.52, 3a ed.):</strong> El ingreso se reconoce cuando (o a medida que) se satisface cada compromiso del contrato, es decir, cuando se transfiere el control del bien o servicio al cliente.<br><strong>En un punto:</strong> cuando el cliente obtiene el control.<br><strong>A lo largo del tiempo (p\u00e1rr. 23.54-23.56):</strong> si el cliente recibe y consume los beneficios simult\u00e1neamente, o si la entidad crea un activo sin uso alternativo y tiene derecho exigible al pago.",
            "como se reconocen los ingresos": "<strong>Reconocimiento de ingresos S23 (3a ed.):</strong> Modelo 5 pasos. El ingreso se reconoce al satisfacer cada compromiso del contrato (p\u00e1rr. 23.52): en un punto en el tiempo o a lo largo del tiempo, seg\u00fan cu\u00e1ndo el cliente obtiene el control.",
            "cuando se reconoce el ingreso": "<strong>Reconocimiento ingreso (p\u00e1rr. 23.52):</strong> Cuando se transfiere el control al cliente: en un punto (entrega) o a lo largo del tiempo (servicios continuos). CAMBIO 3a ed.: criterio de control reemplaza al de riesgos y ventajas de la 2a edici\u00f3n.",
            "transferencia de control": "<strong>Transferencia de control (S23, p\u00e1rr. 23.52):</strong> Indicadores: derecho de pago, transferencia t\u00edtulo legal, posesi\u00f3n f\u00edsica, riesgos y ventajas significativos, aceptaci\u00f3n del cliente.",
            "cinco pasos": "<strong>Modelo 5 pasos S23 (3a ed.):</strong><br>1. Contrato (p\u00e1rr. 23.6)<br>2. Compromisos (p\u00e1rr. 23.14)<br>3. Precio (p\u00e1rr. 23.23)<br>4. Asignaci\u00f3n (p\u00e1rr. 23.39)<br>5. Reconocimiento al transferir control (p\u00e1rr. 23.52)",
            "iasb": "<strong>IASB:</strong> International Accounting Standards Board. 3a edici\u00f3n NIIF PYMES: <strong>febrero 2025</strong>. Vigencia: 1 enero 2027."
      };
      var SYSTEM_PROMPT = "Eres un asistente educativo experto en NIIF para PYMES, TERCERA EDICION, IASB, Febrero 2025. Ayudas a contadores de Honduras y Latinoamerica.\n\nREGLAS:\n1. Responde SIEMPRE en espanol.\n2. Cita parrafos exactos (ej: parr. 2.44).\n3. Maximo 220 palabras.\n4. Menciona cambios de la 3a edicion.\n\nDEFINICIONES EXACTAS OBLIGATORIAS (3a edicion):\nACTIVO (parr. 2.44): 'Recurso economico presente controlado por la entidad como resultado de sucesos pasados.' SIN 'beneficios futuros' en la definicion. La probabilidad es criterio de RECONOCIMIENTO, no de definicion.\nPASIVO (parr. 2.49): 'Obligacion presente de la entidad de transferir un recurso economico como resultado de sucesos pasados.'\n\nVIGENCIA: 1 enero 2027.";
      var hist = [];
      var waiting = false;
      function norm(t) {
            return t.toLowerCase()
              .replace(/[\xE1\xE0\xE4\u00e1\u00e0]/g,'a').replace(/[\xE9\xE8\xEB\u00e9]/g,'e')
              .replace(/[\xED\xEC\xEF\u00ed]/g,'i').replace(/[\xF3\xF2\xF6\u00f3]/g,'o')
              .replace(/[\xFA\xF9\xFC\u00fa]/g,'u').replace(/[\xF1\u00f1]/g,'n')
              .replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
      }
      function localReply(txt) {
            var q = norm(txt);
            // Coincidencia exacta
        for (var k in KB) { if (q === norm(k)) return KB[k]; }
            // La query contiene la clave completa (prioridad a claves mas largas)
        var keys = Object.keys(KB).sort(function(a,b){ return norm(b).length - norm(a).length; });
            for (var i=0; i<keys.length; i++) { var nk = norm(keys[i]); if (q.includes(nk)) return KB[keys[i]]; }
            // Busqueda por palabras (minimo 4 chars, excluir palabras comunes)
        var stopWords = ['como','para','que','los','las','una','con','por','del','sus','son','hay','ser'];
            var ws = q.split(' ').filter(function(w){ return w.length > 3 && stopWords.indexOf(w) === -1; });
            var best = null, sc = 0;
            for (var k in KB) {
                    var kw = norm(k).split(' '), s = 0;
                    for (var j=0; j<ws.length; j++) { if (kw.indexOf(ws[j]) > -1) s += 2; }
                    // Penalizar si la query tiene palabras que no estan en la clave
              var penalty = 0;
                    for (var j=0; j<ws.length; j++) { if (kw.indexOf(ws[j]) === -1) penalty++; }
                    s = s - penalty;
                    if (s > sc) { sc = s; best = k; }
            }
            return (sc > 0 && best) ? KB[best] : null;
      }
      async function askClaude(msg) {
            var messages = hist.slice(-8).concat([{ role: "user", content: msg }]);
            var r = await fetch("https://niif-pymes-proxy.juancreyes-hn.workers.dev", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 500, system: SYSTEM_PROMPT, messages: messages })
            });
            if (!r.ok) { var e = await r.json().catch(function(){return {};}); throw new Error(e.error ? e.error.message : "HTTP " + r.status); }
            var d = await r.json();
            var reply = d.content[0].text;
            hist.push({ role: "user", content: msg });
            hist.push({ role: "assistant", content: reply });
            return reply;
      }
      function init() {
            var tog = document.getElementById('niif-chat-toggle');
            var win = document.getElementById('niif-chat-window');
            var cls = document.getElementById('niif-close-btn');
            var box = document.getElementById('niif-chat-messages');
            var inp = document.getElementById('niif-chat-input');
            var snd = document.getElementById('niif-chat-send');
            var bdg = document.getElementById('niif-chat-badge');
            var typ = document.getElementById('niif-typing');
            if (!tog || !win || !inp || !snd) return;
            tog.addEventListener('click', function () {
                    var open = win.classList.contains('open');
                    if (open) { win.classList.remove('open'); }
                    else {
                              win.classList.add('open');
                              if (bdg) bdg.style.display = 'none';
                              inp.focus();
                              if (box && !box.querySelector('.niif-bubble')) {
                                          var r = document.createElement('div'); r.className = 'niif-msg-row';
                                          var a = document.createElement('div'); a.className = 'niif-msg-avatar'; a.textContent = '\uD83D\uDCDA';
                                          var b = document.createElement('div'); b.className = 'niif-bubble bot';
                                          b.innerHTML = '\u00a1Hola! Soy tu asistente de <strong>NIIF para PYMES \u2013 3a edici\u00f3n (Febrero 2025)</strong>. Consulta las 35 secciones con referencias exactas. \u00bfSobre qu\u00e9 quieres aprender?';
                                          r.appendChild(a); r.appendChild(b); box.appendChild(r);
                              }
                    }
            });
            if (cls) cls.addEventListener('click', function () { win.classList.remove('open'); });
            document.querySelectorAll('.niif-suggestion').forEach(function(b) {
                    b.addEventListener('click', function() { go(b.dataset.msg || b.textContent.trim()); });
            });
            inp.addEventListener('keydown', function(e) { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); go(); } });
            snd.addEventListener('click', function() { go(); });
            function msg(txt, isUser, isErr) {
                    var r = document.createElement('div'); r.className = 'niif-msg-row' + (isUser ? ' user' : '');
                    if (!isUser) { var a=document.createElement('div'); a.className='niif-msg-avatar'; a.textContent='\uD83D\uDCDA'; r.appendChild(a); }
                    var b = document.createElement('div'); b.className = 'niif-bubble ' + (isUser ? 'user' : (isErr ? 'error' : 'bot'));
                    b.innerHTML = txt.replace(/\n/g,'<br>');
                    r.appendChild(b);
                    typ && typ.parentNode === box ? box.insertBefore(r, typ) : box.appendChild(r);
                    box.scrollTop = box.scrollHeight;
            }
            function busy(v) { if (typ) typ.style.display = v ? 'flex' : 'none'; box.scrollTop = box.scrollHeight; }
            function dis(v) { inp.disabled = v; snd.disabled = v; }
            async function go(ov) {
                    if (waiting) return;
                    var t = (ov || inp.value).trim(); if (!t) return;
                    inp.value = ''; msg(t, true); waiting = true; dis(true); busy(true);
                    try {
                              // SIEMPRE consultar KB primero
                      var local = localReply(t);
                              var rep;
                              if (local) {
                                          // Respuesta directa del KB - sin llamar a Claude
                                await new Promise(function(r){setTimeout(r,300);});
                                          rep = local;
                              } else if (ANTHROPIC_API_KEY && ANTHROPIC_API_KEY.length > 10) {
                                          // Solo llamar a Claude si no hay respuesta local
                                rep = await askClaude(t);
                              } else {
                                          rep = 'Puedo ayudarte con las <strong>NIIF para PYMES 2025 (3a edici\u00f3n)</strong>. Prueba: \u201cconcepto de activo\u201d, \u201cNovedades 3a edicion\u201d, \u201cSecci\u00f3n 23\u201d o \u201cdiferencias PYMES vs completas\u201d.';
                              }
                              busy(false); msg(rep, false, false);
                    } catch(e) {
                              busy(false); msg('\u26a0\ufe0f Error: ' + e.message, false, true);
                    }
                    waiting = false; dis(false); inp.focus();
            }
      }
      document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
  })();
})();
