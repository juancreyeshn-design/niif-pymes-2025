/* NIIF PYMES Chat Widget - Loader Externo v1.0 */
(function() {
  'use strict';
  if (document.getElementById('niif-chat-toggle')) return;

  // 1. Inyectar CSS
  var style = document.createElement('style');
  style.textContent = "\n/* ---- CHAT FLOTANTE NIIF PYMES ---- */\n#niif-chat-toggle {\n  position: fixed;\n  bottom: 28px;\n  right: 28px;\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #C62828, #E53935);\n  color: #fff;\n  border: none;\n  cursor: pointer;\n  font-size: 26px;\n  box-shadow: 0 4px 20px rgba(198,40,40,0.45);\n  z-index: 9999;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: transform .2s, box-shadow .2s;\n}\n#niif-chat-toggle:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(198,40,40,0.6); }\n#niif-chat-badge {\n  position: absolute;\n  top: -4px; right: -4px;\n  background: #F4A811;\n  color: #1B2638;\n  border-radius: 50%;\n  width: 20px; height: 20px;\n  font-size: 11px;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n#niif-chat-window {\n  position: fixed;\n  bottom: 100px;\n  right: 24px;\n  width: 360px;\n  max-height: 520px;\n  background: #fff;\n  border-radius: 18px;\n  box-shadow: 0 8px 40px rgba(0,0,0,0.2);\n  display: flex;\n  flex-direction: column;\n  z-index: 9998;\n  overflow: hidden;\n  transform: scale(0.85) translateY(20px);\n  opacity: 0;\n  pointer-events: none;\n  transition: all .25s cubic-bezier(.4,0,.2,1);\n}\n#niif-chat-window.open {\n  transform: scale(1) translateY(0);\n  opacity: 1;\n  pointer-events: all;\n}\n#niif-chat-header {\n  background: linear-gradient(135deg, #C62828, #B71C1C);\n  color: #fff;\n  padding: 14px 16px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  border-radius: 18px 18px 0 0;\n}\n#niif-chat-header .niif-chat-title {\n  display: flex; align-items: center; gap: 10px;\n}\n#niif-chat-header .niif-chat-title .niif-avatar {\n  width: 36px; height: 36px;\n  background: rgba(255,255,255,0.2);\n  border-radius: 50%;\n  display: flex; align-items: center; justify-content: center;\n  font-size: 18px;\n}\n#niif-chat-header .niif-chat-title h3 {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 700;\n  line-height: 1.2;\n}\n#niif-chat-header .niif-chat-title p {\n  margin: 0;\n  font-size: 11px;\n  opacity: 0.85;\n}\n#niif-close-btn {\n  background: none;\n  border: none;\n  color: #fff;\n  font-size: 22px;\n  cursor: pointer;\n  line-height: 1;\n  padding: 0;\n  opacity: 0.85;\n}\n#niif-close-btn:hover { opacity: 1; }\n#niif-chat-messages {\n  flex: 1;\n  overflow-y: auto;\n  padding: 14px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  background: #F9F4F4;\n  min-height: 200px;\n  max-height: 300px;\n}\n#niif-chat-messages::-webkit-scrollbar { width: 5px; }\n#niif-chat-messages::-webkit-scrollbar-track { background: transparent; }\n#niif-chat-messages::-webkit-scrollbar-thumb { background: #C62828; border-radius: 3px; }\n.niif-msg-row {\n  display: flex;\n  gap: 8px;\n  align-items: flex-end;\n}\n.niif-msg-row.user { flex-direction: row-reverse; }\n.niif-msg-avatar {\n  width: 28px; height: 28px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #C62828, #E53935);\n  display: flex; align-items: center; justify-content: center;\n  font-size: 14px;\n  flex-shrink: 0;\n}\n.niif-bubble {\n  max-width: 78%;\n  padding: 9px 13px;\n  border-radius: 14px;\n  font-size: 13px;\n  line-height: 1.55;\n}\n.niif-bubble.bot {\n  background: #fff;\n  color: #1B2638;\n  border: 1px solid #e5d5d5;\n  border-bottom-left-radius: 4px;\n}\n.niif-bubble.user {\n  background: linear-gradient(135deg, #C62828, #E53935);\n  color: #fff;\n  border-bottom-right-radius: 4px;\n}\n.niif-typing {\n  display: none;\n  align-items: flex-end;\n  gap: 8px;\n}\n.niif-typing .niif-dots {\n  background: #fff;\n  border: 1px solid #e5d5d5;\n  border-radius: 14px;\n  border-bottom-left-radius: 4px;\n  padding: 10px 14px;\n  display: flex; gap: 4px;\n}\n.niif-typing .niif-dots span {\n  width: 7px; height: 7px;\n  background: #C62828;\n  border-radius: 50%;\n  animation: niifBounce 1.2s infinite ease-in-out;\n}\n.niif-typing .niif-dots span:nth-child(2) { animation-delay: .2s; }\n.niif-typing .niif-dots span:nth-child(3) { animation-delay: .4s; }\n@keyframes niifBounce {\n  0%,80%,100% { transform: translateY(0); }\n  40% { transform: translateY(-7px); }\n}\n#niif-chat-suggestions {\n  padding: 8px 12px 4px;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  background: #F9F4F4;\n  border-top: 1px solid #f0e0e0;\n}\n.niif-suggestion {\n  background: #fff;\n  border: 1px solid #C62828;\n  color: #C62828;\n  border-radius: 20px;\n  padding: 4px 11px;\n  font-size: 11px;\n  cursor: pointer;\n  transition: all .15s;\n  white-space: nowrap;\n}\n.niif-suggestion:hover { background: #C62828; color: #fff; }\n#niif-chat-input-area {\n  display: flex;\n  padding: 10px 12px;\n  gap: 8px;\n  border-top: 1px solid #f0e0e0;\n  background: #fff;\n}\n#niif-chat-input {\n  flex: 1;\n  border: 1px solid #ddd;\n  border-radius: 22px;\n  padding: 9px 14px;\n  font-size: 13px;\n  outline: none;\n  font-family: inherit;\n  color: #1B2638;\n}\n#niif-chat-input:focus { border-color: #C62828; }\n#niif-chat-send {\n  background: linear-gradient(135deg, #C62828, #E53935);\n  border: none;\n  border-radius: 50%;\n  width: 38px; height: 38px;\n  color: #fff;\n  font-size: 16px;\n  cursor: pointer;\n  display: flex; align-items: center; justify-content: center;\n  flex-shrink: 0;\n  transition: transform .15s;\n}\n#niif-chat-send:hover { transform: scale(1.1); }\n@media (max-width: 420px) {\n  #niif-chat-window { width: calc(100vw - 20px); right: 10px; }\n}\n";
  document.head.appendChild(style);

  // 2. Inyectar HTML del widget
  var container = document.createElement('div');
  container.innerHTML = "<!-- BotÃ³n flotante -->\n<button id=\"niif-chat-toggle\" title=\"Asistente NIIF para PYMES\">\n  ð\n  <span id=\"niif-chat-badge\">1</span>\n</button>\n\n<!-- Ventana de chat -->\n<div id=\"niif-chat-window\">\n  <div id=\"niif-chat-header\">\n    <div class=\"niif-chat-title\">\n      <div class=\"niif-avatar\">ð</div>\n      <div>\n        <h3>Asistente NIIF PYMES</h3>\n        <p>Basado en IFRS for SMEs 2025</p>\n      </div>\n    </div>\n    <button id=\"niif-close-btn\" title=\"Cerrar\">â</button>\n  </div>\n\n  <div id=\"niif-chat-messages\">\n    <!-- mensaje inicial -->\n  </div>\n\n  <div class=\"niif-typing\" id=\"niif-typing\">\n    <div class=\"niif-msg-avatar\">ð</div>\n    <div class=\"niif-dots\">\n      <span></span><span></span><span></span>\n    </div>\n  </div>\n\n  <div id=\"niif-chat-suggestions\">\n    <button class=\"niif-suggestion\" data-msg=\"Â¿QuÃ© son las NIIF para PYMES?\">Â¿QuÃ© son NIIF PYMES?</button>\n    <button class=\"niif-suggestion\" data-msg=\"SecciÃ³n 1\">SecciÃ³n 1</button>\n    <button class=\"niif-suggestion\" data-msg=\"SecciÃ³n 13 Inventarios\">Inventarios</button>\n    <button class=\"niif-suggestion\" data-msg=\"SecciÃ³n 17 PPE\">PPE</button>\n    <button class=\"niif-suggestion\" data-msg=\"Estados Financieros\">EE.FF.</button>\n    <button class=\"niif-suggestion\" data-msg=\"SecciÃ³n 20 Arrendamientos\">Arrendamientos</button>\n    <button class=\"niif-suggestion\" data-msg=\"SecciÃ³n 29 Impuesto diferido\">Impuesto Diferido</button>\n    <button class=\"niif-suggestion\" data-msg=\"Diferencia NIIF PYMES vs NIIF completas\">PYMES vs Completas</button>\n  </div>\n\n  <div id=\"niif-chat-input-area\">\n    <input type=\"text\" id=\"niif-chat-input\" placeholder=\"Pregunta sobre NIIF para PYMES...\" autocomplete=\"off\" />\n    <button id=\"niif-chat-send\" title=\"Enviar\">â¤</button>\n  </div>\n</div>";
  document.body.appendChild(container);

  // 3. Inicializar el chat
  
(function () {
  var ANTHROPIC_API_KEY = "use-cloudflare-worker";

  var KB = {
    "que son niif pymes": "Las <strong>NIIF para PYMES</strong> son normas internacionales para PYMES sin obligacion publica de rendir cuentas. 3a edicion 2025: 35 secciones, emitida por el IASB.",
    "que es niif pymes": "Las <strong>NIIF para PYMES</strong> son normas contables para entidades sin obligacion publica de rendir cuentas. 3a edicion 2025: 35 secciones.",
    "seccion 1": "<strong>Seccion 1:</strong> Define quienes pueden aplicar. Entidades sin obligacion publica de rendir cuentas que publican EE.FF. de proposito general. Excluye bancos, aseguradoras y empresas cotizadas.",
    "seccion 2": "<strong>Seccion 2 - Conceptos:</strong> Activos, pasivos, patrimonio, ingresos, gastos. Negocio en marcha y devengo. Bases de medicion: costo historico, VR, VNR, VA.",
    "seccion 3": "<strong>Seccion 3 - Presentacion:</strong> Conjunto completo: SF + RI + CP + FE + Notas. Presentacion anual con comparativos.",
    "seccion 4": "<strong>Seccion 4 - Situacion Financiera:</strong> Activos, pasivos y patrimonio. Clasificacion corriente/no corriente obligatoria.",
    "seccion 5": "<strong>Seccion 5 - Resultado Integral:</strong> Un estado o dos partes. ORI incluye diferencias de conversion y remedicion planes definidos.",
    "seccion 6": "<strong>Seccion 6 - Cambios Patrimonio:</strong> Movimientos de capital, reservas, utilidades retenidas y ORI.",
    "seccion 7": "<strong>Seccion 7 - Flujos de Efectivo:</strong> Operacion (directo o indirecto), Inversion y Financiamiento.",
    "seccion 8": "<strong>Seccion 8 - Notas:</strong> Politicas contables, juicios y estimaciones clave, informacion adicional.",
    "seccion 9": "<strong>Seccion 9 - Consolidacion:</strong> Control = poder de dirigir politicas financieras. Linea a linea eliminando intercompanias.",
    "seccion 10": "<strong>Seccion 10 - Politicas, Estimaciones y Errores:</strong> Politicas: retroactivo. Estimaciones: prospectivo. Errores: correccion retroactiva.",
    "seccion 11": "<strong>Seccion 11 - Instrumentos Financieros:</strong> Medicion inicial: costo. Posterior: costo amortizado (tasa de interes efectiva).",
    "seccion 12": "<strong>Seccion 12 - Valor Razonable:</strong> Precio de salida en transaccion ordenada. Jerarquia Nivel 1, 2 y 3.",
    "seccion 13": "<strong>Seccion 13 - Inventarios:</strong> Menor entre costo y VNR. FIFO o Promedio Ponderado. Sin LIFO.",
    "seccion 14": "<strong>Seccion 14 - Asociadas:</strong> 20-50% participacion significativa. Metodo participacion patrimonial.",
    "seccion 15": "<strong>Seccion 15 - Negocios Conjuntos:</strong> Metodo de participacion patrimonial.",
    "seccion 16": "<strong>Seccion 16 - Propiedades Inversion:</strong> Rentas o plusvalias. Modelo costo o VR.",
    "seccion 17": "<strong>Seccion 17 - PPE:</strong> Modelo costo: precio - depreciacion - deterioro. Depreciacion sistematica.",
    "seccion 18": "<strong>Seccion 18 - Intangibles:</strong> Costo - amortizacion. Vida indefinida: prueba deterioro anual. Sin revaluacion.",
    "seccion 19": "<strong>Seccion 19 - Combinaciones y Plusvalia:</strong> Metodo adquisicion. Plusvalia no se amortiza, prueba deterioro.",
    "seccion 20": "<strong>Seccion 20 - Arrendamientos:</strong> Financiero: activo + pasivo. Operativo: gasto lineal.",
    "seccion 21": "<strong>Seccion 21 - Provisiones:</strong> Obligacion + probable + estimable. Contingencia posible: solo revelar.",
    "seccion 22": "<strong>Seccion 22 - Pasivos y Patrimonio:</strong> Pasivo: obliga entregar efectivo. Patrimonio: derecho residual.",
    "seccion 23": "<strong>Seccion 23 - Ingresos:</strong> 5 pasos: contrato, obligaciones, precio, asignar, reconocer al transferir control.",
    "seccion 24": "<strong>Seccion 24 - Subvenciones:</strong> Activo: diferir durante vida util. Ingreso: reconocer al cumplir condicion.",
    "seccion 25": "<strong>Seccion 25 - Costos Prestamos:</strong> Todo a gasto del periodo. Sin capitalizacion.",
    "seccion 26": "<strong>Seccion 26 - Pagos Acciones:</strong> VR en fecha concesion. Gasto durante periodo vesting.",
    "seccion 27": "<strong>Seccion 27 - Deterioro:</strong> Recuperable = max(VR neto, Valor en Uso). Si VL > Recuperable: perdida.",
    "seccion 28": "<strong>Seccion 28 - Beneficios Empleados:</strong> CP: gasto al prestar servicio. Plan definido: actuarial, ORI.",
    "seccion 29": "<strong>Seccion 29 - Impuesto Diferido:</strong> Diferencias temporarias VL vs base fiscal. ADT o PDT.",
    "seccion 30": "<strong>Seccion 30 - Moneda Extranjera:</strong> Monetarias al tipo de cierre. Diferencias a resultados.",
    "seccion 31": "<strong>Seccion 31 - Hiperinflacion:</strong> Inflacion acumulada 3 anos mayor o igual 100%: reexpresar EE.FF.",
    "seccion 32": "<strong>Seccion 32 - Hechos Posteriores:</strong> Ajustados: condicion existia al cierre. No ajustados: nueva condicion, revelar.",
    "seccion 33": "<strong>Seccion 33 - Partes Relacionadas:</strong> Controladoras, subsidiarias, personal clave. Revelar transacciones y saldos.",
    "seccion 34": "<strong>Seccion 34 - Actividades Especiales:</strong> Agricultura: biologicos al VR. Mineria y concesiones: politicas especificas.",
    "seccion 35": "<strong>Seccion 35 - Transicion:</strong> Balance apertura. Ajustes a utilidades retenidas o patrimonio.",
    "estados financieros": "<strong>Conjunto completo EE.FF.:</strong><br>1. Situacion Financiera (S4)<br>2. Resultado Integral (S5)<br>3. Cambios Patrimonio (S6)<br>4. Flujos Efectivo (S7)<br>5. Notas (S8)",
    "inventarios": "<strong>Inventarios (S13):</strong> Menor entre costo y VNR. FIFO o Promedio. Sin LIFO. Deterioro: bajar al VNR.",
    "ppe propiedades planta": "<strong>PPE (S17):</strong> Costo - depreciacion acumulada - deterioro. Metodos: lineal, UP, saldo decreciente.",
    "valor razonable": "<strong>Valor Razonable (S12):</strong> Precio de salida entre participantes del mercado. Jerarquia 3 niveles.",
    "arrendamiento": "<strong>Arrendamientos (S20):</strong> Financiero: activo + pasivo. Operativo: gasto lineal.",
    "impuesto diferido": "<strong>Impuesto Diferido (S29):</strong> ADT (VL < base fiscal) o PDT (VL > base fiscal). Tasa fiscal aprobada.",
    "deterioro": "<strong>Deterioro (S27):</strong> Recuperable = max(VR neto, Valor en Uso). Si VL > Recuperable: perdida en resultados.",
    "diferencias": "<strong>NIIF PYMES vs Completas:</strong> Sin LIFO, sin capitalizar prestamos, sin revaluar intangibles, menos revelaciones, actualizacion cada 3 anos.",
    "primera adopcion": "<strong>Primera Adopcion (S35):</strong> Balance apertura en fecha transicion. Ajustes a patrimonio.",
    "moneda extranjera": "<strong>Moneda Extranjera (S30):</strong> Monetarias al tipo de cierre. Diferencias a resultados.",
    "plusvalia": "<strong>Plusvalia (S19):</strong> Precio - VR activos netos. No se amortiza. Prueba deterioro anual.",
    "provision": "<strong>Provisiones (S21):</strong> Obligacion + probable + estimable. Medir al mejor estimado.",
    "partes relacionadas": "<strong>Partes Relacionadas (S33):</strong> Revelar naturaleza, montos y condiciones.",
    "combinacion negocios": "<strong>Combinaciones (S19):</strong> Metodo adquisicion. Plusvalia no amortizable.",
    "obligacion publica": "<strong>Obligacion Publica:</strong> Instrumentos cotizados o instituciones financieras: usan NIIF completas.",
    "costo amortizado": "<strong>Costo Amortizado:</strong> Tasa de interes efectiva distribuye ingresos/costos financieros en la vida del instrumento.",
    "beneficios empleados": "<strong>Beneficios Empleados (S28):</strong> CP: gasto al prestar servicio. Plan definido: actuarial.",
    "ingresos contratos": "<strong>Ingresos (S23):</strong> 5 pasos. Control al cliente: en un punto o a lo largo del tiempo.",
    "flujo efectivo": "<strong>Flujos (S7):</strong> Operacion, Inversion, Financiamiento. Equivalentes: vencimiento menor o igual 3 meses."
  };

  var SYSTEM_PROMPT = "Eres un asistente educativo experto en NIIF para PYMES (IFRS for SMEs 2025, 3a edicion, IASB). Ayudas a estudiantes y profesionales contables de Latinoamerica.\n\nReglas:\n1. Responde SIEMPRE en espanol.\n2. Se conciso. Usa puntos o viÃ±etas cuando ayude.\n3. Cita la seccion relevante.\n4. Si es conversacional (saludo, gracias), responde amigablemente.\n5. No inventes articulos que no existan.\n6. Puedes dar ejemplos numericos simples.\n7. Maximo 280 palabras salvo que pidan mas detalle.\n\nLa norma tiene 35 secciones: S1 quienes aplican, S2 conceptos, S3-8 estados financieros, S9 consolidacion, S10 politicas estimaciones errores, S11 instrumentos financieros, S12 valor razonable, S13 inventarios FIFO/Promedio no LIFO, S14 asociadas, S15 conjuntos, S16 prop inversion, S17 PPE modelo costo, S18 intangibles, S19 combinaciones plusvalia no amortiza, S20 arrendamientos, S21 provisiones, S22 pasivos patrimonio, S23 ingresos 5 pasos, S24 subvenciones, S25 costos prestamos a gasto, S26 pagos acciones, S27 deterioro, S28 beneficios empleados, S29 impuesto diferido, S30 moneda extranjera, S31 hiperinflacion, S32 hechos posteriores, S33 partes relacionadas, S34 actividades especiales, S35 transicion.";

  var hist = [];
  var waiting = false;

  function norm(t) {
    return t.toLowerCase()
      .replace(/[Ã¡Ã Ã¤]/g,'a').replace(/[Ã©Ã¨Ã«]/g,'e').replace(/[Ã­Ã¬Ã¯]/g,'i')
      .replace(/[Ã³Ã²Ã¶]/g,'o').replace(/[ÃºÃ¹Ã¼]/g,'u').replace(/Ã±/g,'n')
      .replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
  }

  function localReply(txt) {
    var q = norm(txt);
    for (var k in KB) { if (q === k) return KB[k]; }
    for (var k in KB) { if (q.includes(k) || k.includes(q)) return KB[k]; }
    var ws = q.split(' '), best = null, sc = 0;
    for (var k in KB) {
      var kw = k.split(' '), s = 0;
      for (var w of ws) { if (w.length > 2 && kw.includes(w)) s++; }
      if (s > sc) { sc = s; best = k; }
    }
    return sc > 0 ? KB[best] : null;
  }

  async function askClaude(msg) {
    hist.push({ role: "user", content: msg });
    var r = await fetch("https://niif-pymes-proxy.juancreyes-hn.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ model: "claude-haiku-4-5", max_tokens: 600, system: SYSTEM_PROMPT, messages: hist.slice(-10) })
    });
    if (!r.ok) { var e = await r.json().catch(function(){return {};}); throw new Error(e.error ? e.error.message : "HTTP " + r.status); }
    var d = await r.json();
    var reply = d.content[0].text;
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

    if (ANTHROPIC_API_KEY && ANTHROPIC_API_KEY.length > 10) {
      var sub = win.querySelector('#niif-chat-header p');
      if (sub) sub.textContent = 'IA Conversacional - IFRS for SMEs 2025';
      var fb = box ? box.querySelector('.niif-bubble.bot') : null;
      if (fb) fb.innerHTML = '\u00a1Hola! Soy tu asistente de <strong>NIIF para PYMES 2025</strong> con IA real \u{1F916}\u{1F4DA}<br>Puedo conversar contigo sobre cualquier concepto de las 35 secciones. \u00bfSobre qu\u00e9 quieres aprender?';
    }

    tog.addEventListener('click', function () {
      var open = win.classList.contains('open');
      if (open) {
        win.classList.remove('open');
      } else {
        win.classList.add('open');
        if (bdg) bdg.style.display = 'none';
        inp.focus();
      }
    });
    if (cls) cls.addEventListener('click', function () { win.classList.remove('open'); });
    document.querySelectorAll('.niif-suggestion').forEach(function(b) {
      b.addEventListener('click', function() { go(b.textContent.trim()); });
    });
    inp.addEventListener('keydown', function(e) { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); go(); } });
    snd.addEventListener('click', function() { go(); });

    function msg(txt, isUser, isErr) {
      var r = document.createElement('div');
      r.className = 'niif-msg-row' + (isUser ? ' user' : '');
      if (!isUser) { var a=document.createElement('div'); a.className='niif-msg-avatar'; a.textContent='\u{1F4DA}'; r.appendChild(a); }
      var b = document.createElement('div');
      b.className = 'niif-bubble ' + (isUser ? 'user' : (isErr ? 'error' : 'bot'));
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
        var rep;
        if (ANTHROPIC_API_KEY && ANTHROPIC_API_KEY.length > 10) {
          rep = await askClaude(t);
        } else {
          await new Promise(function(r){setTimeout(r,500);});
          rep = localReply(t) || 'Puedo ayudarte con las <strong>NIIF para PYMES 2025</strong>. Prueba: "Secci\u00f3n 17", "inventarios", "arrendamientos", "impuesto diferido" o "diferencias PYMES vs completas".';
        }
        busy(false); msg(rep, false, false);
      } catch(e) {
        busy(false); msg('\u26a0\ufe0f Error IA: ' + e.message, false, true);
      }
      waiting = false; dis(false); inp.focus();
    }
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();

})();
