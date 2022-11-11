/**
 * LaunchRequest is the object that our UI (renderer) sends to our main
 * Program (App) when requesting that we launch acid cam.
 */
export default interface LaunchRequest {
    canResize?: boolean;
    deviceIndex?: number;
    deviceResolution?: string;
    filterIndex?: number;
    inputMode: "capture" | "file";
    isFullscreen?: boolean;
    outputFps?: number;
    outputMonitor?: number;
    shaderIndex?: number;
    shaderPath?: string;
    startAtIndex?: number;
    videoFilename?: string;
    videoFileRepeat?: boolean;
    windowResolution?: string;
}

/**
 * Default launch request
 */
export const DefaultLaunchRequest: LaunchRequest = {
    deviceIndex: 0,
    deviceResolution: '800x600',
    inputMode: "capture",
    outputFps: 60,
    windowResolution: '800x600'
}
