/**
 * Represents our main launcher application settings
 */
export default interface AppSettings {
    /**
     * Path to acid cam
     */
    acidCamPath: string;

    /**
     * Path to capture folder
     */
    capturePath: string;

    /**
     * Log level that we want to emit, see LogLevel from applogger
     */
    logLevel: number;

    /**
     * Path to store log files
     */
    logPath: string;
}
