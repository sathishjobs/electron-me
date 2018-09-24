const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/main.html`);

    //close the all window or all process releated to this app
    mainWindow.on('closed', () => app.quit());

    //handle menu 
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

});

function createAddWindow() {

    let addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add New Todo',
        autoHideMenuBar: true
    })

    addWindow.loadURL(`file://${__dirname}/add.html`);

}


const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Todo',
                click() {
                    createAddWindow();
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
]

if (process.platform === 'darwin') {
    menuTemplate.unshift({});
}

//check production or dev environment
//production
//development
//
if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'Developer',
        submenu: [
            {
                label: 'Toogle Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
        ]
    })
}