import {SelectionType, InputType, NumberType, BooleanType} from './TypesConstant'

function isEqual(value, type) {
    const nonPrimitiveCheck = isNonPrimitiveTypeCheck(value, type);
    return typeof nonPrimitiveCheck === 'boolean' ? nonPrimitiveCheck :
        Object.prototype.toString.call(value).slice(8, -1) === type;
}

function isNotEqual(value, type) {
    const nonPrimitiveCheck = isNonPrimitiveTypeCheck(value, type);
    return typeof nonPrimitiveCheck === 'boolean' ? !nonPrimitiveCheck :
        Object.prototype.toString.call(value).slice(8, -1) !== type;
}



function isNonPrimitiveTypeCheck(value, type) {
    if (type === NumberType.INTEGER) {
        return Number.isInteger(value);
    }
    if (type === NumberType.SAFE_INTEGER) {
        return Number.isSafeInteger(value);
    }
    if (type === NumberType.WHOLE_NUMBER) {
        return Number.isInteger(value) && value >= 0;
    }
    if (type === NumberType.NATURE_NUMBER) {
        return Number.isInteger(value) && value > 0;
    }
    if (type === NumberType.FINITE) {
        return Number.isFinite(value);
    }
    if (type === NumberType.INFINITE) {
        return !Number.isFinite(value);
    }
    if (type === NumberType.POSITIVE_NUMBER) {
        return Number.isFinite(value) && value > 0;
    }
    if (type === NumberType.NEGATIVE_NUMBER) {
        return Number.isFinite(value) && value < 0;
    }
    if (type === NumberType.ZERO) {
        return Number.isInteger(value) && value === 0;
    }
    if (type === NumberType.DECIMAL || type === NumberType.FLOAT) {
        return Number.isFinite(value);
    }
    
    // boolean types

    if (type === BooleanType.TRUTHY) {
        return value === true;
    }

    if (type === BooleanType.FALSY) {
        return value === false
    }
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
    const cloneString = string.toLowerCase();
    const originalPascalString = toPascalCase(string);
    const pascalString = originalPascalString.toLowerCase();
    if (cloneString.includes('bool')) {
        return InputType.BOOLEAN;
    }

    if (cloneString.includes('naturalnumber') || cloneString.includes('natural') 
        || pascalString.includes('naturalnumber') || pascalString.includes('natural')) {
        return NumberType.NATURE_NUMBER;
    }
    
    if (cloneString.includes('wholenumber') || cloneString.includes('whole')
        || pascalString.includes('wholenumber') || pascalString.includes('whole')) {
        return NumberType.WHOLE_NUMBER;
    }

    if (cloneString.includes('positivenumber') || cloneString.includes('positive')
        || pascalString.includes('positivenumber') || pascalString.includes('positive')) {
        return NumberType.NATURE_NUMBER;
    }
    
    if (cloneString.includes('negativenumber') || pascalString.includes('negativenumber')) {
        return NumberType.NEGATIVE_NUMBER;
    }
    
    if (cloneString.includes('number')) {
        return InputType.NUMBER;
    }
    if (cloneString.includes('string') || cloneString.includes('str')) {
        return InputType.STRING;
    }
    if (cloneString.includes('safeinteger') || pascalString.includes('safeinteger')) {
        return NumberType.SAFE_INTEGER;
    }
    return originalPascalString;
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

export function toPascalCase(string) {
    return string.match(/[a-z]+/gi)
        .map(function (word) {
            return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
        })
        .join('');
}