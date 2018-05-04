export function _isNumber(value) {
    const intPatt = /^-?\d+$/;
    const floatPatt = /^-?\d+.?\d+$/;

    return intPatt.test(value) || floatPatt.test(value);
}

export function _isValid(variable) {
    return variable === undefined || variable === null || (typeof variable === 'object' && (variable.length === 0 || Object.keys(variable).length === 0));
}

export function _objectsAreDifferent(object1, object2) {
    return JSON.stringify(object1) !== JSON.stringify(object2);
}

export function _deepClone(object) {
    return (_isValid(object)) ? JSON.parse(JSON.stringify(object)) : null;
}

export function _isLocalEnvironment() {
    return (/^http:\/\/localhost/.test(window.location.href) || /\d+\.\d+\.\d+\.\d+/.test(window.location.href));
}

export function _writeCookie(key, value, exdays = 30) {
    const date = new Date();
    date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));

    const expires = `expires=${date.toUTCString()}`;

    document.cookie = `${key}=${value};${expires};path=/`;
}

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
