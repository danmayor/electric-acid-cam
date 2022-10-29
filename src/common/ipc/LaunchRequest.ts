/**
 * LaunchRequest is the object that our UI (renderer) sends to our main
 * Program (App) when requesting that we launch acid cam.
 */
export default interface LaunchRequest {
    /**
     * If provided this is the full path to the acid cam executable
     * (including acidcam.exe)
     */
    path: string;

    /**
     * Array of the properties selected within the UI to launch acid cam with
     */
    props: string[];
}
