/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-03-22 14:52:32
* @Last Modified by:   nurulnabi
* @Last Modified time: 2017-03-28 22:55:04
*/
var colors = require('colors');
var input = require('./input.json');
var expectedOP = require('./output.json');
var testAPI = require('./test');
var tester = new testAPI();
// var status = tester.testIt(expectedOP, function(){
// 	return input;
// })
// console.log( status ? status.toString().green : status.toString().red);
// if(!status){
// 	console.log("this is the error trace".bgRed);
// 	console.log(tester.getErrorStack());
// }

var getCurrntAchvmnt = function(){
	var newAchvmnt = [];
	for(var achmnt of achievements){
		var lockedStars = Number.MAX_VALUE;
		var unlockedStars = Number.MAX_VALUE;
		var lockedId = null;
		var unlockedId = null;
		var maxStars = 3;

		for(var id in achmnt){
			var nachvmnt = achmnt[id];
			if(!nachvmnt.isUnlock){
				if(nachvmnt.stars < lockedStars){
					lockedStars = nachvmnt.stars;
					lockedId = id;
				}
			}
			if(nachvmnt.isUnlock && (!nachvmnt.isCollect || (nachvmnt.isCollect && nachvmnt.stars == maxStars))){
				if(nachvmnt.stars < unlockedStars){
					unlockedStars = nachvmnt.stars;
					unlockedId = id;
				}
				if(nachvmnt.stars === maxStars && nachvmnt.isCollect){
					unlockedStars = nachvmnt.stars;
					unlockedId = id;
				}
			}
		}
		if(lockedStars < unlockedStars){
			newAchvmnt.push(achmnt[lockedId]);
		}else {
			newAchvmnt.push(achmnt[unlockedId]);
		}
	}
	console.log(newAchvmnt);
	return newAchvmnt;
}

var achievements = require('./inAchvmnt.json');

var expectedOP = [
	{
		"isUnlock":false,
		"isCollect":false,
		"stars":1
	},
	{
		"isUnlock":true,
		"isCollect":false,
		"stars":1
	},
	{
		"isUnlock":false,
		"isCollect":false,
		"stars":2
	},
	{
		"isUnlock":true,
		"isCollect":false,
		"stars":2
	},
	{
		"isUnlock":false,
		"isCollect":false,
		"stars":3
	},
	{
		"isUnlock":true,
		"isCollect":false,
		"stars":3
	},
	{
		"isUnlock":true,
		"isCollect":true,
		"stars":3
	},
]

// tester.testIt(expectedOP, getCurrntAchvmnt);

// console.log(tester.status);

getCurrntAchvmnt();