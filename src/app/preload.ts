import { contextBridge, ipcRenderer } from "electron";
import LaunchRequest from "./ipc/LaunchRequest";

// Link our AppApi methods so the UI can send the request to the App
contextBridge.exposeInMainWorld('app', {
    launchAcidCam: (launchRequest: LaunchRequest) => {
        ipcRenderer.send('app/launch', launchRequest)
    },

    maximize: () => {
        ipcRenderer.send('app/maximize');
    },

    minimize: () => {
        ipcRenderer.send('app/minimize');
    }
});
