const SelectionFlags = ['all', 'any', 'first', 'last', 'middle'];


const defaults = {
    selection: SelectionFlags,
    negation: [false],
    item: false
};

export default class Flag {

    set(type, flag){
        this.__flag = this.__flag || {};
        this.__flag[type] = this.__flag[type] || [];
        this.__flag[type].unshift(flag);
    }
    get(type){
        if (this.__flag && this.__flag[type]) {
            if (type === 'negation') {
                return this.__flag[type].length % 2 !== 0;
            }
            return this.__flag[type][0];
        }
        // return the first index on the basis of the type
        return defaults[type][0];
    }
}
