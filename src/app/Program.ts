import { app, BrowserWindow, dialog, ipcMain, IpcMainInvokeEvent, OpenDialogOptions, OpenDialogReturnValue } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as fsa from 'fs/promises';

import AppLogger from '@digivance/applogger';
import { ConsoleProvider, FileProvider, FileProviderRotationInterval } from '@digivance/applogger/providers';

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
 * Our logging path (creates it if not exists)
 */
const __logpath = path.join(__dirname, 'logs');
if (!fs.existsSync(__logpath)) fs.mkdirSync(__logpath);

/**
 * The applogger we'll use
 */
const logger = new AppLogger([
    /**
     * Default console provider
     */
    new ConsoleProvider(),

    /**
     * File provider with daily rotation and saving to our logging path
     */
    new FileProvider({
        filePath: __logpath,
        rotationInterval: FileProviderRotationInterval.daily
    })
]);

logger.logInfo('Electric Acid Cam starting up...');

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
        logger.logInfo('Closing down boss');
        if (process.platform !== 'darwin') {
            app.quit();
            logger.shutdown();
        } else {
            logger.flushLogsNow();
        }
    }

    /**
     * Executes acid cam as a child process
     * 
     * @param props The command line options to launch with
     */
    private launchAcidCam(props: string[]) {
        logger.logError('Launch Acid cam request from UI but I don\'t know how to do it yet');
    }

    /**
     * Attempts to load AppSettings from __dirname/.appsettings, if not found
     * we return default AppSettings
     * 
     * @returns AppSettings
     */
    private async loadAppSettings(): Promise<AppSettings> {
        logger.logTrace('Loading app settings requested from UI');

        if (fs.existsSync(this.appSettingsFilename)) {
            const contents = await fsa.readFile(this.appSettingsFilename, 'utf8');
            const appSettings = JSON.parse(contents);
            logger.logTrace('App settings loaded', appSettings);
            return appSettings;
        }

        const appSettings = {
            acidCamPath: `${__dirname}/acidcam`,
            capturePath: `${__dirname}/acidcam/capture`
        };

        logger.logTrace('Returning default app settings', appSettings);
        return appSettings;
    }

    /**
     * Toggles between maximized and windowed
     */
    private maximize() {
        if (this.isMaximized) {
            this.win.unmaximize();
        } else {
            this.win.maximize();
        }

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
        logger.logDebug('Saving appsettings:', appSettings);

        try {
            const contents = JSON.stringify(appSettings);
            await fsa.writeFile(this.appSettingsFilename, contents, "utf8");
        } catch (err) {
            logger.logError('Failed to save app settings', err);
            throw err;
        }
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

        try {
            const res = await dialog.showOpenDialog(this.win, options);
            return res;
        } catch (err) {
            logger.logError('Failed to select folder', err);
            throw err;
        }
    }

    /**
     * Registers our window.app handlers
     */
    public registerHandlers() {
        logger.logInfo('Registering IPC handlers');

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
        logger.logInfo('Main application loading...');

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

        //this.win.webContents.openDevTools({ mode: 'detach' });

        // Scoping is weird, create an instance of me and use that to register handlers
        const program = new Program(this.win);
        program.registerHandlers();

        logger.logInfo('Rendering UI');
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
