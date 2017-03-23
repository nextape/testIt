/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-03-22 14:52:32
* @Last Modified by:   noor
* @Last Modified time: 2017-03-23 15:44:12
*/
var colors = require('colors');
var input = require('./input.json');
var expectedOP = require('./output.json');
var testAPI = require('./test');
var tester = new testAPI();
var status = tester.testIt(expectedOP, function(){
	return input;
})
console.log( status ? status.toString().green : status.toString().red);
if(!status){
	console.log("this is the error trace".bgRed);
	console.log(tester.getErrorStack());
}