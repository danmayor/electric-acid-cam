import * as path from 'path';
import * as fs from 'fs';
import * as fsa from 'fs/promises';

import AppSettings from "../common/AppSettings";
import LaunchRequest from "../common/LaunchRequest";
import AppLogger, { LogLevel } from '@digivance/applogger/applogger';

export default class ConfigManager {
    private appSettings: AppSettings;
    private appSettingsFilename: string;
    private launchRequest: LaunchRequest;
    private launchRequestFilename: string;
    private logger?: AppLogger;

    constructor(appSettingsFilename?: string, launchRequestFilename?: string, logger?: AppLogger) {
        this.appSettingsFilename = appSettingsFilename ?? path.join(__dirname, '.appsettings');
        this.launchRequestFilename = launchRequestFilename ?? path.join(__dirname, '.launchRequest');
        this.logger = logger;

        this.getAppSettings = this.getAppSettings.bind(this);
        this.getLaunchRequest = this.getLaunchRequest.bind(this);
        this.loadAppSettings = this.loadAppSettings.bind(this);
        this.loadLaunchRequest = this.loadLaunchRequest.bind(this);
        this.saveAppSettings = this.saveAppSettings.bind(this);
        this.saveLaunchRequest = this.saveLaunchRequest.bind(this);
        this.setAppSettings = this.setAppSettings.bind(this);
        this.setLaunchRequest = this.setLaunchRequest.bind(this);

        const loadAppSettings = async () => {
            const appSettings = await this.loadAppSettings();
            this.logger.logTrace('new ConfigManager()', appSettings);
        }

        loadAppSettings();
    }

    public getAppSettings(): AppSettings {
        this.logger.logDebug('ConfigManager.getAppSettings()', this.appSettings);
        return this.appSettings;
    }

    public getLaunchRequest(): LaunchRequest {
        this.logger.logTrace('ConfigManager.getLaunchRequest()');
        return this.launchRequest;
    }

    public async loadAppSettings(): Promise<AppSettings> {
        this.logger.logTrace('ConfigManager.loadAppSettings()');

        if (fs.existsSync(this.appSettingsFilename)) {
            const contents = await fsa.readFile(this.appSettingsFilename, 'utf8');
            this.logger.logDebug('Content loaded from file', contents);
            this.appSettings = JSON.parse(contents);

            this.appSettings.logPath = this.appSettings?.logPath ?? path.join(__dirname, 'logs');
            this.appSettings.logLevel = this.appSettings?.logLevel ?? LogLevel.info;
        } else {
            this.appSettings = {
                acidCamPath: path.join(__dirname, 'acidcam'),
                capturePath: path.join(__dirname, 'capture'),
                logLevel: LogLevel.info,
                logPath: path.join(__dirname, 'logs')
            };
            this.logger.logDebug('Loading defaults...', this.appSettings);
        }

        return this.appSettings;
    }

    public async loadLaunchRequest(): Promise<LaunchRequest> { 
        if (fs.existsSync(this.launchRequestFilename)) {
            const contents = await fsa.readFile(this.launchRequestFilename, 'utf8');
            this.launchRequest = JSON.parse(contents);
        } else {
            this.launchRequest = {
                // defaults here
            }
        }

        return this.launchRequest;
    }

    public async saveAppSettings() {
        const contents = JSON.stringify(this.appSettings);
        await fsa.writeFile(this.appSettingsFilename, contents, "utf8");
    }

    public async saveLaunchRequest() { 
        const contents = JSON.stringify(this.launchRequest);
        await fsa.writeFile(this.launchRequestFilename, contents, 'utf8');
    }

    public setAppSettings(appSettings: AppSettings) {
        this.appSettings = appSettings;
    }

    public setLaunchRequest(launchRequest: LaunchRequest) {
        this.launchRequest = launchRequest;
    }
}
