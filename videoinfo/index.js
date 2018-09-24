/**
 * author sathish
 * about electron explore 
 */
const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    console.log('app is ready')
});

ipcMain.on('video:submit', (event, path) => {
    ffmpeg.ffprobe(path, (err, metadata) => {
        console.log('Video duration is: ', metadata.format.duration);
        mainWindow.webContents.send('video:metadata', metadata.format.duration);
    });
})