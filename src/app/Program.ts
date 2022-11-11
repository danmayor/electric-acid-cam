import { app, BrowserWindow, dialog, ipcMain, IpcMainInvokeEvent, OpenDialogOptions, OpenDialogReturnValue } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as fsa from 'fs/promises';

import AppLogger from '@digivance/applogger';
import { ConsoleProvider, FileProvider, FileProviderRotationInterval } from '@digivance/applogger/providers';

import AppApi from '../common/AppApi';
import LaunchRequest from '../common/ipc/LaunchRequest';
import AppSettings from '../common/AppSettings';
import { LogLevel } from '@digivance/applogger/applogger';

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
     * Current appsettings for this instance
     */
    private appSettings: AppSettings;

    /**
     * Path to the file where we store app settings
     */
    private appSettingsFilename: string = `${__dirname}/.appsettings`;

    /**
     * Tells us if the window is maximized now or not
     */
    private isMaximized: boolean = false;

    /**
     * @digivance/applogger that we are using for this program instance
     */
    private logger: AppLogger;

    /**
     * Reference to the browser window we created
     */
    private win: BrowserWindow;

    constructor() {
    }

    /**
     * Creates this.logger from current appsettings.
     */
    private createLogger() {
        this.logger = new AppLogger([
            /**
             * Default console provider
             */
            new ConsoleProvider({ minLogLevel: this.appSettings.logLevel }),

            /**
             * File provider with daily rotation and saving to our logging path
             */
            new FileProvider({
                filePath: this.appSettings.logPath,
                minLogLevel: this.appSettings.logLevel,
                rotationInterval: FileProviderRotationInterval.daily
            })
        ]);
    }

    /**
     * Little helper that terminates our application when all of the BrowserWindows
     * close, except on MAC where we leave running in the background so we can easily
     * reactivate later (I dunno, it's MAC stuff)
     */
    private closeApp() {
        if (process.platform !== 'darwin') {
            this.logger?.shutdown();
            app.quit();
        } else {
            this.logger?.flushLogsNow();
        }
    }

    /**
     * Returns the current appsettings
     * 
     * @returns this.appSettings
     */
    private getAppSettings(): AppSettings {
        return this.appSettings;
    }

    /**
     * Executes acid cam as a child process
     * 
     * @param props The command line options to launch with
     */
    private launchAcidCam(props: string[]) {
        this.logger.logError('Launch Acid cam request from UI but I don\'t know how to do it yet');
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
        this.logger.logDebug('Saving appsettings:', appSettings);

        try {
            const contents = JSON.stringify(appSettings);
            await fsa.writeFile(this.appSettingsFilename, contents, "utf8");

            this.appSettings = appSettings;
            this.createLogger();
        } catch (err) {
            this.logger.logError('Failed to save app settings', err);
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
            this.logger.logError('Failed to select folder', err);
            throw err;
        }
    }

    /**
     * Attempts to load AppSettings from __dirname/.appsettings, if not found
     * we return default AppSettings
     * 
     * @returns AppSettings
     */
    public async loadAppSettings() {
        if (fs.existsSync(this.appSettingsFilename)) {
            const contents = await fsa.readFile(this.appSettingsFilename, 'utf8');
            this.appSettings = JSON.parse(contents);

            this.appSettings.logPath = this.appSettings.logPath ?? path.join(__dirname, 'logs');
            this.appSettings.logLevel = this.appSettings.logLevel ?? LogLevel.info;
        } else {
            this.appSettings = {
                acidCamPath: path.join(__dirname, 'acidcam'),
                capturePath: path.join(__dirname, 'acidcam', 'capture'),
                logLevel: LogLevel.info,
                logPath: path.join(__dirname, 'logs')
            };
        }
    }

    /**
     * Main entry point, creates our browser window, registers handlers and
     * loads the UI renderer content.
     */
    public static async main() {
        const program = new Program();
        program.win = new BrowserWindow({
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

        await program.loadAppSettings();
        await program.createLogger();

        program.registerHandlers();

        program.logger.logInfo('Rendering UI');
        program.win.loadFile('index.html');

        //program.win.webContents.openDevTools({ mode: 'detach' });
    }

    /**
     * Registers our window.app handlers
     */
    public registerHandlers() {
        this.logger.logInfo('Registering IPC handlers');

        app.on('window-all-closed', this.closeApp);

        ipcMain.on('app/launch', (_, command: LaunchRequest) => this.launchAcidCam(command.props));
        ipcMain.on('app/maximize', () => this.maximize());
        ipcMain.on('app/minimize', () => this.minimize());

        ipcMain.handle('get/appsettings', async () => this.getAppSettings());
        ipcMain.handle('save/appsettings', async (_, command: AppSettings) => this.saveAppSettings(command));
        ipcMain.handle('select/folder', async (_, command: OpenDialogOptions) => this.selectFolder(command));
    }
}

/**
 * Creates our app window
 */
app.on('ready', Program.main)

// This is that MAC re-activate request thing I guess
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) Program.main(); });
