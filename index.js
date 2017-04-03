/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-03-22 14:52:32
* @Last Modified by:   noor
* @Last Modified time: 2017-04-03 12:42:59
*/
var colors = require('colors');
var output = require('./input.json');
var expectedOP = require('./output.json');
var testAPI = require('./test');
var tester = new testAPI();
var sum=8;
var pCount=4;

// Array.prototype.indexOfObj = function(obj){
// 	var arr = this;
// 	// tester.flagErrObj = false;
// 	for(var key in arr){
// 		var iObj = arr[key];
// 		tester.isEqual(iObj, obj)
// 		console.log(iObj,":",obj,tester.status);
// 		if(tester.status){
// 			return key;
// 		}
// 	}
// 	return -1;
// }

var arrObj = [
	{
		age:20,
		name:"noor"
	},
	{
		age:21,
		name:"kasim"
	},
	{
		age:44,
		name:"md"
	}
]

var obj = {
	age:21,
	name:"kasim"
}

console.log(tester.indexOfObj(arrObj, obj));


// console.log(arrObj.indexOfObj(obj));

//  console.log(tester.isEqual({
// 	age:21,
// 	name:"kasim"
// },{
// 	age:21,
// 	name:"kasim"
// }));

// tester.testIt({usr:1,sys:4}, function(){
// 	return {usr:Math.round(sum/(2*pCount)), sys:sum-Math.round(sum/(2*pCount))*pCount };
// })


// console.log( tester.status ? tester.status.toString().green : tester.status.toString().red);
// if(!tester.status){
// 	console.log("this is the error trace".bgRed);
// 	console.log(tester.getErrorStack());
// }
// var status = tester.testIt(expectedOP, function(){
// 	return input;
// })
// console.log( status ? status.toString().green : status.toString().red);
// if(!status){
// 	console.log("this is the error trace".bgRed);
// 	console.log(tester.getErrorStack());
// }
