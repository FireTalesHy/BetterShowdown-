// ==UserScript==
// @name         betterShowdown!
// @namespace    bettershowdown
// @version      0.2.0
// @description  Interface moderne pour Pokémon Showdown (restylage du vrai site + rail de navigation)
// @match        https://play.pokemonshowdown.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==
/* betterShowdown! — vues personnalisées (accueil, équipes, classement) reliées au vrai client Showdown */
(function () {
  if (window.__betterShowdown) return;
  window.__betterShowdown = true;
  var ACCENT = '#ff4d5e'; // couleur d'accent
  var style = document.createElement('style');
  style.id = 'bs-style';
  style.textContent = ":root{--bs-accent:#ff4d5e;--bs-gold:#ffcb05;--bs-bg:#0c1229;--bs-rail:#080d1f;--bs-panel:#151d3d;--bs-panel2:#1d2750;--bs-line:#2a3566;--bs-text:#eef1ff;--bs-muted:#a3acd6;--bs-rail-w:96px}\nhtml{left:var(--bs-rail-w) !important;width:calc(100% - var(--bs-rail-w)) !important}\nhtml,body{background:var(--bs-bg) !important;color:var(--bs-text) !important}\nbody{background-image:none !important;font-family:Inter,\"Segoe UI\",system-ui,sans-serif !important}\na{color:var(--bs-gold)}\n::-webkit-scrollbar{width:8px;height:8px}::-webkit-scrollbar-thumb{background:var(--bs-line);border-radius:8px}::-webkit-scrollbar-track{background:transparent}\n\n/* ---- Rail latéral betterShowdown ---- */\n#bs-rail{position:fixed;left:calc(var(--bs-rail-w) * -1);top:0;bottom:0;width:var(--bs-rail-w);background:var(--bs-rail);border-right:1px solid var(--bs-panel2);display:flex;flex-direction:column;align-items:center;padding:16px 0;gap:6px;z-index:9999;font-family:Inter,\"Segoe UI\",system-ui,sans-serif}\n#bs-rail .bs-logo{width:56px;height:56px;border-radius:16px;background:linear-gradient(135deg,var(--bs-accent),#c4163a);display:flex;align-items:center;justify-content:center;margin-bottom:12px;box-shadow:0 6px 18px rgba(255,77,94,.35)}\n#bs-rail button.bs-nav{width:76px;height:62px;border:0 !important;border-radius:16px !important;background:transparent !important;color:var(--bs-muted) !important;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;font-size:11px;font-weight:600;box-shadow:none !important;text-shadow:none !important;padding:0}\n#bs-rail button.bs-nav:hover{background:var(--bs-panel) !important;color:#fff !important}\n#bs-rail button.bs-nav.on{background:var(--bs-panel2) !important;color:#fff !important;box-shadow:inset 3px 0 0 var(--bs-accent) !important}\n#bs-rail svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}\n#bs-rail .bs-sp{flex:1}\n\n/* ---- Barre du haut / onglets ---- */\n.header,.dark .header,.header-vertical,.dark .header-vertical{background:var(--bs-rail) !important;border-bottom:1px solid var(--bs-panel2)}\n.mini-header,.maintabbarbottom,.tabbar:after,.dark .mini-header,.dark .maintabbarbottom,.dark .tabbar:after{background:var(--bs-rail) !important;border-color:var(--bs-panel2) !important}\n.tabbar .button,.tablist .button,.dark .tabbar .button,.dark .header-vertical .tablist .button{background:var(--bs-panel) !important;border:1px solid var(--bs-line) !important;color:var(--bs-text) !important;border-radius:12px !important;box-shadow:none !important;text-shadow:none !important}\n.tabbar .button:hover,.tablist .button:hover{border-color:var(--bs-gold) !important;background:var(--bs-panel2) !important}\n.tabbar .button.cur,.tabbar .button.cur:hover,.tablist .button.cur,.dark .tabbar .button.cur{background:var(--bs-panel2) !important;border-color:var(--bs-gold) !important;color:#fff !important}\n.tabbar .button.notifying,.tablist .button.notifying{background:var(--bs-accent) !important;border-color:var(--bs-accent) !important;color:#fff !important}\n.userbar .username,.dark .userbar .username{color:var(--bs-text) !important}\n\n/* ---- Salles, fenêtres, popups ---- */\n.ps-room,.dark .ps-room{border-color:var(--bs-line) !important}\n.ps-room.ps-room-light,.ps-room-light,.ps-room.ps-room-opaque,.ps-room-opaque{background:var(--bs-bg) !important;color:var(--bs-text) !important}\n.ps-overlay,.dark .ps-overlay{background:rgba(5,8,20,.6) !important}\n.ps-popup,.dark .ps-popup{background:var(--bs-panel) !important;color:var(--bs-text) !important;border:1px solid var(--bs-line) !important;border-radius:16px !important;box-shadow:0 18px 50px rgba(0,0,0,.55) !important}\n.ps-popup h3,.ps-popup p{color:var(--bs-text) !important}\n.mini-window-contents,.pm-window,.dark .pm-window{background:var(--bs-panel) !important;border:1px solid var(--bs-line) !important;border-radius:16px !important;color:var(--bs-text) !important}\n.mini-window-header,.pm-log{background:var(--bs-panel2) !important;color:var(--bs-text) !important}\n.mainmenu-footer,.mainmenu-footer small{color:var(--bs-muted) !important;text-shadow:none !important}\n.infobox,.infobox-limited,.roomlist,.dark .roomlist{background:var(--bs-panel) !important;border:1px solid var(--bs-line) !important;border-radius:14px !important;color:var(--bs-text) !important}\n\n/* ---- Boutons (hors attaques / Pokémon, qui gardent leurs couleurs de type) ---- */\n.button:not(.mainmenu1):not(.mainmenu2):not(.mainmenu3):not(.mainmenu4):not(.mainmenu5):not(.mainmenu6):not(.tabbar *):not(.tablist *),\nbutton:not(.bs-nav):not(.picon):not([class*=\"type-\"]):not(.tabbar *):not(.movemenu *):not(.switchmenu *):not(.userlist *){\n  border-radius:12px !important;border:1px solid var(--bs-line) !important;background:var(--bs-panel2) !important;color:var(--bs-text) !important;text-shadow:none !important;box-shadow:none !important}\n.button:not(.mainmenu1):not(.tabbar *):hover,button:not(.bs-nav):not(.tabbar *):not(.movemenu *):not(.switchmenu *):not(.userlist *):hover{border-color:var(--bs-gold) !important;background:#26336a !important}\n.button.mainmenu1,.button.mainmenu1:hover{background:linear-gradient(135deg,var(--bs-accent),#c4163a) !important;border:0 !important;color:#fff !important;border-radius:16px !important;box-shadow:0 8px 22px rgba(255,77,94,.35) !important;text-shadow:none !important}\n.button.mainmenu2,.button.mainmenu3,.button.mainmenu4,.button.mainmenu5,.button.mainmenu6{background:var(--bs-panel) !important;border:1px solid var(--bs-line) !important;color:var(--bs-text) !important;border-radius:16px !important;box-shadow:none !important;text-shadow:none !important}\n.button.mainmenu2:hover,.button.mainmenu3:hover,.button.mainmenu4:hover,.button.mainmenu5:hover,.button.mainmenu6:hover{border-color:var(--bs-gold) !important;background:var(--bs-panel2) !important}\n.button:disabled,button:disabled,.button.disabled{opacity:.45 !important}\n\n/* ---- Champs ---- */\ninput[type=text],input[type=password],input[type=search],input:not([type]),textarea,select,.textbox{background:var(--bs-bg) !important;color:var(--bs-text) !important;border:1px solid var(--bs-line) !important;border-radius:10px !important;box-shadow:none !important}\ninput:focus,textarea:focus,select:focus,.textbox:focus{outline:2px solid var(--bs-gold) !important;outline-offset:1px}\n\n/* ---- Chat & journal de combat ---- */\n.chat-log,.readable-bg,.battle-log,.dark .chat-log,.dark .readable-bg,.dark .battle-log{background:var(--bs-panel) !important;color:var(--bs-text) !important;backdrop-filter:none !important}\n.battle-log-add,.chat-log-add{background:var(--bs-panel) !important;border-color:var(--bs-line) !important}\n.chat .username,.chat strong{color:var(--bs-gold)}\n.chat.highlighted{background:rgba(255,203,5,.12) !important}\n.userlist,.dark .userlist{background:var(--bs-panel) !important;border-color:var(--bs-line) !important}\n.userlist li button{color:var(--bs-text) !important;background:transparent !important;border:0 !important}\n.userlist li button:hover{background:var(--bs-panel2) !important}\n\n/* ---- Combat : commandes ---- */\n.battle-controls,.battle-controls .whatdo{color:var(--bs-text) !important}\n.battle-controls p{color:var(--bs-text) !important}\n.movemenu button,.switchmenu button,.battle-controls button.movebutton,.battle-controls .switchmenu button{border-radius:14px !important}\n.movemenu button{font-weight:600 !important}\n.battle-controls .whatdo{font-weight:600}\n\n/* ---- Teambuilder ---- */\n.teamchartbox,.setchart,.teambuilder-results,.teamlist li,.team,.setmenu,.teambuilder-pokemon-import,.utilichart li.result{background:var(--bs-panel) !important;border-color:var(--bs-line) !important;color:var(--bs-text) !important}\n.utilichart li.result a,.utilichart li.result{color:var(--bs-text) !important}\n.utilichart li.result:hover,.utilichart li.result a:hover{background:var(--bs-panel2) !important}\n.teamlist li.team-folder-selected,.team-selected{background:var(--bs-panel2) !important}\n.teambuilder h2,.teambuilder h3,.teambuilder label{color:var(--bs-text) !important}\n\n/* ---- Classement & tableaux ---- */\n.ladder table,.ladder th,.ladder td,table.ladder{background:transparent !important;color:var(--bs-text) !important;border-color:var(--bs-line) !important}\n.ladder tr:nth-child(odd) td{background:rgba(255,255,255,.035) !important}\n.ladder th{color:var(--bs-muted) !important;text-transform:uppercase;font-size:10pt;letter-spacing:.06em}\n.ladder a{color:var(--bs-gold) !important}\n\n/* ---- Vues betterShowdown (accueil, équipes, classement) ---- */\n#bs-view{position:fixed;left:var(--bs-rail-w);right:0;top:56px;bottom:0;background:var(--bs-bg);z-index:15;overflow:auto;padding:28px 32px;box-sizing:border-box;color:var(--bs-text);font-family:Inter,\"Segoe UI\",system-ui,sans-serif;display:none}\n#bs-view.on{display:block}\n#bs-view h2,#bs-view h3{font-family:\"Exo 2\",Inter,sans-serif;margin:0;color:var(--bs-text)}\n#bs-view button,#bs-view a.bs-btn{font-family:inherit;cursor:pointer;text-decoration:none}\n.bs-hero{position:relative;overflow:hidden;border-radius:24px;padding:36px 44px;min-height:280px;box-sizing:border-box;background:linear-gradient(120deg,#1c2a78 0%,#4a1f6e 55%,#8a1f45 100%);margin-bottom:24px}\n.bs-hero .o1{position:absolute;right:-90px;top:-90px;width:420px;height:420px;border-radius:50%;border:56px solid rgba(255,255,255,.07)}\n.bs-hero .o2{position:absolute;right:70px;top:90px;width:150px;height:150px;border-radius:50%;background:rgba(255,203,5,.16)}\n.bs-hero .in{position:relative;max-width:640px}\n.bs-hero .tag{display:inline-block;padding:6px 14px;border-radius:14px;background:rgba(255,255,255,.14);font-size:13px;font-weight:600;margin-bottom:14px;color:#fff}\n.bs-hero h2{font-size:44px;line-height:1.05;margin-bottom:10px;font-weight:800;color:#fff}\n.bs-hero p{margin:0 0 10px;font-size:15px;line-height:1.5;color:#dfe3ff}\n.bs-hero .fm{font-size:13px;color:#dfe3ff;margin-bottom:16px}\n.bs-hero .fm b{color:var(--bs-gold)}\n.bs-hero .btns{display:flex;gap:10px;flex-wrap:wrap}\n.bs-hero .spr{position:absolute;right:48px;bottom:10px;display:flex;align-items:flex-end;gap:6px;pointer-events:none}\n.bs-hero .spr img{max-height:150px;filter:drop-shadow(0 8px 6px rgba(0,0,0,.35))}\n.bs-cta{height:48px;padding:0 26px;border:0;border-radius:24px;background:var(--bs-accent);color:#fff;font-size:15px;font-weight:600;box-shadow:0 8px 22px rgba(255,77,94,.45)}\n.bs-sec{height:48px;padding:0 22px;border:2px solid rgba(255,255,255,.4);border-radius:24px;background:transparent;color:#fff;font-size:15px;font-weight:600}\n.bs-sec:hover{border-color:#fff;background:rgba(255,255,255,.1)}\n.bs-grid{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:24px}\n.bs-card{background:var(--bs-panel);border:1px solid var(--bs-line);border-radius:20px;padding:22px;margin-bottom:24px}\n.bs-card h3{font-size:19px;margin-bottom:16px}\n.bs-chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}\n.bs-chip{height:38px;padding:0 16px;border-radius:19px;border:1px solid var(--bs-line);background:var(--bs-panel);color:var(--bs-text);font-size:13px;font-weight:600}\n.bs-chip:hover{border-color:var(--bs-gold)}\n.bs-chip.on{background:var(--bs-gold);border-color:var(--bs-gold);color:#14183a}\n.bs-teams{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}\n.bs-team{background:var(--bs-panel);border:1px solid var(--bs-line);border-radius:18px;padding:18px;display:flex;flex-direction:column;gap:12px;text-align:left;color:var(--bs-text);width:100%}\n.bs-team:hover{border-color:var(--bs-gold)}\n.bs-team .nm{font-family:\"Exo 2\",Inter,sans-serif;font-weight:800;font-size:18px}\n.bs-team .fmt{font-size:12px;color:var(--bs-muted)}\n.bs-team .mons{display:flex;gap:2px;min-height:48px;align-items:center}\n.bs-team .mons img{width:56px;height:56px;object-fit:contain;image-rendering:auto}\n.bs-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px;border-radius:14px;background:var(--bs-panel2);margin-bottom:8px;color:var(--bs-text);font-size:14px}\n.bs-row small{color:var(--bs-muted)}\na.bs-row{text-decoration:none}a.bs-row:hover{outline:1px solid var(--bs-gold)}\n.bs-muted{color:var(--bs-muted);font-size:14px;line-height:1.5}\n.bs-empty{padding:26px;border:1px dashed var(--bs-line);border-radius:18px;text-align:center}\n.bs-btn{display:inline-flex;align-items:center;height:42px;padding:0 20px;border-radius:21px;border:1px solid var(--bs-line);background:var(--bs-panel2);color:var(--bs-text);font-size:14px;font-weight:600}\n.bs-btn:hover{border-color:var(--bs-gold)}\n.bs-btn.pri{background:var(--bs-accent);border-color:var(--bs-accent);color:#fff}\n.bs-lad{width:100%;border-collapse:separate;border-spacing:0 8px}\n.bs-lad th{text-align:left;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--bs-muted);padding:0 16px 4px}\n.bs-lad td{background:var(--bs-panel);padding:13px 16px;font-size:15px}\n.bs-lad td:first-child{border-radius:14px 0 0 14px;width:70px;font-family:\"Exo 2\",Inter,sans-serif;font-weight:800;font-size:18px}\n.bs-lad td:last-child{border-radius:0 14px 14px 0}\n.bs-lad tr.top td{background:var(--bs-panel2)}\n.bs-search{height:40px;border-radius:20px;border:1px solid var(--bs-line);background:var(--bs-panel);color:var(--bs-text);padding:0 16px;font:inherit;font-size:14px;min-width:220px}\n@media (max-width:1250px){.bs-grid{grid-template-columns:minmax(0,1fr)}}\n".replace('--bs-accent:#ff4d5e', '--bs-accent:' + ACCENT);
  (document.head || document.documentElement).appendChild(style);

  var SPRITES = 'https://play.pokemonshowdown.com/sprites/';
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
  var state = { view: 'home', teamFmt: 'all', ladFmt: 'gen9ou', ladQ: '', lad: null, ladLoading: false, ladErr: '', sig: '' };
  var lastRoom = null;
  var LADDERS = [['gen9ou', 'OU'], ['gen9ubers', 'Ubers'], ['gen9uu', 'UU'], ['gen9randombattle', 'Aléatoire'], ['gen9monotype', 'Monotype'], ['gen9anythinggoes', 'AG']];

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function ps() { try { return window.PS || null; } catch (e) { return null; } }
  function join(room) { try { var P = ps(); if (P) { P.join(room); return true; } } catch (e) {} try { if (window.app) { room ? app.joinRoom(room) : app.focusRoom(''); return true; } } catch (e) {} return false; }
  function userName() { var P = ps(); return P && P.user && P.user.named ? P.user.name : ''; }

  // --- Données de l'utilisateur (lues dans le vrai client) ---
  function teams() {
    var P = ps(), out = [];
    try {
      (P && P.teams && P.teams.list || []).forEach(function (t) {
        var mons = [];
        String(t.packedTeam || '').split(']').forEach(function (m) {
          var f = m.split('|'); var sp = (f[1] || f[0] || '').trim();
          if (!sp) return;
          var low = sp.toLowerCase(), i = low.indexOf('-');
          var id = i > 0 ? low.slice(0, i).replace(/[^a-z0-9]/g, '') + '-' + low.slice(i + 1).replace(/[^a-z0-9]/g, '') : low.replace(/[^a-z0-9]/g, '');
          mons.push({ name: sp, id: id });
        });
        out.push({ key: t.key, name: t.name || 'Sans nom', format: String(t.format || '').replace(/^gen\d+/, '') || String(t.format || ''), rawFormat: t.format || '', mons: mons.slice(0, 6) });
      });
    } catch (e) {}
    return out;
  }
  function battles() {
    var P = ps(), out = [];
    try { Object.keys(P.rooms || {}).forEach(function (id) { if (/^battle-/.test(id)) out.push({ id: id, title: (P.rooms[id].title || id) }); }); } catch (e) {}
    return out;
  }

  // --- Vues ---
  function monImg(m) { return '<img src="' + SPRITES + 'gen5/' + esc(m.id) + '.png" alt="' + esc(m.name) + '" title="' + esc(m.name) + '" onerror="this.style.display=\'none\'">'; }
  function teamCard(t) {
    return '<button type="button" class="bs-team" data-act="openteam" data-key="' + esc(t.key) + '"><span class="nm">' + esc(t.name) + '</span><span class="fmt">' + esc(t.rawFormat || 'Format libre') + '</span><span class="mons">' + t.mons.map(monImg).join('') + '</span></button>';
  }
  function viewHome() {
    var n = userName(), tl = teams(), bl = battles();
    var spr = ['charizard', 'garchomp', 'pikachu'].map(function (s) { return '<img src="' + SPRITES + 'ani/' + s + '.gif" alt="" onerror="this.style.display=\'none\'">'; }).join('');
    var h = '<section class="bs-hero"><div class="o1"></div><div class="o2"></div><div class="in"><span class="tag">' + (n ? 'Bonjour ' + esc(n) : 'Simulateur de combats Pokémon en ligne') + '</span>' +
      '<h2>Prêt pour le prochain combat&nbsp;?</h2><p>Équipes aléatoires ou personnalisées, animations complètes, classement en temps réel.</p><div class="btns">' +
      '<button type="button" class="bs-cta" data-act="search">Rechercher un combat</button>' +
      '<button type="button" class="bs-sec" data-act="fmt">Choisir le format</button>' +
      '<button type="button" class="bs-sec" data-act="view-team">Mes équipes</button>' +
      (n ? '' : '<button type="button" class="bs-sec" data-act="login">Se connecter</button>') + '</div></div><div class="spr" aria-hidden="true">' + spr + '</div></section>';
    h += '<div class="bs-grid"><div>';
    h += '<section class="bs-card"><h3>Mes équipes</h3>' + (tl.length ? '<div class="bs-teams">' + tl.slice(0, 4).map(teamCard).join('') + '</div>' : '<div class="bs-empty"><p class="bs-muted">Aucune équipe pour l’instant.</p><button type="button" class="bs-btn pri" data-act="teambuilder">Créer une équipe</button></div>') + '</section>';
    h += '<section class="bs-card"><h3>Combats en cours</h3>' + (bl.length ? bl.map(function (b) { return '<button type="button" class="bs-row" style="width:100%;border:0;text-align:left" data-act="room" data-room="' + esc(b.id) + '"><span>' + esc(b.title) + '</span><small>Reprendre</small></button>'; }).join('') : '<p class="bs-muted">Aucun combat en cours.</p>') + '</section>';
    h += '</div><aside>';
    h += '<section class="bs-card"><h3>Outils</h3>' +
      '<a class="bs-row" href="https://calc.pokemonshowdown.com/" target="_blank" rel="noopener"><span>Calculateur de dégâts</span><small>↗</small></a>' +
      '<a class="bs-row" href="https://www.smogon.com/stats/" target="_blank" rel="noopener"><span>Statistiques d’usage</span><small>↗</small></a>' +
      '<a class="bs-row" href="https://dex.pokemonshowdown.com/" target="_blank" rel="noopener"><span>Pokédex</span><small>↗</small></a>' +
      '<a class="bs-row" href="https://replay.pokemonshowdown.com/" target="_blank" rel="noopener"><span>Replays</span><small>↗</small></a>' +
      '<a class="bs-row" href="https://www.smogon.com/dex/" target="_blank" rel="noopener"><span>Stratégie</span><small>↗</small></a></section>';
    h += '<section class="bs-card"><h3>Classement</h3><p class="bs-muted">Top 100 du format OU, mis à jour par le site officiel.</p><button type="button" class="bs-btn pri" data-act="view-ladder">Voir le classement</button></section>';
    return h + '</aside></div>';
  }
  function viewTeam() {
    var tl = teams(), fm = {}, h = '';
    tl.forEach(function (t) { fm[t.rawFormat || 'libre'] = 1; });
    var keys = Object.keys(fm);
    h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;gap:12px;flex-wrap:wrap"><h2 style="font-size:30px;font-weight:800">Mes équipes</h2><button type="button" class="bs-btn pri" data-act="teambuilder">Ouvrir le Teambuilder officiel</button></div>';
    if (keys.length > 1) {
      h += '<div class="bs-chips"><button type="button" class="bs-chip' + (state.teamFmt === 'all' ? ' on' : '') + '" data-act="tfmt" data-f="all">Toutes</button>' +
        keys.map(function (k) { return '<button type="button" class="bs-chip' + (state.teamFmt === k ? ' on' : '') + '" data-act="tfmt" data-f="' + esc(k) + '">' + esc(k) + '</button>'; }).join('') + '</div>';
    }
    var shown = tl.filter(function (t) { return state.teamFmt === 'all' || (t.rawFormat || 'libre') === state.teamFmt; });
    h += shown.length ? '<div class="bs-teams">' + shown.map(teamCard).join('') + '</div>' : '<div class="bs-empty"><p class="bs-muted">Aucune équipe trouvée. Si tu es connecté, tes équipes apparaissent ici.</p><button type="button" class="bs-btn pri" data-act="teambuilder">Créer une équipe</button></div>';
    return h;
  }
  function viewLadder() {
    var h = '<h2 style="font-size:30px;font-weight:800;margin-bottom:18px">Classement</h2><div class="bs-chips">' +
      LADDERS.map(function (l) { return '<button type="button" class="bs-chip' + (state.ladFmt === l[0] ? ' on' : '') + '" data-act="lfmt" data-f="' + l[0] + '">' + l[1] + '</button>'; }).join('') +
      '<input class="bs-search" id="bs-lq" type="search" placeholder="Filtrer par pseudo…" aria-label="Filtrer par pseudo" value="' + esc(state.ladQ) + '"></div>';
    if (state.ladLoading) return h + '<p class="bs-muted">Chargement…</p>';
    if (state.ladErr) return h + '<p class="bs-muted">' + esc(state.ladErr) + '</p>';
    if (!state.lad) return h;
    var q = state.ladQ.toLowerCase().replace(/[^a-z0-9]/g, '');
    var rows = (state.lad.toplist || []).map(function (r, i) { return { r: r, i: i }; }).filter(function (x) { return !q || String(x.r.userid).indexOf(q) === 0; });
    h += '<table class="bs-lad"><thead><tr><th>#</th><th>Dresseur</th><th>Elo</th><th>GXE</th><th>V / D</th></tr></thead><tbody>' +
      rows.slice(0, 100).map(function (x) {
        var r = x.r;
        return '<tr class="' + (x.i < 3 ? 'top' : '') + '"><td>' + (x.i + 1) + '</td><td><b>' + esc(r.username) + '</b></td><td>' + Math.round(r.elo) + '</td><td>' + Math.trunc(r.gxe) + '.' + String(r.gxe.toFixed(1)).slice(-1) + ' %</td><td>' + r.w + ' / ' + r.l + '</td></tr>';
      }).join('') + '</tbody></table>';
    return h;
  }
  function loadLadder() {
    state.ladLoading = true; state.ladErr = ''; state.lad = null; render();
    fetch('https://pokemonshowdown.com/ladder/' + state.ladFmt + '.json').then(function (r) { if (!r.ok) throw new Error('Erreur ' + r.status); return r.json(); })
      .then(function (d) { state.lad = d; state.ladLoading = false; render(); })
      .catch(function () { state.ladLoading = false; state.ladErr = 'Impossible de charger le classement pour le moment.'; render(); });
  }

  // --- Affichage ---
  var box;
  function render() {
    if (!box) return;
    var focusQ = document.activeElement && document.activeElement.id === 'bs-lq';
    box.innerHTML = state.view === 'team' ? viewTeam() : state.view === 'ladder' ? viewLadder() : viewHome();
    if (focusQ) { var i = document.getElementById('bs-lq'); if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); } }
    syncRail();
  }
  function show(v) {
    state.view = v; box.classList.add('on');
    if (v === 'ladder' && !state.lad && !state.ladLoading) { loadLadder(); return; }
    render();
  }
  function hide() { if (box) box.classList.remove('on'); syncRail(); }

  function onClick(e) {
    var t = e.target.closest ? e.target.closest('[data-act]') : null;
    if (!t) return;
    var a = t.getAttribute('data-act');
    if (a === 'search') { hide(); join(''); setTimeout(function () { var b = document.querySelector('.mainmenu button[name=search]'); if (b) b.click(); }, 400); }
    else if (a === 'fmt') { hide(); join(''); setTimeout(function () { var f = document.querySelector('.mainmenu .formatselect'); if (f) f.click(); }, 400); }
    else if (a === 'login') { join('login'); }
    else if (a === 'teambuilder') { hide(); join('teambuilder'); }
    else if (a === 'openteam') { hide(); join('team-' + t.getAttribute('data-key')); }
    else if (a === 'room') { hide(); join(t.getAttribute('data-room')); }
    else if (a === 'view-team') show('team');
    else if (a === 'view-ladder') show('ladder');
    else if (a === 'tfmt') { state.teamFmt = t.getAttribute('data-f'); render(); }
    else if (a === 'lfmt') { state.ladFmt = t.getAttribute('data-f'); loadLadder(); }
  }

  // --- Rail ---
  var NAV = [['home', 'Accueil', 'v:home'], ['battles', 'Combats', 'r:battles'], ['team', 'Équipes', 'v:team'], ['ladder', 'Classement', 'v:ladder'], ['rooms', 'Salons', 'r:rooms'], ['dex', 'Pokédex', 'u:https://dex.pokemonshowdown.com/'], ['replays', 'Replays', 'u:https://replay.pokemonshowdown.com/']];
  function btn(key, label, fn) {
    var b = document.createElement('button');
    b.className = 'bs-nav'; b.type = 'button'; b.dataset.k = key;
    b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[key] + '</svg>' + label;
    b.addEventListener('click', fn);
    return b;
  }
  function openOptions() { try { var P = ps(); if (P) { P.join('options'); return; } } catch (e) {} var b = document.querySelector('button[name=openOptions]'); if (b) b.click(); }
  function build() {
    if (document.getElementById('bs-rail')) return;
    var rail = document.createElement('nav');
    rail.id = 'bs-rail'; rail.setAttribute('aria-label', 'betterShowdown');
    var logo = document.createElement('div'); logo.className = 'bs-logo';
    logo.innerHTML = '<svg width="30" height="30" viewBox="0 0 24 24" fill="#ffcb05" aria-hidden="true"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>';
    rail.appendChild(logo);
    NAV.forEach(function (it) {
      var kind = it[2].charAt(0), val = it[2].slice(2);
      rail.appendChild(btn(it[0], it[1], function () {
        if (kind === 'v') show(val);
        else if (kind === 'r') { hide(); join(val); }
        else window.open(val, '_blank', 'noopener');
      }));
    });
    var sp = document.createElement('div'); sp.className = 'bs-sp'; rail.appendChild(sp);
    rail.appendChild(btn('options', 'Options', openOptions));
    document.body.appendChild(rail);
    box = document.createElement('main'); box.id = 'bs-view'; box.setAttribute('aria-label', 'betterShowdown');
    box.addEventListener('click', onClick);
    box.addEventListener('input', function (e) { if (e.target && e.target.id === 'bs-lq') { state.ladQ = e.target.value; render(); } });
    document.body.appendChild(box);
    // Un clic sur la barre d'onglets du client referme la vue betterShowdown
    document.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('.header, .tabbar, .ps-room')) hide(); }, true);
  }
  function syncRail() {
    var key = null;
    if (box && box.classList.contains('on')) key = state.view;
    else {
      var cur = null; try { if (ps() && PS.room) cur = PS.room.id; } catch (e) {}
      key = cur === '' ? null : cur === 'teambuilder' ? 'team' : cur === 'rooms' ? 'rooms' : cur === 'battles' ? 'battles' : (cur && /^battle-/.test(cur)) ? 'battles' : null;
    }
    document.querySelectorAll('#bs-rail .bs-nav').forEach(function (b) { b.classList.toggle('on', b.dataset.k === key); });
  }
  function tick() {
    var P = ps(), cur = null; try { cur = P && P.room ? P.room.id : null; } catch (e) {}
    if (cur !== lastRoom) { if (lastRoom !== null && cur !== '' ) hide(); lastRoom = cur; }
    if (box && box.classList.contains('on') && state.view !== 'ladder') {
      var sig = JSON.stringify([userName(), teams().map(function (t) { return t.key + t.name + t.mons.length; }), battles().length, state.teamFmt]);
      if (sig !== state.sig) { state.sig = sig; render(); }
    }
    syncRail();
  }
  function init() {
    build();
    var tries = 0, t = setInterval(function () { // attend que le client soit prêt, puis ouvre l'accueil betterShowdown
      if (ps() || ++tries > 40) { clearInterval(t); show('home'); }
    }, 250);
    setInterval(tick, 700);
  }
  if (document.body) init(); else document.addEventListener('DOMContentLoaded', init);
})();
