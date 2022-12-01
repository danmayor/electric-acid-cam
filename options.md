# Acid Cam Options
This document intends to explain the various options currently available in Acid Cam. This project, Electric Acid Cam, means to provide a pretty UI that allows users to set these options and launch acid cam. Below is a listing of all the Acid Cam settings and features that we support and where to find them in the UI.

# Electric Acid Cam Settings
- Snapshot path & filename prefix (-e)
  - Where to store snapshots taken inside acid cam
  - Can press 7 in acid cam to take a snapshot

- Shader path (-p)
  - Path to a folder containing index.txt of current shaders

- Custom filter path (-W)
  - Path to custom filters

- Max frames in memory pool (-8)
  - Performance tuner, lower this number on if your ram is starving
  - Releases the pool once this number of frames have been reached

- Number of filter threads (-9)
  - For multi threading filters, this is how many you are letting them use

- Path to FFMPEG (-1)
  - Path to ffmpeg

# Input options
- Camera FPS (-u) (Must be used with camera device)
  - The desired input camera FPS

- Camera device (-d)
  - The capture device index of the camera we want to use

- Camera resolution (-c) (Must be used with Camera device)
  - Resolution to record from camera at

- Input file (-i) (Can not use with Camera device)
  - Supported formats: mp4, mov, mkv

- Loop video (-R) (Must use with Input file)
  - Loops the provided input file and keeps going

- Start video file position (-7)
  - Number of seconds to skip into video file (accepts decimals)

# Filters & Shaders
- Auto filter (-A)
  - Allows the user to supply a text file that contains a list of the shaders & filters that Acid Cam will use.

- Starting filter index (-S)
  - The starting filter by index
  - Use this or starting filter name

- Starting filter name (-Z)
  - The starting filter by name (supports comma separated list)
  - Use this or starting filter index

- Starting shader index (-H)
  - The starting shader index

- Colormap / palette (-C)
  - Numeric offset used to alter the color palette

- Texture image / video (-T)
  - For use with material shaders, this can be an image or a video.
  - Supported image formats: png, jpeg
  - Supported video formats: mp4, mpv, mkv

# Playlist options
- Playlist file (-L)
  - Text file with a list of filters to cycle through
  - Can then press L inside acid cam to enable / disable

- Enable playback filter mode (-B) (Requires playlist file)
  - Enables the playback filtering mode in acid cam

- Shuffle playlist (-q) (Requires enable playback filter mode)
  - Enables shuffling of your playlist file filters

# Output options
- FFMPG (Must be used with output file)
  - (-4) produce x264 output
  - (-5) produce x265 output

- Compression level (-m)
  - Supported values: crf

- Output file (-o)
  - The output file to write to, supported file types are:
    - mkv
    - mov
    - mp4

- Image output format (-s)
  - Output format of images
  - Supported formats: png, jpeg

- Output debug strings (-g)
  - Outputs debug text on std::out

- Monitor index (-M)
  - The monitor to capture from? render to?

- Screen mode
  - Maximized (-f)
  - Full screen (-F)
  - Windowed, normal no switch added

- Window resolution (-r) (Must be with Windowed screen mode)
  - Resoluton of the live output window, Default is 1280x720
