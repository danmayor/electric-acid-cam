import { OpenDialogOptions, OpenDialogReturnValue } from "electron";
import AppSettings from "./AppSettings";
import LaunchRequest from "./ipc/LaunchRequest";

/**
 * Defines the window.App type we use to communicate from UI (renderer)
 * to App (Program)
 */
export default interface AppApi {
    /**
     * Defined in Program.getAppSettings
     */
    getAppSettings: () => Promise<AppSettings>;

    /**
     * Defined in Program.launchAcidCam
     */
    launchAcidCam: (launchRequest: LaunchRequest) => void;

    /**
     * Defined in Program.maximize
     */
    maximize: () => void;

    /**
     * Defined in Program.minimize
     */
    minimize: () => void;

    /**
     * Defined in Program.saveAppSettings
     */
    saveAppSettings: (command: AppSettings) => Promise<void>;

    /**
     * Defined in program.selectFolder
     */
    selectFolder: (command?: OpenDialogOptions) => Promise<OpenDialogReturnValue>;
};
