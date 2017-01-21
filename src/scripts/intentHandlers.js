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
        GameMachine.processIntent(intentId, response);
    };

    intentHandlers.PumpItUpIntent = function (intent, session, response) {
        var intentId = GameConst.Intents.PUMP;
        GameMachine.processIntent(intentId, response);
    };

    intentHandlers.YouGotThisIntent = function (intent, session, response) {
        var intentId = GameConst.Intents.GOT_THIS;
        GameMachine.processIntent(intentId, response);
    };

    intentHandlers.HoldBackIntent = function (intent, session, response) {
        var intentId = GameConst.Intents.HOLD_BACK;
        GameMachine.processIntent(intentId, response);
    };

    intentHandlers.NoInPutIntent = function (intent, session, response) {
        var intentId = GameConst.Intents.NO_RESPONSE;
        GameMachine.processIntent(intentId, response);
    };

    intentHandlers.UnrecognizedIntent = function (intent, session, response) {
        var intentId = GameConst.Intents.CANT_UNDERSTAND;
        GameMachine.processIntent(intentId, response);
    };
};
exports.register = registerIntentHandlers;
