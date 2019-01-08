/* globals __BUILDTARGET__, __BASENAME__ */

export function _isDevEnvironment() {
    return __BUILDTARGET__ === 'dev';
}

export function _isProdEnvironment() {
    return __BUILDTARGET__ === 'prod' && __BASENAME__ === '/';
}
