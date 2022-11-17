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

    /**
     * Path to filter files
     * 
     * -W "{customFilterPath}"
     */
    customFilterPath?: string;

    enablePlaybackFilterMode?: boolean; // -B (switch)
    enableSyphonServer?: boolean;       // -Y (switch)

    /**
     * FFMPG Crf?
     * 
     * -m {ffmpgCrf}
     */
    ffmpgCrf?: number;

    /**
     * FFMPG Path?
     * 
     * -1 "{ffmpgPath}"
     */
    ffmpgPath?: string;

    /**
     * FFMPG Support
     * 
     * 0 (Nothing)
     * 1 x264 (-4)
     * 2 x265 (-5)
     */
    ffmpgSupport?: number;

    /**
     * Index of the filter to start acid cam with
     * 
     * -S {filterStartIndex}
     */
    filterStartIndex?: number;

    /**
     * Output fps
     * 
     * -u {fps}
     */
    fps?: number;

    /**
     * Number representing normal windowed, maximized window or fullscreen
     * 
     * 0 - Windowed
     * 1 - Maximized
     * 2 - Fullscreen
     */
    fullscreenMode?: number;

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

    /**
     * The material texture we use for shaders?
     * 
     * -T "{materialTexture}"
     */
    materialTexture?: string;

    monitorIndex?: number;              // -M (select of available monitors)

    /**
     * Debug string ?
     * 
     * -g "{outputDebugStrings}"
     */
    outputDebugStrings?: string;

    /**
     * The filename (without path) to save recording to
     * 
     * -o "${outputFilename}"
     */
    outputFilename?: string;

    /**
     * Output file format
     * 
     * -s "{outputImageFormat}"
     */
    outputImageFormat?: string;

    /**
     * Resolution of the output
     * 
     * -f "{outputResolution}"
     */
    outputResolution?: string;          // -r (select available resolutions)

    /**
     * Playlist filters?
     * 
     * -L "${playlistFilters}"
     */
    playlistFilters?: string;

    /**
     * Playlist slideshow timeout
     * 
     * -N ${playlistSlideshowTimeout}
     */
    playlistSlideshowTimeout?: number;

    printFilterName?: string;           // -n (free text)
    restoreBlack?: boolean;             // -b (switch)

    /**
     * When capture mode is screen this indicates the x,y screen
     * position to capture from
     * 
     * -U "{screenCapturePosition}"
     */
    screenCapturePosition?: string;

    /**
     * The path to shaders that acid cam will use
     * 
     * -p "{shaderPath}"
     */
    shaderPath?: string;

    /**
     * The index of the shader that acid cam will start with
     * 
     * -H ${shaderStartIndex}
     */
    shaderStartIndex?: number;

    shortcutKeyFile?: string;           // -k (file picker)

    /**
     * Shuffle beats per minute?
     * 
     * -w ${shuffleBeatsPerMinute}
     */
    shuffleBeatsPerMinute?: number;

    /**
     * Shuffle playlist
     * 
     * -q
     */
    shufflePlaylist?: boolean;

    snapshotPrefix?: string;            // -e (free text)
    startingFilterName?: string;        // -Z (free text)
    stereoMode?: boolean;               // -x (switch)
};

export const DefaultLaunchRequest: LaunchRequest = {
    cameraResolution: '1280x720',
    captureDevice: 0,
    captureMode: 'device',
    inputVideoLoop: false,
    outputFilename: 'acid-capture.mpg',
    outputImageFormat: 'mpg',
    screenCapturePosition: '0,0'
}

// todo break this out with better error handling
export const buildLaunchCommand = (launchRequest: LaunchRequest): string => {
    let command = '';

    if (launchRequest.captureMode === 'device') {
        command
            += (launchRequest.captureDevice ? `-d ${launchRequest.captureDevice} ` : '-d 0 ')
            + (launchRequest.cameraResolution ? `-c ${launchRequest.cameraResolution} ` : '');
        
    } else if (launchRequest.captureMode === 'file') {
        command
            += (launchRequest.inputVideoFilename ? `-i "${launchRequest.inputVideoFilename}" ` : '')
            + (launchRequest.inputVideoLoop ? '-R ' : '')
            + (launchRequest.inputVideoStartAt ? `-7 ${launchRequest.inputVideoStartAt} ` : '');

    } else if (launchRequest.captureMode === 'screen') {
        command
            += '-G '
            + (launchRequest.screenCapturePosition ? `-U "${launchRequest.screenCapturePosition}" ` : '-U "0,0" ');
        
    }

    command += (launchRequest.shaderPath ? `-p "${launchRequest.shaderPath}" ` : '')
        + (launchRequest.shaderStartIndex ? `-H ${launchRequest.shaderStartIndex} ` : '-H 0 ')
        + (launchRequest.customFilterPath ? `-W "${launchRequest.customFilterPath}" ` : '')
        + (launchRequest.filterStartIndex ? `-S ${launchRequest.filterStartIndex} ` : '')
        + (launchRequest.outputFilename ? `-o "${launchRequest.outputFilename}" ` : '')
        + (launchRequest.outputImageFormat ? `-s "${launchRequest.outputImageFormat}" ` : '')
        + (launchRequest.outputResolution ? `-r "${launchRequest.outputResolution}" ` : '')
        + (launchRequest.fps ? `-u ${launchRequest.fps} ` : '-u 60 ')
        + (launchRequest.fullscreenMode === 1 ? '-f ' : '')
        + (launchRequest.fullscreenMode === 2 ? '-F ' : '')
        + (launchRequest.materialTexture ? `-T "${launchRequest.materialTexture}" ` : '')
        + (launchRequest.outputDebugStrings ? `-g "${launchRequest.outputDebugStrings}" ` : '')
        + (launchRequest.playlistFilters ? `-L "${launchRequest.playlistFilters}" ` : '')
        + (launchRequest.playlistSlideshowTimeout ? `-N ${launchRequest.playlistSlideshowTimeout} ` : '')
        + (launchRequest.shuffleBeatsPerMinute ? `-w ${launchRequest.shuffleBeatsPerMinute} ` : '')
        + (launchRequest.shufflePlaylist === true ? '-q ' : '')
        + (launchRequest.ffmpgCrf ? `-m ${launchRequest.ffmpgCrf} ` : '')
        + (launchRequest.ffmpgPath ? `-1 "${launchRequest.ffmpgPath}" ` : '')
        + (launchRequest.ffmpgSupport === 1 ? '-4 ' : '')
        + (launchRequest.ffmpgSupport === 2 ? '-5 ' : '');

    return command;
};
