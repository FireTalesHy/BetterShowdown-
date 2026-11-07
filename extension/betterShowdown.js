/* betterShowdown — rail de navigation relié au vrai client Showdown (objet global PS) */
(function () {
  if (window.__betterShowdown) return;
  window.__betterShowdown = true;
  var ACCENT = '#ff4d5e'; // change la couleur d'accent ici
  var style = document.createElement('style');
  style.id = 'bs-style';
  style.textContent = ":root{--bs-accent:#ff4d5e;--bs-gold:#ffcb05;--bs-bg:#0c1229;--bs-rail:#080d1f;--bs-panel:#151d3d;--bs-panel2:#1d2750;--bs-line:#2a3566;--bs-text:#eef1ff;--bs-muted:#a3acd6;--bs-rail-w:96px}\nhtml{left:var(--bs-rail-w) !important;width:calc(100% - var(--bs-rail-w)) !important}\nhtml,body{background:var(--bs-bg) !important;color:var(--bs-text) !important}\nbody{background-image:none !important;font-family:Inter,\"Segoe UI\",system-ui,sans-serif !important}\na{color:var(--bs-gold)}\n::-webkit-scrollbar{width:8px;height:8px}::-webkit-scrollbar-thumb{background:var(--bs-line);border-radius:8px}::-webkit-scrollbar-track{background:transparent}\n\n/* ---- Rail latéral betterShowdown ---- */\n#bs-rail{position:fixed;left:calc(var(--bs-rail-w) * -1);top:0;bottom:0;width:var(--bs-rail-w);background:var(--bs-rail);border-right:1px solid var(--bs-panel2);display:flex;flex-direction:column;align-items:center;padding:16px 0;gap:6px;z-index:9999;font-family:Inter,\"Segoe UI\",system-ui,sans-serif}\n#bs-rail .bs-logo{width:56px;height:56px;border-radius:16px;background:linear-gradient(135deg,var(--bs-accent),#c4163a);display:flex;align-items:center;justify-content:center;margin-bottom:12px;box-shadow:0 6px 18px rgba(255,77,94,.35)}\n#bs-rail button.bs-nav{width:76px;height:62px;border:0 !important;border-radius:16px !important;background:transparent !important;color:var(--bs-muted) !important;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;font-size:11px;font-weight:600;box-shadow:none !important;text-shadow:none !important;padding:0}\n#bs-rail button.bs-nav:hover{background:var(--bs-panel) !important;color:#fff !important}\n#bs-rail button.bs-nav.on{background:var(--bs-panel2) !important;color:#fff !important;box-shadow:inset 3px 0 0 var(--bs-accent) !important}\n#bs-rail svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}\n#bs-rail .bs-sp{flex:1}\n\n/* ---- Barre du haut / onglets ---- */\n.header,.dark .header,.header-vertical,.dark .header-vertical{background:var(--bs-rail) !important;border-bottom:1px solid var(--bs-panel2)}\n.mini-header,.maintabbarbottom,.tabbar:after,.dark .mini-header,.dark .maintabbarbottom,.dark .tabbar:after{background:var(--bs-rail) !important;border-color:var(--bs-panel2) !important}\n.tabbar .button,.tablist .button,.dark .tabbar .button,.dark .header-vertical .tablist .button{background:var(--bs-panel) !important;border:1px solid var(--bs-line) !important;color:var(--bs-text) !important;border-radius:12px !important;box-shadow:none !important;text-shadow:none !important}\n.tabbar .button:hover,.tablist .button:hover{border-color:var(--bs-gold) !important;background:var(--bs-panel2) !important}\n.tabbar .button.cur,.tabbar .button.cur:hover,.tablist .button.cur,.dark .tabbar .button.cur{background:var(--bs-panel2) !important;border-color:var(--bs-gold) !important;color:#fff !important}\n.tabbar .button.notifying,.tablist .button.notifying{background:var(--bs-accent) !important;border-color:var(--bs-accent) !important;color:#fff !important}\n.userbar .username,.dark .userbar .username{color:var(--bs-text) !important}\n\n/* ---- Salles, fenêtres, popups ---- */\n.ps-room,.dark .ps-room{border-color:var(--bs-line) !important}\n.ps-room.ps-room-light,.ps-room-light,.ps-room.ps-room-opaque,.ps-room-opaque{background:var(--bs-bg) !important;color:var(--bs-text) !important}\n.ps-overlay,.dark .ps-overlay{background:rgba(5,8,20,.6) !important}\n.ps-popup,.dark .ps-popup{background:var(--bs-panel) !important;color:var(--bs-text) !important;border:1px solid var(--bs-line) !important;border-radius:16px !important;box-shadow:0 18px 50px rgba(0,0,0,.55) !important}\n.ps-popup h3,.ps-popup p{color:var(--bs-text) !important}\n.mini-window-contents,.pm-window,.dark .pm-window{background:var(--bs-panel) !important;border:1px solid var(--bs-line) !important;border-radius:16px !important;color:var(--bs-text) !important}\n.mini-window-header,.pm-log{background:var(--bs-panel2) !important;color:var(--bs-text) !important}\n.mainmenu-footer,.mainmenu-footer small{color:var(--bs-muted) !important;text-shadow:none !important}\n.infobox,.infobox-limited,.roomlist,.dark .roomlist{background:var(--bs-panel) !important;border:1px solid var(--bs-line) !important;border-radius:14px !important;color:var(--bs-text) !important}\n\n/* ---- Boutons (hors attaques / Pokémon, qui gardent leurs couleurs de type) ---- */\n.button:not(.mainmenu1):not(.mainmenu2):not(.mainmenu3):not(.mainmenu4):not(.mainmenu5):not(.mainmenu6):not(.tabbar *):not(.tablist *),\nbutton:not(.bs-nav):not(.picon):not([class*=\"type-\"]):not(.tabbar *):not(.movemenu *):not(.switchmenu *):not(.userlist *){\n  border-radius:12px !important;border:1px solid var(--bs-line) !important;background:var(--bs-panel2) !important;color:var(--bs-text) !important;text-shadow:none !important;box-shadow:none !important}\n.button:not(.mainmenu1):not(.tabbar *):hover,button:not(.bs-nav):not(.tabbar *):not(.movemenu *):not(.switchmenu *):not(.userlist *):hover{border-color:var(--bs-gold) !important;background:#26336a !important}\n.button.mainmenu1,.button.mainmenu1:hover{background:linear-gradient(135deg,var(--bs-accent),#c4163a) !important;border:0 !important;color:#fff !important;border-radius:16px !important;box-shadow:0 8px 22px rgba(255,77,94,.35) !important;text-shadow:none !important}\n.button.mainmenu2,.button.mainmenu3,.button.mainmenu4,.button.mainmenu5,.button.mainmenu6{background:var(--bs-panel) !important;border:1px solid var(--bs-line) !important;color:var(--bs-text) !important;border-radius:16px !important;box-shadow:none !important;text-shadow:none !important}\n.button.mainmenu2:hover,.button.mainmenu3:hover,.button.mainmenu4:hover,.button.mainmenu5:hover,.button.mainmenu6:hover{border-color:var(--bs-gold) !important;background:var(--bs-panel2) !important}\n.button:disabled,button:disabled,.button.disabled{opacity:.45 !important}\n\n/* ---- Champs ---- */\ninput[type=text],input[type=password],input[type=search],input:not([type]),textarea,select,.textbox{background:var(--bs-bg) !important;color:var(--bs-text) !important;border:1px solid var(--bs-line) !important;border-radius:10px !important;box-shadow:none !important}\ninput:focus,textarea:focus,select:focus,.textbox:focus{outline:2px solid var(--bs-gold) !important;outline-offset:1px}\n\n/* ---- Chat & journal de combat ---- */\n.chat-log,.readable-bg,.battle-log,.dark .chat-log,.dark .readable-bg,.dark .battle-log{background:var(--bs-panel) !important;color:var(--bs-text) !important;backdrop-filter:none !important}\n.battle-log-add,.chat-log-add{background:var(--bs-panel) !important;border-color:var(--bs-line) !important}\n.chat .username,.chat strong{color:var(--bs-gold)}\n.chat.highlighted{background:rgba(255,203,5,.12) !important}\n.userlist,.dark .userlist{background:var(--bs-panel) !important;border-color:var(--bs-line) !important}\n.userlist li button{color:var(--bs-text) !important;background:transparent !important;border:0 !important}\n.userlist li button:hover{background:var(--bs-panel2) !important}\n\n/* ---- Combat : commandes ---- */\n.battle-controls,.battle-controls .whatdo{color:var(--bs-text) !important}\n.battle-controls p{color:var(--bs-text) !important}\n.movemenu button,.switchmenu button,.battle-controls button.movebutton,.battle-controls .switchmenu button{border-radius:14px !important}\n.movemenu button{font-weight:600 !important}\n.battle-controls .whatdo{font-weight:600}\n\n/* ---- Teambuilder ---- */\n.teamchartbox,.setchart,.teambuilder-results,.teamlist li,.team,.setmenu,.teambuilder-pokemon-import,.utilichart li.result{background:var(--bs-panel) !important;border-color:var(--bs-line) !important;color:var(--bs-text) !important}\n.utilichart li.result a,.utilichart li.result{color:var(--bs-text) !important}\n.utilichart li.result:hover,.utilichart li.result a:hover{background:var(--bs-panel2) !important}\n.teamlist li.team-folder-selected,.team-selected{background:var(--bs-panel2) !important}\n.teambuilder h2,.teambuilder h3,.teambuilder label{color:var(--bs-text) !important}\n\n/* ---- Classement & tableaux ---- */\n.ladder table,.ladder th,.ladder td,table.ladder{background:transparent !important;color:var(--bs-text) !important;border-color:var(--bs-line) !important}\n.ladder tr:nth-child(odd) td{background:rgba(255,255,255,.035) !important}\n.ladder th{color:var(--bs-muted) !important;text-transform:uppercase;font-size:10pt;letter-spacing:.06em}\n.ladder a{color:var(--bs-gold) !important}\n\n/* ---- Accueil façon betterShowdown : bandeau + mise en page ---- */\n.mainmenu{padding-top:0 !important}\n.mainmenu-left{padding-top:372px !important}\n.mainmenu-mini-windows{top:347px !important}\n.mainmenu-right{top:372px !important}\n#bs-hero{position:absolute;left:24px;right:24px;top:24px;height:300px;box-sizing:border-box;border-radius:24px;overflow:hidden;padding:36px 44px;background:linear-gradient(120deg,#1c2a78 0%,#4a1f6e 55%,#8a1f45 100%);color:#fff;z-index:2;font-family:Inter,\"Segoe UI\",system-ui,sans-serif}\n#bs-hero .bs-orb1{position:absolute;right:-90px;top:-90px;width:420px;height:420px;border-radius:50%;border:56px solid rgba(255,255,255,.07)}\n#bs-hero .bs-orb2{position:absolute;right:70px;top:90px;width:150px;height:150px;border-radius:50%;background:rgba(255,203,5,.16)}\n#bs-hero .bs-hero-in{position:relative;max-width:640px}\n#bs-hero .bs-tag{display:inline-block;padding:6px 14px;border-radius:14px;background:rgba(255,255,255,.14);font-size:13px;font-weight:600;margin-bottom:14px}\n#bs-hero h2{margin:0 0 10px;font-family:\"Exo 2\",Inter,sans-serif;font-weight:800;font-size:44px;line-height:1.05;color:#fff}\n#bs-hero p{margin:0 0 12px;font-size:15px;line-height:1.5;color:#dfe3ff}\n#bs-hero .bs-fmt{font-size:13px;color:#dfe3ff;margin-bottom:16px}\n#bs-hero .bs-fmt b{color:var(--bs-gold)}\n#bs-hero .bs-btns{display:flex;gap:10px;flex-wrap:wrap}\n#bs-hero button{height:48px;padding:0 24px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit}\n#bs-hero button.bs-cta{border:0 !important;border-radius:24px !important;background:var(--bs-accent) !important;color:#fff !important;box-shadow:0 8px 22px rgba(255,77,94,.45) !important}\n#bs-hero button.bs-sec{border:2px solid rgba(255,255,255,.4) !important;border-radius:24px !important;background:transparent !important;color:#fff !important;box-shadow:none !important}\n#bs-hero button.bs-sec:hover{border-color:#fff !important;background:rgba(255,255,255,.1) !important}\n#bs-hero .bs-sprites{position:absolute;right:48px;bottom:12px;display:flex;align-items:flex-end;gap:6px;pointer-events:none}\n#bs-hero .bs-sprites img{image-rendering:pixelated;max-height:150px;filter:drop-shadow(0 8px 6px rgba(0,0,0,.35))}\n".replace('--bs-accent:#ff4d5e', '--bs-accent:' + ACCENT);
  (document.head || document.documentElement).appendChild(style);

  var ICONS = {
    home: '<path d="M3 11 12 3l9 8"/><path d="M5 10v10h14V10"/>',
    battles: '<path d="m14 4 6 6-9 9-6-6z"/><path d="m4 20 4-4"/>',
    team: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-4 3-6 7-6s7 2 7 6"/>',
    ladder: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3"/>',
    rooms: '<path d="M4 5h16v11H9l-5 4z"/>',
    dex: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    replays: '<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z"/>',
    options: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>'
  };
  var ITEMS = [
    ['home', 'Accueil', { room: '' }],
    ['battles', 'Combats', { room: 'battles' }],
    ['team', 'Équipes', { room: 'teambuilder' }],
    ['ladder', 'Classement', { room: 'ladder' }],
    ['rooms', 'Salons', { room: 'rooms' }],
    ['dex', 'Pokédex', { url: 'https://dex.pokemonshowdown.com/' }],
    ['replays', 'Replays', { url: 'https://replay.pokemonshowdown.com/' }]
  ];

  function go(it) {
    var t = it[2];
    if (t.url) { window.open(t.url, '_blank', 'noopener'); return; }
    try {
      if (window.PS && typeof PS.join === 'function') { PS.join(t.room); return; }
    } catch (e) {}
    // Secours (ancien client) : app.joinRoom
    try { if (window.app) { t.room ? app.joinRoom(t.room) : app.focusRoom(''); } } catch (e) {}
  }
  function openOptions() {
    try { if (window.PS) { PS.join('options'); return; } } catch (e) {}
    var b = document.querySelector('button[name=openOptions], button[aria-label*=ption]');
    if (b) b.click();
  }
  function btn(key, label, onclick) {
    var b = document.createElement('button');
    b.className = 'bs-nav'; b.type = 'button'; b.dataset.k = key;
    b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[key] + '</svg>' + label;
    b.addEventListener('click', onclick);
    return b;
  }
  function build() {
    if (document.getElementById('bs-rail')) return;
    var rail = document.createElement('nav');
    rail.id = 'bs-rail'; rail.setAttribute('aria-label', 'betterShowdown');
    var logo = document.createElement('div');
    logo.className = 'bs-logo';
    logo.innerHTML = '<svg width="30" height="30" viewBox="0 0 24 24" fill="#ffcb05" aria-hidden="true"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>';
    rail.appendChild(logo);
    ITEMS.forEach(function (it) { rail.appendChild(btn(it[0], it[1], function () { go(it); })); });
    var sp = document.createElement('div'); sp.className = 'bs-sp'; rail.appendChild(sp);
    rail.appendChild(btn('options', 'Options', openOptions));
    document.body.appendChild(rail);
  }
  // Repère actif : suit la salle affichée par le client
  function sync() {
    var cur = null;
    try { if (window.PS && PS.room) cur = PS.room.id; } catch (e) {}
    var key = cur === '' ? 'home' : cur === 'teambuilder' ? 'team' : cur === 'ladder' ? 'ladder' : cur === 'rooms' ? 'rooms' : cur === 'battles' ? 'battles' : (cur && /^battle-/.test(cur)) ? 'battles' : null;
    document.querySelectorAll('#bs-rail .bs-nav').forEach(function (b) { b.classList.toggle('on', b.dataset.k === key); });
  }

  // Bandeau d'accueil relié au vrai bouton « Battle! » et au Teambuilder
  function hero() {
    var mm = document.querySelector('.mainmenu');
    if (!mm || mm.querySelector('#bs-hero')) return;
    var h = document.createElement('section');
    h.id = 'bs-hero';
    var sp = ['charizard', 'garchomp', 'pikachu'].map(function (n) {
      return '<img src="https://play.pokemonshowdown.com/sprites/ani/' + n + '.gif" alt="" onerror="this.style.display=\'none\'">';
    }).join('');
    h.innerHTML = '<div class="bs-orb1"></div><div class="bs-orb2"></div>' +
      '<div class="bs-hero-in"><span class="bs-tag">Simulateur de combats Pokémon en ligne</span>' +
      '<h2>Prêt pour le prochain combat ?</h2>' +
      '<p>Équipes aléatoires ou personnalisées, animations complètes, classement en temps réel.</p>' +
      '<div class="bs-fmt">Format actuel : <b id="bs-fmt">…</b></div>' +
      '<div class="bs-btns"><button type="button" class="bs-cta" data-a="search">Rechercher un combat</button>' +
      '<button type="button" class="bs-sec" data-a="fmt">Choisir le format</button>' +
      '<button type="button" class="bs-sec" data-a="team">Ouvrir le Teambuilder</button></div></div>' +
      '<div class="bs-sprites" aria-hidden="true">' + sp + '</div>';
    h.addEventListener('click', function (e) {
      var a = e.target && e.target.getAttribute && e.target.getAttribute('data-a');
      if (!a) return;
      var scope = document.querySelector('.mainmenu') || document;
      if (a === 'search') { var b = scope.querySelector('button[name=search]'); if (b) b.click(); }
      else if (a === 'fmt') { var f = scope.querySelector('.formatselect'); if (f) f.click(); }
      else if (a === 'team') { try { PS.join('teambuilder'); } catch (err) {} }
    });
    mm.appendChild(h);
  }
  function heroSync() {
    hero();
    var f = document.querySelector('.mainmenu .formatselect'), t = document.getElementById('bs-fmt');
    if (f && t) t.textContent = (f.textContent || '').replace(/\s+/g, ' ').trim() || '…';
  }
  function init() { build(); sync(); heroSync(); setInterval(function () { sync(); heroSync(); }, 600); }
  if (document.body) init(); else document.addEventListener('DOMContentLoaded', init);
})();
