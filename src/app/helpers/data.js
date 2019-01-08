import isEmpty from 'ramda/src/isEmpty';
import equals from 'ramda/src/equals';

export function _objectToArray(object) {
    const flattened = [];

    Object.keys(object).forEach(key => {
        const node = object[key];

        if (typeof node === 'object' && node.length !== undefined) {
            flattened.push(..._objectToArray(node));
        } else {
            flattened.push(node);
        }
    });

    return flattened;
}

/**
 *
 *
 * @description Ověření datového typu Number dle regexp šablony.
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
 *
 *
 * @description Ověření proměnné (vč. objektů) zdali obsahuje hodnotu/y nebo zdali je prázdná.
 * @export
 * @param {any} value
 * @returns
 */
export function _isInvalid(value) {
    const isUndefined = value === undefined;
    const isUndefinedString = String(value) === 'undefined';
    const isNull = value === null;
    const isNullString = String(value) === 'null';
    const isEmptyString = value === '';
    const isSpaceString = value === ' ';
    const isNoneString = value === 'none';
    const isOther = isEmpty(value);

    return isUndefined || isUndefinedString || isNull || isNullString || isEmptyString || isSpaceString || isNoneString || isOther;
}

/**
 *
 *
 * @description Porovnání objektů.
 * @export
 * @param {any} objects
 * @returns
 */
export function _objectsAreDifferent(...objects) {
    return !equals(...objects);
}

export function _push(array = [], value) {
    array.push(value);

    return array;
}

export function _getIterableObject(object) {
    return Object.entries(object).map(entry => entry[1]);
}
