/**
 *  YOU GOT THIS BRUTADON
 *
 *  Made for Global Game Jam 2017 @ Facebook MPK
 */
'use strict';

var GameConst = require('./GameConst');
var GameData = require('./GameData');
var GameMachine = require('./GameMachine');

var triggerAlexaResponse = function(intentId, response) {
    var speechResponse = GameMachine.getResponseForIntent(intentId);
    var shouldEndSession = GameData.currentState == GameConst.States.ENDING;

    speechResponse = {
        type: 'SSML',
        speech: "<speak>" + speechResponse + "</speak>"
    };

    response.tell(speechResponse, shouldEndSession);
}

var registerIntentHandlers = function (intentHandlers, skillContext) {
    intentHandlers.WreckEmIntent = function (intent, session, response) {
        triggerAlexaResponse(GameConst.Intents.WRECK, response);
    };

    intentHandlers.PumpItUpIntent = function (intent, session, response) {
        triggerAlexaResponse(GameConst.Intents.PUMP, response);
    };

    intentHandlers.YouGotThisIntent = function (intent, session, response) {
        triggerAlexaResponse(GameConst.Intents.GOT_THIS, response);
    };

    intentHandlers.HoldBackIntent = function (intent, session, response) {
        triggerAlexaResponse(GameConst.Intents.HOLD_BACK, response);
    };

    intentHandlers.NoInPutIntent = function (intent, session, response) {
        triggerAlexaResponse(GameConst.Intents.NO_RESPONSE, response);
    };

    intentHandlers.UnrecognizedIntent = function (intent, session, response) {
        triggerAlexaResponse(GameConst.Intents.CANT_UNDERSTAND, response);
    };

    intentHandlers['AMAZON.StopIntent'] = function (intent, session, response) {
        response.tell(GameConst.Text.GOODBYE, true);
    };

    intentHandlers['AMAZON.StartOverIntent'] = function (intent, session, response) {
        GameData.reload();

        var speechResponse = GameMachine.getResponseForNewState(GameConst.States.SETUP);
        speechResponse = {
            type: 'SSML',
            speech: "<speak>" + speechResponse + "</speak>"
        };

        response.tell(speechResponse, false);
    };
};
exports.register = registerIntentHandlers;
