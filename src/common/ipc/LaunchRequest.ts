/**
 * LaunchRequest is the object that our UI (renderer) sends to our main
 * Program (App) when requesting that we launch acid cam.
 */
export default interface LaunchRequest {
    beatsPerMinute?: number;
    canResize?: boolean;
    deviceIndex?: number;
    deviceResolution?: string;
    enablePlayback?: boolean;
    filterIndex?: number;
    inputMode: "capture" | "file";
    isFullscreen?: boolean;
    outputAt?: string;
    outputCrf?: number;
    outputFolder?: string;
    outputFps?: number;
    outputMonitor?: number;
    playlistShuffle?: boolean;
    shaderAutoFilter?: string;
    shaderIndex?: number;
    shaderMaterial?: string;
    shaderPath?: string;
    shaderPlaylist?: string;
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

/**
 * Builds the command line string to launch acid cam based on provided
 * LaunchRequest
 */
export const buildLaunchString = (command: LaunchRequest): string => {
    return `-P -g -p "${command.shaderPath}" -d 0 -e "${command.outputFolder}" `;
}
