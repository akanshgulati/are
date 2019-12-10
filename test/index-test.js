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
    t.is(Are(nestMixedArray).flatten.any.of.number(), true);
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
    t.truthy(Are(['1', '2', '3', 4]).last.of.type('number'));
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
test("check date type", t => {
    const date1 = new Date();
    const date2 = new Date("2019-10-10");
    t.truthy(Are([date1, date2]).of.date());
    t.truthy(Are([date1, date2]).of.type('date'));
    t.truthy(Are([date1, '1', {}]).of.any.type('date'));
    t.truthy(Are([date1, '1', {}]).of.any.not.type('date'));
});

test("check null and undefined", t => {
    t.truthy(Are([undefined, undefined]).of.undefined());
    t.truthy(Are([null, null]).of.null());
    t.truthy(Are([null, undefined]).of.not.null());
    t.truthy(Are([null, undefined]).of.not.undefined());
    t.falsy(Are([undefined, undefined]).of.not.undefined());
    t.truthy(Are([null, undefined]).of.any.undefined());
});

test("check boolean type truthy", t => {
    t.truthy(Are([true, true]).of.truthy());
    t.truthy(Are([true, true]).of.type('truthy'));
    t.falsy(Are([true, true]).of.not.truthy());
    t.truthy(Are([true, false]).of.any.truthy());
    t.truthy(Are([false, false, ['1', true]]).of.flat.any.truthy());
    t.falsy(Are([false, false, ['1', true]]).of.flat.middle.truthy());
});
test("check boolean type falsy", t => {
    t.truthy(Are([false, false]).of.falsy());
    t.truthy(Are([true, true]).of.not.falsy());
    t.falsy(Are([false, false]).of.not.falsy());
    t.truthy(Are([true, false, ['1', true, false]]).of.flat.any.falsy());
    t.falsy(Are([false, false, ['1', true, '3']]).of.flat.middle.falsy());
    t.truthy(Are([false, true, [false, true, '3']]).of.flat.middle.falsy());
});

test("check number type integer", t => {
    t.truthy(Are([1, 2, 3, 4, -1, -4]).of.integer());
    t.truthy(Are([1, 2, 3, 4, -1, -4]).of.type('integer'));
    t.truthy(Are([1, 2, 3, 4, -1, -4]).of.type('Integer'));
    t.truthy(Are([1, 2, 3, 4, -1, -4]).of.type('INTEGER'));
    t.truthy(Are(['string', {}, [], -4]).of.any.integer());
    t.falsy(Are(['string', {}, [], -4]).of.all.integer());
    t.falsy(Are(['string', {}, [], -4]).of.middle.integer());
    t.truthy(Are(['string', 100000000000000000000, -4]).of.middle.integer());
    t.truthy(Are(['string', 1, -4]).of.not.integer());
});

test("check number type safe integer", t => {
    const upperLimit = Math.pow(2, 53) - 1;
    const lowerLimit = (Math.pow(2, 53) - 1) * -1;
    t.truthy(Are([1, 2, 3, 4, -1, -4]).of.safeInteger());
    t.truthy(Are([1, 2, 3, 4, -1, -4]).of.type('safeInteger'));
    t.truthy(Are([1, 2, 3, 4, -1, -4]).of.type('SafeInteger'));
    t.truthy(Are(['string', {}, [], -4]).of.any.safeInteger());
    t.falsy(Are(['string', {}, [], -4]).of.all.safeInteger());
    t.falsy(Are(['string', {}, [], -4]).of.middle.safeInteger());
    t.falsy(Are(['string', 100000000000000000000, -4]).of.middle.safeInteger());
    t.truthy(Are(['string', 1, -4]).of.not.safeInteger());
    t.truthy(Are([lowerLimit, upperLimit]).of.safeInteger());
    t.falsy(Are([lowerLimit, upperLimit + 1]).of.safeInteger());
    t.falsy(Are([lowerLimit - 1, upperLimit]).of.safeInteger());
});

test("check number type decimal", t => {
    t.truthy(Are([1.24, 1.23]).of.decimal());
    t.truthy(Are([1.24, "a", "1"]).any.of.decimal());
    t.truthy(Are([1, "a", "1"]).any.of.decimal());
    t.truthy(Are([1, "a", "1"]).any.of.float());
    t.truthy(Are([1, "a", "1"]).any.of.type('decimal'));
    t.truthy(Are([1, "a", "1"]).any.of.type('Decimal'));
    t.truthy(Are([1, "a", "1"]).any.of.type('DECIMAL'));
    t.truthy(Are([1, "a", "1"]).any.of.type('FLOAT'));
    t.truthy(Are([1, "a", "1"]).any.of.type('float'));
});
test("check number type finite", t => {
    t.truthy(Are([1.24, 1.23]).of.finite());
    t.truthy(Are([1.24, 1.23]).of.type('finite'));
});
test("check number type infinite", t => {
    const infinite1 = Infinity;
    const infinite2 = 1 / 0;
    t.truthy(Are([infinite1, infinite2]).of.infinite());
    t.truthy(Are([1, infinite1]).of.any.type('infinite'));
    t.falsy(Are([1, infinite1]).of.type('infinite'));
});
test("check number type positive number", t => {
    t.truthy(Are([1, 2, 3, 4]).of.positiveNumber());
    t.truthy(Are([1, 2, 3, 4, 0]).of.not.positiveNumber());
    t.truthy(Are([1, 2, 3, 4, 0]).of.any.not.positiveNumber());
    t.truthy(Are([1, 2, 3, 4, 0]).of.any.positiveNumber());
    t.falsy(Are([1, 2, 3, 4, 0]).of.type('PositiveNumber'));
    t.falsy(Are([1, 2, 3, 4, 0]).of.type('positiveNumber'));
    t.falsy(Are([1, 2, 3, 4, 0]).of.type('positive_number'));
});
test("check number type whole number", t => {
    t.truthy(Are([1, 2, 3, 4]).of.wholeNumber());
    t.truthy(Are([1, 2, 3, 4, 0]).of.wholeNumber());
    t.truthy(Are([1, 2, 3, 4, 0]).of.any.wholeNumber());
    t.falsy(Are([1, 2, 3, 4, -1]).of.type('wholeNumber'));
    t.falsy(Are([1, 2, 3, 4, -1]).of.type('whole_number'));
    t.falsy(Are([1, 2, 3, 4, -1]).of.type('Whole_Number'));
});
test("check number type negative number", t => {
    t.truthy(Are([-11, -12, -3, -4]).of.negativeNumber());
    t.truthy(Are([1, 2, 3, 4]).of.not.negativeNumber());
    t.truthy(Are([1, 2, 3, 4, 0]).of.any.not.negativeNumber());
    t.truthy(Are([1, 2, 3, -4, 0]).of.any.negativeNumber());
    t.falsy(Are([1, 2, 3, 4, 0]).of.type('negativeNumber'));
    t.falsy(Are([0]).of.type('negative_number'));
});

test("check number type zero", t => {
    t.truthy(Are([0, 0, 0]).of.zero());
    t.truthy(Are([-0, -0, -0]).of.zero());
    t.truthy(Are([0, 1]).any.of.zero());
    t.truthy(Are([0, 1]).any.of.not.zero());
    t.falsy(Are([1, 1]).any.of.zero());
    t.falsy(Are([1, -1]).any.of.zero());
    t.true(Are([1, -1, -0]).any.of.zero());
});