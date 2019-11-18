# Are [![Build Status](https://travis-ci.com/akanshgulati/are.svg?branch=master)](https://travis-ci.com/akanshgulati/are) [![npm version](https://badge.fury.io/js/%40akanshgulati%2Fare.svg)](https://badge.fury.io/js/%40akanshgulati%2Fare)
A utility for type checking and searching element on a array of element(s). 
The pattern is inspired from `expect.js` framework supporting chaining to combine multiple operations.
> e.g. Are([1,2,3,4]).of.number() // returns true

## Installation

NPM
```shell
$ npm install @akanshgulati/are
```

YARN
```shell
$ yarn add @akanshgulati/are
```
## Usage 

```js
const Are = require('@akanshgulati/are');

Are([1,2,3,4]).of.number();
//=> true

Are(["🎉","🎁","🔆" ]).of.type('string');
//=> true'

Are(["a", "b", "c"]).of.not.type('string');
//=> false

Are([[[[[[[[[1]]]]]]]]]).flat.of.number();
//=> true
```

### Input 
\[element1, element2, ...]: Array

### Output
true/false: Boolean

## API
### Types
```
.string()
.number()
.boolean()
.object()
.array()
.type(<value>) // value can be "string", "number", "boolean", "array", "object"
```

### Helpers
**.all** // checks for all elements of array (default)


### Checking for all elements of array

 - `Are(ARRAY).of.type(value)` // custom('string', 'number', 'object', 'boolean', 'array')
 - `Are(ARRAY).of.number()` or `Are(ARRAY).of.number()` or `Are(ARRAY).all.of.number()`
 - `Are(ARRAY).of.object()` or - `Are(ARRAY).of.object()` or - `Are(ARRAY).all.of.object()`
 - `Are(ARRAY).of.string()` or - `Are(ARRAY).of.string()` or - `Are(ARRAY).all.of.string()`
 - `Are(ARRAY).of.boolean()` or - `Are(ARRAY).of.boolean()` or - `Are(ARRAY).all.of.boolean()`

### Checking for one element of array

- `Are(ARRAY).any.of.type(value)` // custom('string', 'number', 'object', 'boolean', 'array')
- `Are(ARRAY).any.of.number()`
- `Are(ARRAY).any.of.object()`
- `Are(ARRAY).any.of.string()`
- `Are(ARRAY).any.of.boolean()`

### Checking at a particular location

- `Are(ARRAY).middle.of.type(value)` // checks for (n-1)/2 index in case of odd and (n-1)/2 and n/2 indexes in case even
- `Are(ARRAY).first.of.type(value)` // checks for 0th index for type value
- `Are(ARRAY).last.of.type(value)` // checks last element for type value
- `Are(ARRAY).middle.of.not.type(value)` // returns true if `neither` of middle index(s) is of a type value
- `Are(ARRAY).first.of.not.type(value)` // checks only for 0th index for `not` to be of type value


### Nested Array
- `Are(ARRAY).flat.of.type(value)` // flatten array to same root and then checks for all elements for type value

### Negation
- `Are(ARRAY).of.not.type(value)` // checks if all the elements are of not type value

## Inspiration
Currently there are multiple libraries which check for a single element but not for an array of elements. 
- [is](https://www.npmjs.com/package/is) - Package which checks single element
- [expect](https://www.npmjs.com/package/expect.js) - Chaining of operations for testing assertions

## Todo
- More type checking like `.int16Array()`, `.float32Array()`
- Check for empty array `isEmpty()`
- Check for truthy elements if no element is undefined or null, `.isTruthy()`
- Check for integers, float values under type number, '`integers()`, `decimals()`

## Maintainers
- [Akansh Gulati](https://akansh.com)
