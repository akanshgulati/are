A utility for type checking and searching element on a array of element(s). 
The library is inspired from chai framework supporting chaining to combine multiple operations.

## Installation

As a node.js module
NPM
```shell
$ npm install are
```

YARN
```shell
$ npm install are
```

## Type checking
#### Input 
\[element1, element2, ...]: Array

#### Output
true/false: Boolean

### API

#### Checking for all elements of array

 - `Are(ARRAY).of.type(value)` // custom('string', 'number', 'object', 'boolean', 'array')
 - `Are(ARRAY).of.number()` or `Are(ARRAY).of.number()` or `Are(ARRAY).all.of.number()`
 - `Are(ARRAY).of.object()` or - `Are(ARRAY).of.object()` or - `Are(ARRAY).all.of.object()`
 - `Are(ARRAY).of.string()` or - `Are(ARRAY).of.string()` or - `Are(ARRAY).all.of.string()`
 - `Are(ARRAY).of.boolean()` or - `Are(ARRAY).of.boolean()` or - `Are(ARRAY).all.of.boolean()`

#### Checking for one element of array

- `Are(ARRAY).any.of.type(value)` // custom('string', 'number', 'object', 'boolean', 'array')
- `Are(ARRAY).any.of.number()`
- `Are(ARRAY).any.of.object()`
- `Are(ARRAY).any.of.string()`
- `Are(ARRAY).any.of.boolean()`

#### Checking at a particular location

- `Are(ARRAY).middle.of.type(value)` // checks for (n-1)/2 index in case of odd and (n-1)/2 and n/2 indexes in case even
- `Are(ARRAY).first.of.type(value)` // checks for 0th index for type value
- `Are(ARRAY).last.of.type(value)` // checks last element for type value
- `Are(ARRAY).middle.of.not.type(value)` // returns true if `neither` of middle index(s) is of a type value
- `Are(ARRAY).first.of.not.type(value)` // checks only for 0th index for `not` to be of type value


#### Nested Array
- `Are(ARRAY).flat.of.type(value)` // flatten array to same root and then checks for all elements for type value
