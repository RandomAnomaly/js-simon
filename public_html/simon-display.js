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
 			blockColor: "green"
 		},
 		pathTwo: {
 			gradient: "gradient2",
 			blockColor: "blue"
 		},
 		pathThree: {
 			gradient: "gradient4",
 			blockColor: "yellow"
 		},
 		rectOne: {
 			gradient: "gradient3",
 			blockColor: "red"
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
 		var element = document.querySelector("#control-group text");
 		var newValue = parseInt(element.innerHTML) + 1;
 		element.innerHTML = newValue;
 	}

 	return simonDisplayReturner;
 }())

