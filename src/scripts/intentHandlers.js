/**
 *  YOU GOT THIS BRUTADON
 *
 *  Made for Global Game Jam 2017 @ Facebook MPK
 */
'use strict';

var GameConst = require('./GameConst');
var GameMachine = require('./GameMachine');

var registerIntentHandlers = function (intentHandlers, skillContext) {
    intentHandlers.WreckEmIntent = function (intent, session, response) {
        var intentId = GameConst.Intents.WRECK;
        response.tell('YEAH WRECK EM GOOD');
        GameMachine.processIntent(response);

    };

    intentHandlers.PumpItUpIntent = function (intent, session, response) {
        var intentId = GameConst.Intents.PUMP;
        response.tell('SUNS OUT GUNS OUT');
    };

    intentHandlers.YouGotThisIntent = function (intent, session, response) {
        var intentId = GameConst.Intents.GOT_THIS;
        response.tell('I BELIEVE IN YOU');
    };

    intentHandlers.HoldBackIntent = function (intent, session, response) {
        var intentId = GameConst.Intents.HOLD_BACK;
        response.tell('NOOOOO');
    };

    intentHandlers.NoInPutIntent = function (intent, session, response) {
        var intentId = GameConst.Intents.NO_RESPONSE;
        response.tell('YOUR SILENCE IS HEARTBREAKING');
    };

    intentHandlers.UnrecognizedIntent = function (intent, session, response) {
        var intentId = GameConst.Intents.CANT_UNDERSTAND;
        response.tell('WHAT?');
    };
};
exports.register = registerIntentHandlers;
