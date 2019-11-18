import TypeEnum from './TypeEnum'
const Types =  {
    [TypeEnum.SELECTION_TYPE]: {
        ALL: 'all',
        ANY: 'any',
        FIRST: 'first',
        LAST: 'last',
        MIDDLE: 'middle'
    }
};
export const SelectionType = Types[TypeEnum.SELECTION_TYPE];
export default Types;
