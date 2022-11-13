import * as path from 'path';
import AppLogger from "@digivance/applogger";
import { BrowserWindow, dialog, OpenDialogOptions, OpenDialogReturnValue } from "electron";

export default class WindowManager {
    private browserWindow: BrowserWindow;
    private isMaximized: boolean;
    private logger: AppLogger;

    constructor(logger?: AppLogger) {
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
    }

    public maximize() {
        if (!this.isMaximized) {
            this.browserWindow.maximize();
        } else {
            this.browserWindow.unmaximize();
        }

        this.isMaximized = !this.isMaximized;
    }

    public minimize() {
        this.browserWindow.minimize();
    }

    /**
     * Allows the UI thread to show the user a folder select dialog, returns the OpenDialogReturnValue
     * 
     * @param options [Optional] options for the dialog
     * @returns The result of the dialog
     */
    public async selectFolder(options?: OpenDialogOptions): Promise<OpenDialogReturnValue> {
        if (!options) options = { properties: ['openDirectory'] };
        else options.properties = [...options.properties, 'openDirectory'];

        try {
            const res = await dialog.showOpenDialog(this.browserWindow, options);
            return res;
        } catch (err) {
            this.logger.logError('Failed to select folder', err);
            throw err;
        }
    }

}