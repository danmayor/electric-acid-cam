import { app, BrowserWindow, dialog, ipcMain, IpcMainInvokeEvent, OpenDialogOptions, OpenDialogReturnValue } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as fsa from 'fs/promises';
import AppApi from '../common/AppApi';
import LaunchRequest from '../common/ipc/LaunchRequest';
import AppSettings from '../common/AppSettings';

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
    /**
     * Path to the file where we store app settings
     */
    private appSettingsFilename = `${__dirname}/.appsettings`;

    /**
     * Tells us if the window is maximized now or not
     */
    private isMaximized: boolean = false;

    /**
     * Reference to the browser window we created
     */
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
     * Attempts to load AppSettings from __dirname/.appsettings, if not found
     * we return default AppSettings
     * 
     * @returns AppSettings
     */
    private async loadAppSettings(): Promise<AppSettings> {
        if (fs.existsSync(this.appSettingsFilename)) {
            const contents = await fsa.readFile(this.appSettingsFilename, 'utf8');
            const appSettings = JSON.parse(contents);
            return appSettings;
        }

        return {
            acidCamPath: `${__dirname}/acidcam`,
            capturePath: `${__dirname}/acidcam/capture`
        };
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
     * Saves our AppSettings to ./.appsettings
     * 
     * @param appSettings The appsettings to save
     */
    private async saveAppSettings(appSettings: AppSettings) {
        const contents = JSON.stringify(appSettings);
        await fsa.writeFile(this.appSettingsFilename, contents, "utf8");
    }

    /**
     * Allows the UI thread to show the user a folder select dialog, returns the OpenDialogReturnValue
     * 
     * @param options [Optional] options for the dialog
     * @returns The result of the dialog
     */
    private async selectFolder(options?: OpenDialogOptions): Promise<OpenDialogReturnValue> {
        if (!options) options = { properties: ['openDirectory'] };
        else options.properties = [...options.properties, 'openDirectory'];

        const res = await dialog.showOpenDialog(this.win, options);
        return res;
    }

    /**
     * Registers our window.app handlers
     */
    public registerHandlers() {
        app.on('window-all-closed', program.closeApp);

        ipcMain.on('app/launch', (_, command: LaunchRequest) => this.launchAcidCam(command.props));
        ipcMain.on('app/maximize', () => this.maximize());
        ipcMain.on('app/minimize', () => this.minimize());

        ipcMain.handle('save/appsettings', async (_, command: AppSettings) => this.saveAppSettings(command));
        ipcMain.handle('select/folder', async (_, command: OpenDialogOptions) => this.selectFolder(command));
        ipcMain.handle('load/appsettings', async () => this.loadAppSettings());
    }

    /**
     * Main entry point, creates our browser window, registers handlers and
     * loads the UI renderer content.
     */
    public main() {
        this.win = new BrowserWindow({
            width: 1200,
            height: 900,
            center: true,
            frame: false,
            title: 'Electric Acid Cam',
            webPreferences: {
                nodeIntegration: true,
                preload: path.join(__dirname, 'preload.js')
            }
        });

        this.win.webContents.openDevTools({ mode: 'detach' });

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
