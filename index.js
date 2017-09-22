'use strict'
function RRStore(opts) {
	this.arr = (opts instanceof Array) ?
		opts.map((e) => isNaN(e) ? NaN : e) :
		new Array(Math.max(parseInt(opts) || 0, 1));

	this.i = -1;
	this.iMin = 0;
	this.iMax = 0;
	this.count = 0; // Count of non-NaN elements
	this.sum = NaN;
	this.lastNum = NaN;	
	Object.defineProperty(this, 'avg', {get: () => this.sum / this.count});
	Object.defineProperty(this, 'min', {get: () => this.arr[this.iMin]});
	Object.defineProperty(this, 'max', {get: () => this.arr[this.iMax]});
	Object.defineProperty(this, 'last', {get: () => this.arr[this.i]});
} 

RRStore.prototype.push = function (e) {
	let i = (this.i + this.arr.length + 1) % this.arr.length;

	let prev = this.arr[i];
	this.arr[i] = isNaN(e) ? NaN : e;
	this.i = i;

	// sum, avg, lastNum
	if (!isNaN(prev)) {
		this.count--;
		this.sum = (this.count == 0) ? NaN : this.sum - prev;
	}

	if (!isNaN(e)) {
		this.lastNum = e;
		this.count++;
		this.sum = isNaN(this.sum) ? e : this.sum + e;
	}

	// min
	if (this.iMin == i) {	
		this.iMin = 0;
		let min = this.min;
		this.arr.forEach((e, j) => (!isNaN(e) && (e < min || isNaN(min))) && (min = e) && (this.iMin = j));
	} else {
		let min = this.min;
		this.iMin = (!isNaN(e) && (isNaN(min) || e < min)) ? i : this.iMin; 
	}

	// max
	if (this.iMax == i) {	
		this.iMax = 0;
		let max = this.max;
		this.arr.forEach((e, j) => (!isNaN(e) && (e > max || isNaN(max))) && (max = e) && (this.iMax = j));
	} else {
		let max = this.max;
		this.iMax = (!isNaN(e) && (isNaN(max) || e > max)) ? i : this.iMax; 
	}

	return this.arr;
}

module.exports = RRStore;