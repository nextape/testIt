/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-03-21 18:55:25
* @Last Modified by:   noor
* @Last Modified time: 2017-03-23 15:15:43
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
		console.log("Expected Keys: ", keysInput);
		console.log("Output Keys: ", keysOutput);
		console.log("Conclusion: Keys Different".bgRed);
		return that.status = false;
	}else{
		for(var idx in keysInput){
			var key = keysInput[idx];
			if(keysOutput.indexOf(key) < 0){
				console.log(`input key validation:- ${JSON.stringify(input)}`);
				console.log(`output key validation:- ${JSON.stringify(output)}`);
				console.log("Missing Key in Output: ".bgRed, key);
				return that.status = false;
			}

			if((typeof input[key] === typeof output[key]) && typeof input[key] != "object"){
				if(input[key] !== output[key]){
					console.log("input value validation:-".yellow, `${JSON.stringify(input)}`);
					console.log("output value validation:-".yellow, `${JSON.stringify(output)}`);
					console.log(`Values Not Equal for key: '${key}'`.bgRed);
					return that.status = false;
				}
			}else{
				if(input[key] == output[key]){
					// continue;
				}else if(!that.typeCheck(input[key], output[key]) || !that.isEqual(input[key], output[key])){
					if(that.flagErrObj){
						console.log("********** The above error(s) is in these inner Objects **********".bgBlue);
						console.log("input inner:-".yellow, `${key}:${JSON.stringify(input[key])}`);
						console.log("output inner:-".yellow, `${key}:${JSON.stringify(output[key])}`);
					}
					that.errorStack.push(key);
					return that.status = false;
				}
			}
		}
	}
	return that.status = true;
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

module.exports = tester;