import {getSelection, flatArray, convertToType} from "../lib/util"
import Flag from "../lib/Flag"
import Types from "../lib/TypesConstant"
import ErrorEnum from "../lib/ErrorEnum"
const SelectionType = Types.SelectionType;

class _Are {
    constructor(values) {
        // make deep copy of the values in order to not impact the original value
        this.values = JSON.parse(JSON.stringify(values));
        this.length = values.length;
        this._flag = new Flag();
    }

    type(type) {
        if (!type) {
            throw new Error(ErrorEnum.INVALID_PARAMETERS);
        }
        // checking type in case it's not in proper format
        if (type.charAt(0) !== '[' || type.substr(-1) !== ']') {
            type = convertToType(type);
        }
        const info = getSelection.call(this);
        let result;
        // when any particular set of indexes are to be checked
        // case when "last", "middle", "first", etc. position are selected
        if (info.indexes && info.indexes.length) {
            result = info.indexes.some(index => {
                return info.method(Object.prototype.toString.call(this.values[index]), type);
            })
        } else {
            result = this.values.some((item) => {
                return info.method(Object.prototype.toString.call(item), type);
            });
        }

        return info.isTruthy ? result : !result;
    }

    string() {
        return this.type('[object String]');
    }

    number() {
        return this.type("[object Number]");
    }

    array() {
        return this.type("[object Array]");
    }

    boolean() {
        return this.type("[object Boolean]");
    }

    null() {
        return this.type("[object Null]");
    }

    undefined() {
        return this.type("[object Undefined]");
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
        this.flat();
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
