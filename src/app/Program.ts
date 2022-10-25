import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import AppApi from './ipc/AppApi';
import LaunchRequest from './ipc/LaunchRequest';

/**
 * Adds our window.electronAPI property to global definitions
 */
declare global {
    interface Window {
        app: AppApi;
    }
};

/**
 * This is our main entry point, the application with access to the host
 * machine (including file system and ability to execute processes)
 */
class Program {
    private isMaximized: boolean = false;
    private win: BrowserWindow;

    constructor(win?: BrowserWindow) {
        this.win = win;
    }

    /**
     * Little helper that terminates our application when all of the BrowserWindows
     * close, except on MAC where we leave running in the background so we can easily
     * reactivate later (I dunno, it's MAC stuff)
     */
    private closeApp() {
        if (process.platform !== 'darwin') app.quit();
    }

    /**
     * Executes acid cam as a child process
     * 
     * @param props The command line options to launch with
     */
    private launchAcidCam(props: string[]) {
        console.log('Todo, launch with following props:');
        console.log(props);
    }

    /**
     * Toggles between maximized and windowed
     */
    private maximize() {
        if (this.isMaximized)
            this.win.unmaximize();
        else
            this.win.maximize();
        
        this.isMaximized = !this.isMaximized;
    }

    /**
     * Minimizes the window
     */
    private minimize() {
        this.win.minimize();
    }

    /**
     * Registers our window.app handlers
     */
    public registerHandlers() {
        app.on('window-all-closed', program.closeApp);

        ipcMain.on('app/launch', (_, command: LaunchRequest) => this.launchAcidCam(command.props));
        ipcMain.on('app/maximize', () => this.maximize());
        ipcMain.on('app/minimize', () => this.minimize());
    }

    /**
     * Main entry point, creates our browser window, registers handlers and
     * loads the UI renderer content.
     */
    public main() {
        this.win = new BrowserWindow({
            width: 1024,
            height: 720,
            center: true,
            frame: false,
            title: 'Electric Acid Cam',
            webPreferences: {
                nodeIntegration: true,
                preload: path.join(__dirname, 'preload.js')
            }
        });

        // Scoping is weird, create an instance of me and use that to register handlers
        const program = new Program(this.win);
        program.registerHandlers();

        this.win.loadFile('index.html');
    }
}

/**
 * Creates our app window
 */
const program = new Program();
app.on('ready', program.main)

// This is that MAC re-activate request thing I guess
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) program.main(); });
