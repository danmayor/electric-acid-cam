import { app, BrowserWindow } from 'electron';

/**
 * Creates our app window
 */
app.on('ready', () => {
    const win = new BrowserWindow({
        width: 1024,
        height: 720,
        center: true,
        frame: false,
        title: 'Electric Acid Cam'
    });

    win.loadFile('index.html');
});
