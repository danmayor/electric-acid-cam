import { contextBridge, ipcRenderer, OpenDialogOptions, OpenDialogReturnValue } from "electron";
import AppSettings from "./AppSettings";
import LaunchRequest from "./LaunchRequest";

// Link our AppApi methods so the UI can send the request to the App
// These are the ipc channels for ./AppApi.ts
contextBridge.exposeInMainWorld('app', {
    getAppSettings: async (): Promise<AppSettings> => {
        return await ipcRenderer.invoke('get/appsettings');
    },

    launchAcidCam: (launchRequest: LaunchRequest) => {
        ipcRenderer.send('app/launch', launchRequest)
    },

    maximize: () => {
        ipcRenderer.send('app/maximize');
    },

    minimize: () => {
        ipcRenderer.send('app/minimize');
    },

    saveAppSettings: async (command: AppSettings): Promise<void> => {
        await ipcRenderer.invoke('save/appsettings', command);
    },

    selectFolder: async (command?: OpenDialogOptions): Promise<OpenDialogReturnValue> => {
        return await ipcRenderer.invoke('select/folder', command);
    }
});
