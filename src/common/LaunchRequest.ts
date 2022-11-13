/**
 * LaunchRequest is the object that our UI (renderer) sends to our main
 * Program (App) when requesting that we launch acid cam.
 */
export default interface LaunchRequest {
    autoFilterFile?: string;            // -A (file picker)
    cameraResolution?: string;          // -c (select available resolutions)
    captureDevice?: number;             // -d (select available devices)
    captureMode?: 'device' | 'file' | string; //just a helper
    codec?: string;                     // -X 
    colorMap?: string;                  // -C
    customFilterPath?: string;          // -W (folder picker)
    enablePlaybackFilterMode?: boolean; // -B (switch)
    enableSyphonServer?: boolean;       // -Y (switch)
    ffmpgCrf?: number;                  // -m (number)
    ffmpgPath?: string;                 // -1 (folder picker)
    ffmpgSupport?: number;              // -4 or -5 (switch)
    filterStartIndex?: number;          // -S (number)
    fps?: number;                       // -u (number)
    fullscreenMode?: number;            // -f (maximized window) or -F (full screen) (select)
    inputVideoStartAt?: number;         // -7 (number)
    inputVideoFilename?: string;        // -i (file picker)
    inputVideoLoop?: boolean;           // -R (switch)
    logToSocket?: string;               // -P
    materialTexture?: string;           // -T (file picker)
    monitorIndex?: number;              // -M (select of available monitors)
    outputDebugStrings?: string[];      // -g (multi line text field)
    outputFilename?: string;            // -o (save file as)
    outputImageFormat?: string;         // -s (select png, tif, jpeg)
    outputResolution?: string;          // -r (select available resolutions)
    playlistFilters?: string;           // -L
    playlistSlideshowTimeout?: number;  // -N (number)
    printFilterName?: string;           // -n (free text)
    restoreBlack?: boolean;             // -b (switch)
    screenCaptureMode?: boolean;        // -G (switch)
    screenCapturePosition?: string;     // -U (free text x,y)
    shaderPath?: string;                // -p (folder picker)
    shaderStartIndex?: number;          // -H (number)
    shortcutKeyFile?: string;           // -k (file picker)
    shuffleBeatsPerMinute?: number;     // -w (number)
    shufflePlaylist?: boolean;          // -q (switch)
    snapshotPrefix?: string;            // -e (free text)
    startingFilterName?: string;        // -Z (free text)
    stereoMode?: boolean;               // -x (switch)
};

export const DefaultLaunchRequest: LaunchRequest = {
    cameraResolution: '1280x720',
    captureMode: 'device'
}
