/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
 * The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well as
 * testing instructions are located at http://amzn.to/1LzFrj6
 *
 * For additional samples, visit the Alexa Skills Kit Getting Started guide at
 * http://amzn.to/1LGWsLG
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

  // game customization
  failureTolerance = 1000
};

var tutorialState = function () {
    // get tutorial event from array
    var isSuccess = runEvent(event);

    if (isSuccess) {
        //pop event
    } else {
        //repeat current event...somehow
    }

    // if no tutorial events left
    gameData.currentState = gameStates.FIGHT;
};

var fightState = function () {
    // get tutorial event from array
    var isSuccess = runEvent(event);

    if (isSuccess) {
        //pop event
    } else {
        //repeat current event...somehow
    }

    // if no tutorial events left
    gameData.currentState = gameStates.FIGHT;
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
