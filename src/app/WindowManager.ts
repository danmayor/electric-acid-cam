import * as path from 'path';
import AppLogger from "@digivance/applogger";
import { BrowserWindow, dialog, OpenDialogOptions, OpenDialogReturnValue } from "electron";

/**
 * WindowManager exposes functionality related to our BrowserWindow
 * (This includes some dialog windows)
 */
export default class WindowManager {
    /**
     * The Electron BrowserWindow we are managing
     */
    private browserWindow: BrowserWindow;

    /**
     * Not perfect but tells us if the user has maximized the window
     * (so we can unmaximize it, it's weird)
     */
    private isMaximized: boolean;

    /**
     * @digivance/AppLogger that we use
     */
    private logger: AppLogger;

    /**
     * Standard constructor
     * 
     * @param logger The @digivance/AppLogger to use
     */
    constructor(logger: AppLogger) {
        this.browserWindow = new BrowserWindow({
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

        this.browserWindow.loadFile('index.html');
        this.isMaximized = false;
        this.logger = logger;

        this.maximize = this.maximize.bind(this);
        this.minimize = this.minimize.bind(this);
        this.selectFile = this.selectFile.bind(this);
        this.selectFolder = this.selectFolder.bind(this);

        this.logger.logTrace('new WindowManager()');
    }

    /**
     * Maximize / unmaximize the desktop app
     */
    public maximize() {
        this.logger.logTrace('WindowManager.maximize()');

        if (!this.isMaximized) {
            this.browserWindow.maximize();
        } else {
            this.browserWindow.unmaximize();
        }

        this.isMaximized = !this.isMaximized;
    }

    /**
     * Minimizes the desktop app
     */
    public minimize() {
        this.logger.logTrace('WindowManager.minimize()');

        this.browserWindow.minimize();
    }

    /**
     * Allows the UI thread to show the user a file select dialog, returns the OpenDialogReturnValue
     * 
     * @param options [Optional] options for the dialog
     * @returns The result of the dialog
     */
    public async selectFile(options?: OpenDialogOptions): Promise<OpenDialogReturnValue> {
        this.logger.logTrace('WindowManager.selectFile()');

        try {
            const res = await dialog.showOpenDialog(this.browserWindow, options);
            this.logger.logDebug('File select dialog result:', res);
            return res;
        } catch (err) {
            this.logger.logError('Failed to select file', err);
            throw err;
        }
    }

    /**
     * Allows the UI thread to show the user a folder select dialog, returns the OpenDialogReturnValue
     * 
     * @param options [Optional] options for the dialog
     * @returns The result of the dialog
     */
    public async selectFolder(options?: OpenDialogOptions): Promise<OpenDialogReturnValue> {
        this.logger.logTrace('WindowManager.selectFolder()');

        if (!options) options = { properties: ['openDirectory'] };
        else options.properties = [...options.properties, 'openDirectory'];

        try {
            const res = await dialog.showOpenDialog(this.browserWindow, options);
            this.logger.logDebug('Folder select dialog result:', res);
           return res;
        } catch (err) {
            this.logger.logError('Failed to select folder', err);
            throw err;
        }
    }

}