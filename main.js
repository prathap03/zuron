import { app, Menu, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';



// __dirname is not available in ES modules, so use this workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win;

function createWindow() {
    win = new BrowserWindow({
        show: false,
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    win.loadURL(new URL('file://' + path.join(__dirname, 'build/index.html')).toString());

    win.once('ready-to-show', () => {
        win.show();
    });

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', function() {
    createWindow();

    fs.readFile('./data/menu.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const template = JSON.parse(data);
        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});