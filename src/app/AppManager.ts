import AppLogger from "@digivance/applogger";
import { App } from "electron";

export default class AppManager {
    private app: App;
    private logger?: AppLogger;

    constructor(app: App, logger: AppLogger) {
        this.app = app;
        this.logger = logger;

        this.close = this.close.bind(this);
    }

    public close() {
        this.logger?.logDebug('Electric acid cam closing down...');
        this.logger?.shutdown();
        this.app.quit();
    }

    public setLogger(logger: AppLogger) {
        this.logger = logger;
    }
};
