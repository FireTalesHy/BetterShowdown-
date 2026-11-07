const { app, BrowserWindow, shell } = require('electron');
const fs = require('fs');
const path = require('path');

const SITE = 'https://play.pokemonshowdown.com/';
const PS_HOSTS = /(^|\.)(pokemonshowdown\.com|psim\.us|smogon\.com)$/;

function createWindow() {
  const win = new BrowserWindow({
    width: 1440, height: 900, minWidth: 1100, minHeight: 700,
    backgroundColor: '#0c1229', title: 'betterShowdown!', autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false }
  });
  const script = fs.readFileSync(path.join(__dirname, 'betterShowdown.js'), 'utf8');
  // Le restylage est injecté dans le vrai site à chaque chargement de page
  win.webContents.on('dom-ready', () => { win.webContents.executeJavaScript(script).catch(() => {}); });
  win.webContents.setWindowOpenHandler(({ url }) => {
    try { if (PS_HOSTS.test(new URL(url).hostname)) return { action: 'allow' }; } catch (_) {}
    shell.openExternal(url);
    return { action: 'deny' };
  });
  win.loadURL(SITE);
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
