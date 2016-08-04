/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


 var simonDisplay = (function(){
 	var simonDisplayReturner = {};

 	

 	var sections = {
 		pathOne: {
 			gradient: "gradient1",
 			blockColor: "938B00"
 		},
 		pathTwo: {
 			gradient: "gradient2",
 			blockColor: "#934000"
 		},
 		pathThree: {
 			gradient: "gradient4",
 			blockColor: "#350663"
 		},
 		rectOne: {
 			gradient: "gradient3",
 			blockColor: "#005A53"
 		}
 	}

 	simonDisplayReturner.flashSegment = function(value, timeout){
 		var element = document.querySelector("#" + value);

 		lightUpSegment(element);
 		var lightOffSegmentTimer = setTimeout(
 			function(){
 				var el = element;
 				lightOffSegment(el);
 			}, timeout);
 	};

 	var lightUpSegment = function(value){
 		value.style.fill = "url(#" + sections[value.id]['gradient'] + ")";
 	};

 	var lightOffSegment = function(value){
 		value.style.fill = sections[value.id]['blockColor'];
 	}

 	simonDisplayReturner.incrementPathLength = function(){
 		var element = document.querySelector("#streak-text");
 		var newValue = parseInt(element.innerHTML) + 1;
 		element.innerHTML = (newValue < 10 ? "0" + newValue : newValue);
 	}

 	simonDisplayReturner.zeroPathLength = function(){
 		var element = document.querySelector("#streak-text");
 		element.innerHTML = "00";
 	}

 	simonDisplayReturner.setScreenValue = function(value){
 		var element = document.querySelector("#streak-text");
 		element.innerHTML = value;
 	}

 	simonDisplayReturner.strictLight = function(value){
 		var element = document.querySelector("#strict-light");
 		if(value){
 			element.style.fill = "red";
 		} else {
 			element.style.fill = "black";
 		}
 	}

 	return simonDisplayReturner;
 }())

