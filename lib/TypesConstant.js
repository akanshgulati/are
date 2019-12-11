import TypeEnum from './TypeEnum'

const Types = {
    [TypeEnum.SELECTION_TYPE]: {
        ALL: 'all',
        ANY: 'any',
        FIRST: 'first',
        LAST: 'last',
        MIDDLE: 'middle'
    },
    [TypeEnum.INPUT_TYPE]: {
        OBJECT: 'Object',
        ARRAY: 'Array',
        BOOLEAN: 'Boolean',
        NUMBER: 'Number',
        STRING: 'String',
        DATE: 'Date',
        UNDEFINED: 'Undefined',
        ARRAY_BUFFER: 'ArrayBuffer',
        BIG_INT: 'BigInt',
        NULL: 'Null'
    },
    [TypeEnum.ARRAY_TYPE]: {
        INT_8_ARRAY: 'Int8Array',
        UNIT_8_ARRAY: 'Uint8Array',
        UNIT_8_CLAMPED_ARRAY: 'Uint8ClampedArray',
        INT_16_ARRAY: 'Int16Array',
        UNIT_16_ARRAY: 'Uint16Array',
        INT_32_ARRAY: 'Int32Array',
        UNIT_32_ARRAY: 'Uint32Array',
        FLOAT_32_ARRAY: 'Float32Array',
        FLOAT_64_ARRAY: 'Float64Array',
        BIG_INT_64_ARRAY: 'BigInt64Array',
        BIG_UNIT_64_ARRAY: 'BigUint64Array',
        ARRAY_BUFFER: 'ArrayBuffer',
        SHARED_ARRAY_BUFFER: 'SharedArrayBuffer',
        DATA_VIEW: 'DataView'
    },
    [TypeEnum.NUMBER_TYPE]: {
        INTEGER: 'Integer',
        SAFE_INTEGER: 'SafeInteger',
        DECIMAL: 'Decimal',
        FLOAT: 'Float',
        FINITE: 'Finite',
        INFINITE: 'Infinite',
        NATURE_NUMBER: 'NaturalNumber',
        WHOLE_NUMBER: 'WholeNumber',
        POSITIVE_NUMBER: 'PositiveNumber',
        NEGATIVE_NUMBER: 'NegativeNumber',
        ZERO: 'Zero'
    },
    [TypeEnum.BOOLEAN_TYPE]: {
        FALSY: 'Falsy',
        TRUTHY: 'Truthy'
    }
};
export const SelectionType = Types[TypeEnum.SELECTION_TYPE];
export const ArrayType = Types[TypeEnum.ARRAY_TYPE];
export const InputType = Types[TypeEnum.INPUT_TYPE];
export const NumberType = Types[TypeEnum.NUMBER_TYPE];
export const BooleanType = Types[TypeEnum.BOOLEAN_TYPE];
