/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-03-21 18:55:25
* @Last Modified by:   noor
* @Last Modified time: 2017-04-12 16:31:40
*/

var tester = function(otps){
	this.errorStack = [];
	this.status = true;
	this.flagErrObj = !!otps ? !!otps.flagErrObj ? otps.flagErrObj: false : false;
}

tester.prototype.isEqual = function(input, output){
	var that = this;
	if(input === output){
		return that.status = true;
	}
	var keysInput = Object.keys(input);
	var keysOutput = Object.keys(output);
	if(keysOutput.length !== keysInput.length){
		printLengthError(input, output, that)
		return that.status = false;
	}else{
		for(var idx in keysInput){
			var key = keysInput[idx];
			if(keysOutput.indexOf(key) < 0){
				printObjectError(input, output, key, that)
				return that.status = false;
			}

			if((typeof input[key] === typeof output[key]) && typeof input[key] != "object"){
				if(input[key] !== output[key]){
					printObjectError(input, output, key, that)
					that.errorStack.push(key);
					return that.status = false;
				}
			}else{
				if(input[key] == output[key]){
					// continue;
				}else if(!that.typeCheck(input[key], output[key]) || !that.isEqual(input[key], output[key])){
					printInnerObjectError(input, output, key, that)
					that.errorStack.push(key);
					return that.status = false;
				}
			}
		}
	}
	return that.status = true;
}

function printLengthError(input, output, that){
	if(that.flagErrObj){
		console.log(`input key validation:- ${JSON.stringify(input)}`);
		console.log(`output key validation:- ${JSON.stringify(output)}`);
		console.log("Missing Key in Output: ".bgRed, key);
	}
}

function printObjectError(input, output, key, that){
	if(that.flagErrObj){
		console.log("input value validation:-".yellow, `${JSON.stringify(input)}`);
		console.log("output value validation:-".yellow, `${JSON.stringify(output)}`);
		console.log(`Values Not Equal for key: '${key}'`.bgRed);
	}
}

function printInnerObjectError(input, output, key, that){
	if(that.flagErrObj){
		console.log("********** The above error(s) is in these inner Objects **********".bgBlue);
		console.log("input inner:-".yellow, `${key}:${JSON.stringify(input[key])}`);
		console.log("output inner:-".yellow, `${key}:${JSON.stringify(output[key])}`);
	}
}

tester.prototype.typeCheck = function(obj1, obj2){
	var that = this;
	var arrType = Array.isArray(obj1) && Array.isArray(obj2);
	var objType = (obj1 instanceof Object ) && (obj2 instanceof Object )
	return arrType || ((Array.isArray(obj1) === Array.isArray(obj2)) && objType);
}


tester.prototype.isPureObject = function(obj1){
	var that = this;
	var objType = obj1 instanceof Object ;
	var arrType = obj1 instanceof Array;
	return !arrType && objType;
}

tester.prototype.getErrorStack = function(){
	var that = this;
	return that.errorStack.length ? that.errorStack.reverse().reduce(function(memo, key){
		return memo+"['"+key+"']";
	},'') : [];
}

tester.prototype.testIt = function(expectedOP, func){
	var that = this;
	if(!expectedOP || typeof func !== 'function'){
		return new Error("Kindly pass the correct arguments").stack;
	}

	return that.isEqual(expectedOP, func());
}

tester.prototype.indexOfObj = function(arr, obj){
	var that = this;
	that.flagErrObj = false;
	for(var key in arr){
		var iObj = arr[key];
		that.isEqual(iObj, obj)
		if(that.status){
			return key;
		}
	}
	return -1;
}


module.exports = tester;