/**
 *  YOU GOT THIS BRUTADON
 *
 *  Made for Global Game Jam 2017 @ Facebook MPK
 */

var Alexa = require('alexa-sdk');

var gameStates = {
  TUTORIAL: 0,
  FIGHT: 1,
  ENDING: 2,
  FINISH: 3
};

var gameIntents = {
  WRECK: 0,
  PUMP: 1,
  GOT_THIS: 2,
  HOLD_BACK: 3,
  NO_RESPONSE: 4,
  CANT_UNDERSTAND: 5
};

var gameData = {
  // variable state
  currentState = gameStates.TUTORIAL,
  numFailures = 0,

  // event cache
  tutorialEvents = [],
  fightEvents = [],

  // game customization
  failureTolerance = 1000
};

var runEvent = function (event) {
  // play event.prompt
  // wait for 10 seconds
  // detect intent somehow -- a handler?
  // convert intent to int
  var intentId = gameIntents.WRECK;

  var responseId = event.actions[intentId];
  var response = event.responses[responseId];
  var responsePrompt = response.prompt;
  var isSuccess = response.isSuccess;

  // play response.prompt
  return response.isSuccess;
}

var tutorialState = function () {
    var event = gameData.tutorialEvents[0];
    var isSuccess = runEvent(event);

    if (isSuccess) {
        // The player can only continue when they succeed at the tutorial event.
        gameData.tutorialEvents.shift();
    }

    if (gameData.tutorialEvents.length === 0) {
        gameData.currentState = gameStates.FIGHT;
    }
};

var fightState = function () {
    var event = gameData.tutorialEvents[0];
    var isSuccess = runEvent(event);

    if (isSuccess) {
        // The player can only continue when they succeed at the tutorial event.
        gameData.tutorialEvents.shift();
    }

    if (gameData.tutorialEvents.length === 0) {
        gameData.currentState = gameStates.FIGHT;
    }
};

var runloop = function () {
    switch(gameData.currentState) {
       case gameStates.TUTORIAL:
          tutorialState();
          break;
       case gameStates.FIGHT:
          fightState();
          break;
       case gameStates.ENDING:
       case gameStates.FINISH:
           return;
    }
};

var main = function () {
    var loadedFightEventsCallback = function (fightData) {
        gameStates.fightEvents = [];
    }
    var loadedTutorialEventsCallback = function (tutorialData) {
        gameStates.tutorialEvents = [];
    }

    loadTutorials(function (tutorialData) {

    })
    runloop();

    console.log("Thanks for playing YOU GOT THIS BRUTADON");
}
