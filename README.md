# betterShowdown!

A modern dark theme and navigation rail for [Pokémon Showdown](https://play.pokemonshowdown.com/), the online Pokémon battle simulator.

betterShowdown restyles the **real** Showdown client in place. It does not copy or simulate anything: your account, teams, battles, ladder rating and chat rooms are the official ones.

> Unofficial fan project. Not affiliated with or endorsed by Pokémon Showdown, Smogon, Nintendo, Game Freak or The Pokémon Company.

## Download

[![Install userscript](https://img.shields.io/badge/Install-userscript_(1_click)-ff4d5e?style=for-the-badge)](https://raw.githubusercontent.com/FireTalesHy/BetterShowdown-/main/betterShowdown.user.js)
[![Download extension](https://img.shields.io/badge/Download-browser_extension-4a90ff?style=for-the-badge)](https://github.com/FireTalesHy/BetterShowdown-/raw/main/downloads/betterShowdown-extension.zip)
[![Download desktop app](https://img.shields.io/badge/Download-desktop_app-2fc58b?style=for-the-badge)](https://github.com/FireTalesHy/BetterShowdown-/releases/latest)

- **Userscript**: with [Tampermonkey](https://www.tampermonkey.net/) or Violentmonkey installed, the first button opens the install prompt directly.
- **Extension**: downloads a zip. Unzip it, then load the folder as an unpacked extension (see below).
- **Desktop app**: installers (Windows, macOS, Linux) appear under Releases once a version has been built. Until then, use [the source zip](https://github.com/FireTalesHy/BetterShowdown-/raw/main/downloads/betterShowdown-app-source.zip) and run `npm install && npm start`.

## Features

- Built-in Pokédex (1,025 species: search, type filters, base stats, type matchups, abilities, evolutions and formes) using the data the Showdown client already loads.
- Custom Home, Teams, Team detail and Ladder screens with their own layout (hero banner, team cards with sprites, ladder table with filters), fed by the real client data: your account, your saved teams, running battles and the official ladder.
- Redesigned battle screen: framed arena, card-style controls, larger move buttons (type colors kept), restyled switch menu and battle log. Dark, Pokémon-inspired theme for tabs, chat rooms and the official Teambuilder. Move buttons keep their type colors.
- Collapsible chat rooms menu (joined rooms with unread dots, popular rooms, link to the full list) and a "big battle" mode: single-panel layout so the battle arena scales up to the full window width (toggle in the menu, on by default).
- Enlarged battle arena: the official client caps the arena at 640x360, betterShowdown zooms it automatically to fit the window (toggle in the rooms menu).
- Left navigation rail wired to the Showdown client: Home, Battles, Teams (Teambuilder), Ladder, Rooms and Options. Replays open the official site in a new tab.
- Three ways to run it, all using the same script.

## Install

### Browser extension (Chrome, Edge, Brave, recent Firefox)

1. Open `chrome://extensions` (or `edge://extensions`) and enable **Developer mode**.
2. Click **Load unpacked** and select the `extension/` folder.
   Firefox: `about:debugging` > **This Firefox** > **Load Temporary Add-on** > `extension/manifest.json`.
3. Open https://play.pokemonshowdown.com/

### Userscript (Tampermonkey / Violentmonkey)

Install a userscript manager, then open `betterShowdown.user.js` and confirm the installation.

### Desktop app (Electron)

```bash
cd app-electron
npm install
npm start        # run the app
npm run dist     # build an installer (Windows / macOS / Linux)
```

## Customize

- Accent color: edit the `ACCENT` variable at the top of `betterShowdown.js` / `betterShowdown.user.js`.
- Styles live in `style.css`. The script embeds this CSS, so after editing it, paste the new content into the `CSS_TEXT` string of the script (or rebuild).
- The Showdown client changes over time. If a part of the interface is no longer styled, adjust the CSS selectors accordingly.

## Repository layout

| Path | Purpose |
| --- | --- |
| `extension/` | Browser extension (Manifest V3, content script in the page context) |
| `betterShowdown.user.js` | Single-file userscript |
| `app-electron/` | Desktop wrapper that loads the site and injects the script |
| `style.css` | Readable copy of the stylesheet |
