/**
 *  YOU GOT THIS BRUTADON
 *
 *  Made for Global Game Jam 2017 @ Facebook MPK
 */
'use strict';

var GameConst = require('./GameConst');
var GameData = require('./GameData');
var GameMachine = require('./GameMachine');

var triggerAlexaResponse = function(intentId, response, slots) {
    var speechResponse = GameMachine.getResponseForIntent(intentId, slots);
    var shouldEndSession = GameData.currentState == GameConst.States.ENDING;

    speechResponse = {
        type: 'SSML',
        speech: "<speak>" + speechResponse + "</speak>"
    };

    if(GameData.repromptIfNoResponse){
	    response.tellWithReprompt(speechResponse, GameConst.Text.PROMPT, shouldEndSession);
	}
	else{
	    response.tell(speechResponse, shouldEndSession);
	}
}

var registerIntentHandlers = function (intentHandlers, skillContext) {
    intentHandlers.StartGameIntent = function (intent, session, response) {
        triggerAlexaResponse(GameConst.Intents.START_GAME, response);
    };

    intentHandlers.StartTutorialIntent = function (intent, session, response) {
        triggerAlexaResponse(GameConst.Intents.START_TUTORIAL, response);
    };

    intentHandlers.OptionsIntent = function (intent, session, response) {
        triggerAlexaResponse(GameConst.Intents.OPTIONS, response);
    };

    intentHandlers.ChangeOptionsIntent = function (intent, session, response) {
        triggerAlexaResponse(GameConst.Intents.CHANGE_OPTION, response, intent.slots);
    };

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

    //intentHandlers.NoInputIntent = function (intent, session, response) {
    //    triggerAlexaResponse(GameConst.Intents.NO_RESPONSE, response);
    //};

    intentHandlers.UnrecognizedIntent = function (intent, session, response) {
        triggerAlexaResponse(GameConst.Intents.CANT_UNDERSTAND, response);
    };

    intentHandlers['AMAZON.StopIntent'] = function (intent, session, response) {
        response.tell(GameConst.Text.GOODBYE, true);
    };

    intentHandlers['AMAZON.CancelIntent'] = function (intent, session, response) {
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
