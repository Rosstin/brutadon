/**
 *  YOU GOT THIS BRUTADON
 *
 *  Made for Global Game Jam 2017 @ Facebook MPK
 */

var Alexa = require('alexa-sdk');

var gameStates = {
  SETUP: 0,
  LOADING: 1,
  TUTORIAL: 2,
  FIGHT: 3,
  ENDING: 4,
  FINISH: 5
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
  currentState = gameStates.SETUP,
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
       case gameStates.SETUP:
          setupState();
          break;
       case gameStates.LOADING:
          // still loading?
          break;
       case gameStates.TUTORIAL:
          tutorialState();
          break;
       case gameStates.FIGHT:
          fightState();
          break;
       case gameStates.ENDING:
       case gameStates.FINISH:
    }
};

var setupState = function () {
    gameData.currentState = gameStates.LOADING;

    d3.tsv("BRUTADON_EVENTS - Sheet1.tsv", function (data) {
        gameStates.fightEvents = [];

        d3.tsv("BRUTADON_EVENTS - Sheet1.tsv", function (data) {
            gameStates.tutorialEvents = [];

            gameData.currentState = gameStates.TUTORIAL;
            console.log("YOU GOT THIS BRUTADON");
        }
    });
}
