/**
 * LaunchRequest is the object that our UI (renderer) sends to our main
 * Program (App) when requesting that we launch acid cam.
 */
export default interface LaunchRequest {
    autoFilterFile?: string;            // -A (file picker)

    /**
     * When captureMode is device, this is the camera resolution
     * we capture / record at
     * 
     * -c {cameraResolution}
     */
    cameraResolution?: string;

    /**
     * When captureMode is device, this is the camera device
     * index we will capture / record from
     * 
     * -d {captureDevice}
     */
    captureDevice?: number;

    /**
     * This helper tells the builder which capture mode we are
     * creating the command string for
     */
    captureMode?: 'device' | 'file' | 'screen';

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

    /**
     * When capture mode is file this is the start position
     * in seconde where we should begin playback of the 
     * input video filename
     * 
     * -7 {inputVideoStartAt}
     */
    inputVideoStartAt?: number;

    /**
     * When capture mode is file this is the filename of the
     * input video we will playback
     * 
     * -i {inputVideoFilename}
     */
    inputVideoFilename?: string;

    /**
     * When capture mode is file this indicates if we will loop
     * or repeat the input video playback
     * 
     * -R
     */
    inputVideoLoop?: boolean;

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

    /**
     * When capture mode is screen this indicates the x,y screen
     * position to capture from
     * 
     * -U {screenCapturePosition}
     */
    screenCapturePosition?: string;
    
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

// todo break this out with better error handling
export const buildLaunchCommand = (launchRequest: LaunchRequest): string => {
    let command = '';

    if (launchRequest.captureMode === 'device') {
        command
            += (launchRequest.captureDevice ? `-d ${launchRequest.captureDevice} ` : '')
            + (launchRequest.cameraResolution ? `-c ${launchRequest.cameraResolution}` : '');
        
    } else if (launchRequest.captureMode === 'file') {
        command
            += (launchRequest.inputVideoFilename ? `-i ${launchRequest.inputVideoFilename}` : '')
            + (launchRequest.inputVideoLoop === true ? '-R' : '')
            + (launchRequest.inputVideoStartAt ? `-7 ${launchRequest.inputVideoStartAt}` : '');
        
    } else if (launchRequest.captureMode === 'screen') {
        command
            += '-G'
            + (launchRequest.screenCapturePosition ? `-U ${launchRequest.screenCapturePosition}` : '');
        
    }

    return command;
}