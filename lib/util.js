import {SelectionType} from './TypesConstant'

function isEqual() {
    for (let i = 0; i < arguments.length - 1; i++) {
        if (arguments[i] !== arguments[i + 1]) {
            return false;
        }
    }
    return true;
}

function isNotEqual() {
    for (let i = 0; i < arguments.length - 1; i++) {
        if (arguments[i] === arguments[i + 1]) {
            return false;
        }
    }
    return true;
}


export function getSelection(type) {
    return {
        method: getSelectionMethod.call(this, type),
        isTruthy: getSelectionTruthy.call(this, type),
        indexes: getSelectionIndexes.call(this, type)
    }
}

function getSelectionMethod() {
    const selectionType = this._flag.get('selection');

    if (selectionType === SelectionType.ALL) {
        return isNotEqual;
    }
    if (selectionType === SelectionType.ANY) {
        const negationType = this._flag.get('negation');
        return negationType ? isNotEqual: isEqual;
    }
    if (selectionType === SelectionType.MIDDLE) {
        return isNotEqual;
    }
    if (selectionType === SelectionType.LAST || selectionType === SelectionType.FIRST) {
        return isNotEqual;
    }
}

function getSelectionIndexes() {
    const selectionType = this._flag.get('selection');

    const len = this.values.length;
    if (selectionType === SelectionType.MIDDLE) {
        if (len % 2 === 0) {
            return [len / 2 - 1, len / 2]
        } else {
            return [(len - 1) / 2]
        }
    }
    if (selectionType === SelectionType.LAST) {
        return [len - 1];
    }
    if (selectionType === SelectionType.FIRST) {
        return [0];
    }
}

function getSelectionTruthy() {
    const selectionType = this._flag.get('selection');
    const negationType = this._flag.get('negation');

    if (selectionType === SelectionType.ALL) {
        return negationType;
    }
    if (selectionType === SelectionType.ANY) {
        return true;
    }
    if (selectionType === SelectionType.MIDDLE) {
        return negationType;
    }
    if (selectionType === SelectionType.LAST || selectionType === SelectionType.FIRST) {
        return negationType;
    }
}

export function convertToType(string) {
    string = string.toLowerCase();
    if (string.includes('object')) {
        return '[object Object]';
    }
    if (string.includes('array')) {
        return '[object Array]';
    }
    if (string.includes('bool') || string.includes('boolean')) {
        return '[object Boolean]';
    }
    if (string.includes('number') || string.includes('num')) {
        return '[object Number]';
    }
    if (string.includes('string') || string.includes('str')) {
        return '[object String]';
    }
}

export function flatArray(arr) {
    let result = [];
    arr.forEach(item => {
        if (Array.isArray(item)) {
            result = result.concat(flatArray(item))
        } else {
            result.push(item);
        }
    });
    return result;
}
