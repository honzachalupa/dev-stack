// Zapíše cookie.
export function _setCookie(key, value, exdays = 30) {
    const date = new Date();
    date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));

    const expires = `expires=${date.toUTCString()}`;

    document.cookie = `${key}=${value};${expires};path=/`;
}

// Přečte cookie.
export function readCookieString(key) {
    const name = `${key}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i += 1) {
        let c = ca[i];

        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }

        if (c.includes(name)) {
            return c.substring(name.length, c.length);
        }
    }

    return '';
}

export function _getCookie(key) {
    const cookie = readCookieString(key);

    return (/^{.*}$/.test(cookie)) ? JSON.parse(cookie) : cookie;
}

// Vrátí název prohlížeče (využíváno k detekci CSS stylů především pro IE).
export function _getBrowserName() {
    if (navigator.userAgent.includes('Edge')) {
        return 'Edge';
    } else if ((navigator.userAgent.includes('Opera') || navigator.userAgent.includes('OPR'))) {
        return 'Opera';
    } else if (navigator.userAgent.includes('Chrome')) {
        return 'Chrome';
    } else if (navigator.userAgent.includes('Safari')) {
        return 'Safari';
    } else if (navigator.userAgent.includes('Firefox')) {
        return 'Firefox';
    } else {
        return 'IE';
    }
}

export function _getPlatformName() {
    const { userAgent, platform } = window.navigator;
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    const iosPlatforms = ['iPhone', 'iPad', 'iPod'];

    if (macosPlatforms.includes(platform)) {
        return 'Mac OS';
    } else if (iosPlatforms.includes(platform)) {
        return 'iOS';
    } else if (windowsPlatforms.includes(platform)) {
        return 'Windows';
    } else if (/Android/.test(userAgent)) {
        return 'Android';
    } else if (/Linux/.test(platform)) {
        return 'Linux';
    } else {
        return 'unknown';
    }
}

export function _onWindowResize(callback, runOnMount = true) {
    if (typeof callback === 'function') {
        const resizeEvent = throttler(() => {
            const { clientWidth: width, clientHeight: height } = document.body;

            const isLandscape = width > height;
            const orientation = isLandscape ? 'landscape' : 'portrait';
            const aspectRatio = isLandscape ? width / height : height / width;
            const numberOfPixels = width * height;

            callback({
                width,
                height,
                orientation,
                aspectRatio,
                numberOfPixels
            });
        }, 200);

        const mount = () => {
            if (runOnMount) {
                resizeEvent();
            }

            window.addEventListener('resize', resizeEvent);
        };

        const unmount = () => {
            window.removeEventListener('resize', resizeEvent);
        };

        return {
            mount,
            unmount
        };
    } else {
        throw new Error('Callback must be a function.');
    }
}

function throttler(fn, delay) {
    let lastCall = 0;

    return (...args) => {
        const now = (new Date()).getTime();

        if (now - lastCall < delay) {
            return null;
        }

        lastCall = now;

        return fn(...args);
    };
}
