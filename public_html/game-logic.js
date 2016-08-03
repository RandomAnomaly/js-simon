/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var gameLogic = function(){
	var gameLogicReturner = {};

	var sequence = [];
	var timeout = 500;

	var segmentMappings = {
		1: "pathOne",
		2: "pathTwo",
		3: "rectOne",
		4: "pathThree"
	};

	var generateRandomSegment = function(){
		return segmentMappings[randomNumber(1,4)]
	};

	var randomNumber = function(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	var addNewMove = function(){
		sequence.push(generateRandomSegment());
	};

	gameLogicReturner.play = function(){
		addNewMove();
		simonDisplay.flashSegment(sequence[0], timeout);
	}



	return gameLogicReturner;
}();