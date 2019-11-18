import test from 'ava';
import Are from "../dist/are.umd"

test('testing number array', t => {
    t.is(Are([1, 2, 3, 10, 12, 123]).of.number(), true);
    t.is(Are([1, 2, 3, 10, 12, 123]).of.all.number(), true);
    t.is(Are([1, 2, 3, 10, 12, 123]).of.not.string(), true);
    t.is(Are([1, 2, 3, 10, 12, 123]).middle.of.not.string(), true);
    t.is(Are([1, 2, 3, 12, 123]).middle.of.not.string(), true);
    t.is(Are([1, 2, 3, 12, 123]).middle.of.number(), true);
    t.is(Are([1, 2, 3, 12, 123, 19]).middle.of.number(), true);
    t.is(Are([1, 2, 3, 12, 123, 19]).middle.of.type('number'), true);
});
test("testing last element", t => {
    t.is(Are([1, 2, 3, '4', 5]).last.of.not.type('string') === true, true);
    t.is(Are([1, 2, 3, '4', 5]).last.of.number(), true);
    t.is(Are([1, 2, 3, '4', 5]).last.of.not.type('string') === true, true);
});
test("testing nested mixed array", t => {
    const nestMixedArray = [1, 2, 3, [4, 5, 6], [7, 8, 9, '10']];
    t.is(Are(nestMixedArray).flat.any.of.number(), true);
    t.is(Are(nestMixedArray).any.of.number(), true);
    t.is(Are(nestMixedArray).any.of.array(), true);
    t.is(Are(nestMixedArray).flat.any.of.string(), true);
});

test("testing nested number array", t => {
    const nestNumber = [1, 2, 3, [4, 5, 6], [7, 8, 9, 10]];
    t.is(Are(nestNumber).flat.not.of.string(), true);
    t.is(Are(nestNumber).flat.not.of.array(), true);
    t.is(Are(nestNumber).flat.of.array(), false);
    t.is(Are(nestNumber).flat.any.of.array(), false);
});

test("testing string array", t => {
    t.is(Are(['a', "a", 'b', 'c']).of.string(), true);
    t.is(Are(['a', "a", 'b', 'c']).of.type('string'), true);
    t.is(Are(['a', "a", 'b', 'c']).of.not.number(), true);
    t.is(Are(['a', "a", 'b', 'c']).of.number(), false);
    t.is(Are(['a', "a", 'b', 'c']).of.array(), false);
    t.is(Are(['a', "a", 'b', 'c']).middle.of.string(), true);
});

test("testing custom string in type", t => {
    t.is(Are(['a', "a", 'b', 'c']).of.type('string'), true);
    t.is(Are([1, 2, 3, 4, 5, 10]).of.type('number'), true);
    t.is(Are([[[[[0]]]]]).of.type('array'), true);
    t.is(Are([[[[[0]]]]]).flat.of.type('array'), false);
    t.is(Are([[[[[0]]]]]).of.flat.type('number'), true);
});
test("testing particular position in array", t => {
    t.is(Are([1, "a", 'b', 2]).middle.of.type('string'), true);
    t.is(Are([1, 4, 'b', 2]).middle.of.type('string'), false);
    t.is(Are([1, 'b', 2]).middle.of.type('string'), true);
    // overriding the position
    t.is(Are([1, 'b', 2]).middle.last.of.type('number'), true);
    t.is(Are([1, 'b', 2]).last.middle.of.type('string'), true);
    // checking first position
    t.is(Are([1, 'b', 2]).first.of.type('number'), true);
    // checking last position
    t.truthy(Are(['1','2','3',4]).last.of.type('number'));
});
test("testing different types", t => {
    // number
    t.truthy(Are([1, 2, 3, 4, 5]).of.type('number'));
    t.truthy(Are([1, 2, 3, 4, 5]).of.type('numbers'));
    t.truthy(Are([1, 2, 3, 4, 5]).of.number());
    // string
    t.truthy(Are(['1', '2', '3', '4']).of.type('string'));
    t.truthy(Are(['1', '2', '3', '4']).of.type('strings'));
    t.truthy(Are(['1', '2', '3', '4']).of.string());
    // array
    t.truthy(Are([[1], [2]]).of.type('array'));
    t.truthy(Are([[1], [2]]).of.array());
    // boolean
    t.truthy(Are([true, false]).of.boolean());
    t.truthy(Are([false]).of.type('bool'));
    t.truthy(Are([false]).of.type('boolean'));
    t.falsy(Are([0]).of.boolean());
});
test("throw error when wrong params given", t => {
    const error = t.throws(() => {
        Are("string")
    });
    t.is(error.message, 'Invalid input');

});

test("throw error when wrong type given", t => {
    const error = t.throws(() => {
        Are(["string"]).of.type();
    });
    t.is(error.message, 'Invalid number of parameters');
});
test("check negation", t => {
    t.truthy(Are([true, false]).of.not.string());
    t.falsy(Are([true, false]).of.not.boolean());
    t.truthy(Are([true, false]).of.not.array());
    t.truthy(Are([true, false]).of.not.any.string());
    t.falsy(Are([true, false]).of.any.not.boolean());
    t.truthy(Are([true, false]).of.any.not.array());
    t.truthy(Are([true, false]).of.any.not.array());
    t.falsy(Are(["string", 1, []]).last.of.not.array());
    t.falsy(Are(["string", 1, []]).first.of.not.string());
    t.falsy(Are(["string", 1, []]).middle.of.not.number());

    // check for multiple negations
    t.truthy(Are([true, false]).of.any.not.not.boolean());
    t.falsy(Are([true, false]).of.any.not.not.not.boolean());
});
