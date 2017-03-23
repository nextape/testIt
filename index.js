/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-03-22 14:52:32
* @Last Modified by:   noor
* @Last Modified time: 2017-03-23 13:29:39
*/
var colors = require('colors');
var input = require('./input.json');
var output = require('./output.json');
var testAPI = require('./test');
var tester = new testAPI();
var status = tester.isEqual(input, output);
console.log( status ? status.toString().green : status.toString().red);
if(!status){
	console.log("this is the error trace".bgRed);
	console.log(tester.getErrorStack());
}
