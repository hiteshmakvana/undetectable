import UAParser from 'ua-parser-js';
const parser = new UAParser();

/**
 * Generic Error Logger
 * @param err
 */
const logError = (err: any) => {
    try {
        const uaResult = parser.getResult();
        let error = {
            error: err.toString(),
            browserName: uaResult.browser.name,
            browserVersion: uaResult.browser.version,
            osName: uaResult.os.name,
            osVersion: uaResult.os.version,
            deviceModel: uaResult.device.model,
            deviceType: uaResult.device.type,
            deviceMaker: uaResult.device.vendor,
            timestamp: new Date().toISOString()
        }
        if (process.env.NODE_ENV === 'development') {
            console.log(error);
        } else {
            // Log error to a remote server/provider
        }
    } catch (err) {}
}
export default logError;
