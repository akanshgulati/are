import {getSelection, flatArray, convertToType} from "../lib/util"
import Flag from "../lib/Flag"
import {SelectionType, InputType, ArrayType, NumberType, BooleanType} from "../lib/TypesConstant"
import ErrorEnum from "../lib/ErrorEnum"

class _Are {
    constructor(values) {
        // make deep copy of the values in order to not impact the original value
        this.values = [...values];
        this.length = values.length;
        this._flag = new Flag();
    }

    type(type, isCustomString = true) {
        if (!type) {
            throw new Error(ErrorEnum.INVALID_PARAMETERS);
        }
        if (isCustomString) {
            // checking type in case it's not in proper format
            if (type.charAt(0) === '[' && type.substr(-1) === ']') {
                type = type.slice(8, -1);
            }
            type = convertToType(type);
        }
        const info = getSelection.call(this);
        let result;
        
        // when any particular set of indexes are to be checked
        // case when "last", "middle", "first", etc. position are selected
        if (info.indexes && info.indexes.length) {
            result = info.indexes.some(index => {
                return info.method(this.values[index], type);
            })
        } else {
            result = this.values.some((item) => {
                return info.method(item, type);
            });
        }

        return info.isTruthy ? result : !result;
    }

    string() {
        return this.type(InputType.STRING);
    }

    number() {
        return this.type(InputType.NUMBER, false);
    }

    array() {
        return this.type(InputType.ARRAY, false);
    }

    boolean() {
        return this.type(InputType.BOOLEAN, false);
    }

    null() {
        return this.type(InputType.NULL, false);
    }

    undefined() {
        return this.type(InputType.UNDEFINED, false);
    }
    
    date() {
        return this.type(InputType.DATE, false);
    }
// ARRAY TYPE CHECKING
    int8Array(){
        return this.type(ArrayType.INT_8_ARRAY, false);
    }
    uint8Array() {
        return this.type(ArrayType.UNIT_8_ARRAY, false);
    }
    uint8ClampedArray() {
        return this.type(ArrayType.UNIT_8_CLAMPED_ARRAY, false);
    }
    int16Array() {
        return this.type(ArrayType.INT_16_ARRAY, false);
    }
    uint16Array() {
        return this.type(ArrayType.UNIT_16_ARRAY, false);
    }
    int32Array() {
        return this.type(ArrayType.INT_32_ARRAY, false);
    }
    uint32Array() {
        return this.type(ArrayType.UNIT_32_ARRAY, false);
    }
    float32Array() {
        return this.type(ArrayType.FLOAT_32_ARRAY, false);
    }
    float64Array() {
        return this.type(ArrayType.FLOAT_64_ARRAY, false);
    }
    bigInt64Array() {
        return this.type(ArrayType.BIG_INT_64_ARRAY, false);
    }
    bigUint64Array() {
        return this.type(ArrayType.BIG_UNIT_64_ARRAY, false);
    }
    dateView() {
        return this.type(ArrayType.DATEVIEW, false);
    }
    arrayBuffer() {
        return this.type(ArrayType.ARRAY_BUFFER, false);
    }
    sharedArrayBuffer() {
        return this.type(ArrayType.SHARED_ARRAY_BUFFER, false);
    }
    
    // number type
    integer() {
        return this.type(NumberType.INTEGER, false);
    }

    safeInteger() {
        return this.type(NumberType.SAFE_INTEGER, false);
    }

    finite() {
        return this.type(NumberType.FINITE, false);
    }

    infinite() {
        return this.type(NumberType.INFINITE, false);
    }
    
    wholeNumber() {
        return this.type(NumberType.WHOLE_NUMBER, false);
    }

    positiveNumber() {
        return this.type(NumberType.POSITIVE_NUMBER, false);
    }
    
    negativeNumber() {
        return this.type(NumberType.NEGATIVE_NUMBER, false);
    }

    zero() {
        return this.type(NumberType.ZERO, false);
    }
    
    decimal() {
        return this.type(NumberType.DECIMAL, false);
    }
    
    float() {
        return this.type(NumberType.FLOAT, false);
    }
    
    // boolean type
    truthy() {
        return this.type(BooleanType.TRUTHY, false);
    }

    falsy() {
        return this.type(BooleanType.FALSY, false);
    }

    // position related
    get all() {
        this._flag.set('selection', SelectionType.ALL);
        return this;
    }

    get any() {
        this._flag.set('selection', SelectionType.ANY);
        return this;
    }

    // exact position
    get middle() {
        this._flag.set('selection', SelectionType.MIDDLE);
        return this;
    }

    get last() {
        this._flag.set('selection', SelectionType.LAST);
        return this;
    }

    get first() {
        this._flag.set('selection', SelectionType.FIRST);
        return this;
    }

    // helpers to make sentences
    get of() {
        return this;
    }

    get not() {
        this._flag.set('negation', true);
        return this;
    }

    get flat() {
        this.values = flatArray(this.values);
        return this;
    }
    get flatten() {
        this.values = flatArray(this.values);
        return this;
    }
}

function Are(arr) {
    if (Object.prototype.toString.call(arr) !== '[object Array]') {
        throw new Error(ErrorEnum.INVALID_INPUT);
    }
    return new _Are(arr);
}

export default Are;
