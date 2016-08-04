/**
 * Author: Jack Gammon
 * Description: Simon game's logic. processes the gameplay / user clicks, and drives the display javascript
 */


var gameLogic = function () {
    var gameLogicReturner = {};

    var waitingForPlayer = true;
    var gameInProgress = false;

    var sequence = [];

    var sequenceTemp = [];

    var timeout = 500;

    var isStrictMode = false;

    var segmentMappings = {
        1: "pathOne",
        2: "pathTwo",
        3: "rectOne",
        4: "pathThree"
    };

    var segSoundOne = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
    var segSoundTwo = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
    var segSoundThree = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
    var segSoundFour = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

    var soundMappings = {
        pathOne: function () {
            segSoundOne.play();
        },
        pathTwo: function () {
            segSoundTwo.play();
        },
        pathThree: function () {
            segSoundThree.play();
        },
        rectOne: function () {
            segSoundFour.play();
        }
    }

    var generateRandomSegment = function () {
        return segmentMappings[randomNumber(1, 4)]
    };

    var randomNumber = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var addNewMove = function () {
        var segmentToAdd = generateRandomSegment();

        while (segmentToAdd === sequence[sequence.length - 1]) {
            segmentToAdd = generateRandomSegment();
        }

        sequence.push(segmentToAdd);
        simonDisplay.incrementPathLength();
    };

    var showQueue = function () {
        waitingForPlayer = false;
        console.log("Queue is: " + sequence);
        for (var i = 0; i < sequence.length; i += 1) {
            doShowQueue(i);
        }
        var totalQueueTime = sequence.length * timeout;

        doEnablePlayerInput(totalQueueTime);

        sequenceTemp = sequence.slice();
    };

    var doEnablePlayerInput = function (value) {
        setTimeout(function () {
            waitingForPlayer = true;
        }, value);
    }

    var doShowQueue = function (i) {
        var delay = timeout * i;
        var segment = sequence[i];
        setTimeout(function () {
            var s = segment;
            flashSegment(s);
        }, delay);
    }

    var flashSegment = function (segment) {
        //play the segment's sound
        soundMappings[segment]();
        simonDisplay.flashSegment(segment, timeout);
    }

    gameLogicReturner.toggleStrictMode = function () {
        if (waitingForPlayer) {
            simonDisplay.strictLight(!isStrictMode);
            isStrictMode = !isStrictMode;
            reset();
        }
    }

    gameLogicReturner.restart = function () {
        if (waitingForPlayer) {
            reset();
            gameInProgress = true;
            addNewMove();
            showQueue();
        }
    }

    var reset = function () {
        sequence = [];
        sequenceTemp = [];
        simonDisplay.zeroPathLength();
        gameInProgress = false;
    }

    gameLogicReturner.makeMove = function (button) {
        if (waitingForPlayer) {
            if (!gameInProgress) {
                flashSegment(button);
            } else {
                if (waitingForPlayer) {
                    flashSegment(button);
                    var nextValidMove = sequence.shift();
                    if (button !== nextValidMove) {
                        if (isStrictMode) {
                            failure();
                        } else {
                            //non-strict
                            // restart with the current sequence
                            sequence = sequenceTemp.slice();
                            // sleep for a bit
                            showQueueWithDelay();
                        }
                    } else if (sequence.length === 0) {
                        if (sequenceTemp.length !== 20) {
                            // we've finished this round
                            sequence = sequenceTemp.slice();
                            sequenceTemp = [];
                            addNewMove();
                            showQueueWithDelay();
                        } else {
                            // player victory
                            victory();

                        }
                    }
                }
            }
        }
    }
    var showQueueWithDelay = function () {
        setTimeout(function () {
            showQueue();
        }, timeout);
    }

    var victory = function () {
        dance();
    };

    var failure = function () {
        flashAll();
        setTimeout(function () {
            reset();
        }, 1000);
    }

    var dance = function () {
        flashAll();
        waitingForPlayer = false;
        simonDisplay.setScreenValue("--");
        setTimeout(function () {
            simonDisplay.setScreenValue("\\\\");
            flashAll();
            setTimeout(function () {
                simonDisplay.setScreenValue("//");
                flashAll();
                setTimeout(function () {
                    simonDisplay.setScreenValue("--");
                    flashAll();
                }, timeout)
            }, timeout)
        }, timeout)

        doEnablePlayerInput(1500);
    }

    var flashAll = function () {
        flashSegment("pathOne");
        flashSegment("pathTwo");
        flashSegment("pathThree");
        flashSegment("rectOne");
    }

    return gameLogicReturner;
}();
