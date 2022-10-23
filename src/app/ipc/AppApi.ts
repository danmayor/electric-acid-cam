import LaunchRequest from "./LaunchRequest";

/**
 * Defines the window.App type we use to communicate from UI (renderer)
 * to App (Program)
 */
export default interface AppApi {
    /**
     * Defined in Program.launchAcidCam
     */
    launchAcidCam: (launchRequest: LaunchRequest) => void;
};
