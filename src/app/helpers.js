/**
 * Returns true if the value is considered as a Number. Returns false if not.
 *
 * @export
 * @param {any} value
 * @returns
 */
export function _isNumber(value) {
    const intPatt = /^-?\d+$/;
    const floatPatt = /^-?\d+.?\d+$/;

    return intPatt.test(value) || floatPatt.test(value);
}

/**
 * Determines that the variable is valid (e.g. not udefined, not null, has a length (Array) and more).
 *
 * @export
 * @param {any} variable
 * @returns
 */
export function _isValid(variable) {
    return variable === undefined || variable === null || (typeof variable === 'object' && (variable.length === 0 || Object.keys(variable).length === 0));
}

/**
 * Compares two objects.
 *
 * @export
 * @param {any} object1
 * @param {any} object2
 * @returns
 */
export function _objectsAreDifferent(object1, object2) {
    return JSON.stringify(object1) !== JSON.stringify(object2);
}

/**
 * Determines if the app is running on localhost or not.
 *
 * @export
 * @returns
 */
export function _isLocalEnvironment() {
    return (/^http:\/\/localhost/.test(window.location.href) || /\d+\.\d+\.\d+\.\d+/.test(window.location.href));
}

/**
 * Writes a cookie.
 *
 * @export
 * @param {any} key
 * @param {any} value
 * @param {number} [exdays=30]
 */
export function _writeCookie(key, value, exdays = 30) {
    const date = new Date();
    date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));

    const expires = `expires=${date.toUTCString()}`;

    document.cookie = `${key}=${value};${expires};path=/`;
}

/**
 * Reads a cookie.
 *
 * @export
 * @param {any} key
 * @returns
 */
export function _readCookie(key) {
    const name = `${key}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i += 1) {
        let c = ca[i];

        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

/**
 * Gets a name of used browser.
 *
 * @export
 * @returns
 */
export function _getUsedBrowser() {
    if ((navigator.userAgent.indexOf('MSIE') !== -1) || (!!document.documentMode === true)) {
        return 'IE';
    } else if (navigator.userAgent.indexOf('Edge') !== -1) {
        return 'Edge';
    } else if ((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) !== -1) {
        return 'Opera';
    } else if (navigator.userAgent.indexOf('Chrome') !== -1) {
        return 'Chrome';
    } else if (navigator.userAgent.indexOf('Safari') !== -1) {
        return 'Safari';
    } else if (navigator.userAgent.indexOf('Firefox') !== -1) {
        return 'Firefox';
    } else {
        return 'unknown';
    }
}
