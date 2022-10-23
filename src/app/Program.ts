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
    constructor() {
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
     * Registers our window.app handlers
     */
    public registerHandlers() {
        app.on('window-all-closed', program.closeApp);

        ipcMain.on('app/launch', (_, command: LaunchRequest) => this.launchAcidCam(command.props));
    }

    /**
     * Main entry point, creates our browser window, registers handlers and
     * loads the UI renderer content.
     */
    public main() {
        const win = new BrowserWindow({
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
        const program = new Program();
        program.registerHandlers();

        win.loadFile('index.html');
    }
}

/**
 * Creates our app window
 */
const program = new Program();
app.on('ready', program.main)

// This is that MAC re-activate request thing I guess
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) program.main(); });
