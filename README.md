# RRStore
Simple round-robin store for numeric value.

## Install 

```
npm i rrstore
```

## Usage

```
var RRStore = require('rrstore');
var store = new RRStore(3); // Create empty store with 3 slots
store.push(4); 
store.push(1); 
store.push('text'); 
store.push(3); // override first value
// Result store is [3, 1, NaN]
console.log(store.avg) // 2
console.log(store.sum) // 4
console.log(store.min) // 1
console.log(store.max) // 3
console.log(store.last) // 3
...
var store = new RRStore([3, 'text', 1]);
store.push(4); 
// Result store is [4, NaN, 1];
```