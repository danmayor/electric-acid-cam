import { contextBridge, ipcRenderer, OpenDialogOptions, OpenDialogReturnValue } from "electron";
import AppSettings from "./AppSettings";
import LaunchRequest from "./LaunchRequest";

// Link our AppApi methods so the UI can send the request to the App
// These are the ipc channels for ./AppApi.ts
contextBridge.exposeInMainWorld('app', {
    /**
     * Registers getAppSettings method
     * 
     * @returns AppSettings
     */
    getAppSettings: async (): Promise<AppSettings> => {
        return await ipcRenderer.invoke('get/appsettings');
    },

    launchAcidCam: (launchRequest: LaunchRequest) => {
        ipcRenderer.send('app/launch', launchRequest)
    },

    /**
     * Registers our maximize method
     */
    maximize: () => {
        ipcRenderer.send('app/maximize');
    },

    /**
     * Registers our minimize method
     */
    minimize: () => {
        ipcRenderer.send('app/minimize');
    },

    /**
     * Registers our saveAppSettings method
     * 
     * @param command AppSettings to save
     */
    saveAppSettings: async (command: AppSettings): Promise<void> => {
        await ipcRenderer.invoke('save/appsettings', command);
    },

    /**
     * Registers our selectFile method
     * 
     * @param command [Optional] OpenDialogOptions for the dialog
     * @returns OpenDialogReturnValue
     */
    selectFile: async (command?: OpenDialogOptions): Promise<OpenDialogReturnValue> => {
        return await ipcRenderer.invoke('select/file', command);
    },

    /**
     * Registers our selectFolder method
     * 
     * @param command [Optional] OpenDialogOptions for the dialog
     * @returns OpenDialogReturnValue
     */
    selectFolder: async (command?: OpenDialogOptions): Promise<OpenDialogReturnValue> => {
        return await ipcRenderer.invoke('select/folder', command);
    }
});
