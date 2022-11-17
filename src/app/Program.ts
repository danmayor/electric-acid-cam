import * as path from 'path';
import * as fs from 'fs';
import { app, ipcMain, OpenDialogOptions } from 'electron';

import AppLogger from '@digivance/applogger';
import { ConsoleProvider, FileProvider, FileProviderRotationInterval } from '@digivance/applogger/providers';

import AppApi from '../common/AppApi';
import AppSettings from '../common/AppSettings';
import { LogLevel } from '@digivance/applogger/applogger';

import AppManager from './AppManager';
import WindowManager from './WindowManager';
import ConfigManager from './ConfigManager';
import LaunchRequest, { buildLaunchCommand } from '../common/LaunchRequest';

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
    private appManager: AppManager;
    private configManager: ConfigManager;

    /**
     * @digivance/applogger that we are using for this program instance
     */
    private logger: AppLogger;

    private windowManager: WindowManager;

    constructor() {
        this.createLogger();

        this.appManager = new AppManager(app, this.logger);
        this.configManager = new ConfigManager(undefined, undefined, this.logger);
        this.windowManager = new WindowManager(this.logger);

        this.createLogger = this.createLogger.bind(this);
        this.registerHandlers = this.registerHandlers.bind(this);

        this.registerHandlers();
    }

    /**
     * Creates this.logger from current appsettings.
     */
    public createLogger() {
        const appSettingsFilename = path.join(__dirname, '.appsettings');
        let appSettings = {
            acidCamPath: path.join(__dirname, 'acidcam'),
            capturePath: path.join(__dirname, 'capture'),
            logLevel: LogLevel.info,
            logPath: path.join(__dirname, 'logs')
        } as AppSettings;

        if (fs.existsSync(appSettingsFilename)) {
            const contents = fs.readFileSync(appSettingsFilename, 'utf8');
            appSettings = JSON.parse(contents);

            appSettings.logPath = appSettings?.logPath ?? path.join(__dirname, 'logs');
            appSettings.logLevel = appSettings?.logLevel ?? LogLevel.info;
        }

        this.logger = new AppLogger([
            /**
             * Default console provider
             */
            new ConsoleProvider({ minLogLevel: appSettings.logLevel }),

            /**
             * File provider with daily rotation and saving to our logging path
             */
            new FileProvider({
                filePath: appSettings.logPath,
                minLogLevel: appSettings.logLevel,
                rotationInterval: FileProviderRotationInterval.daily
            })
        ]);
    }

    public launchAcidCam(launchRequest: LaunchRequest) {
        const command = buildLaunchCommand(launchRequest);
        this.logger.logInfo('Build from command', launchRequest);
        this.logger.logInfo(`Launching acidcam...\nacidcam.exe ${command}`);
    }

    /**
     * Main entry point, creates our browser window, registers handlers and
     * loads the UI renderer content.
     */
    public static async main(): Promise<Program> {
        return new Program();
    }

    /**
     * Registers our window.app handlers
     */
    public registerHandlers() {
        this.logger?.logInfo('Registering IPC handlers');

        app.on('window-all-closed', () => {
            this.logger.shutdown();
            this.appManager.close();
        });

        ipcMain.on('app/launch', (_, command: LaunchRequest) => this.launchAcidCam(command));

        ipcMain.on('app/maximize', this.windowManager.maximize);
        ipcMain.on('app/minimize', this.windowManager.minimize);

        ipcMain.handle('get/appsettings', this.configManager.getAppSettings);
        ipcMain.handle('save/appsettings', async (_, command: AppSettings) => {
            this.configManager.setAppSettings(command);
            this.configManager.saveAppSettings();
        });

        ipcMain.handle('select/file', async (_, command: OpenDialogOptions) => this.windowManager.selectFile(command));
        ipcMain.handle('select/folder', async (_, command: OpenDialogOptions) => this.windowManager.selectFolder(command));
    }
}

/**
 * Creates our app window
 */
app.on('ready', async () => {
    const program = new Program();
    await program.createLogger();
});
