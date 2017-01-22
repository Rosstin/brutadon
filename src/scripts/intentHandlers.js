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

        response.tell(GameMachine.processIntent(intentId));
    };

    intentHandlers.PumpItUpIntent = function (intent, session, response) {
        var intentId = GameConst.Intents.PUMP;
        response.tell(GameMachine.processIntent(intentId));
    };

    intentHandlers.YouGotThisIntent = function (intent, session, response) {
        var intentId = GameConst.Intents.GOT_THIS;
        response.tell(GameMachine.processIntent(intentId));
    };

    intentHandlers.HoldBackIntent = function (intent, session, response) {
        var intentId = GameConst.Intents.HOLD_BACK;
        response.tell(GameMachine.processIntent(intentId));
    };

    intentHandlers.NoInPutIntent = function (intent, session, response) {
        var intentId = GameConst.Intents.NO_RESPONSE;
        response.tell(GameMachine.processIntent(intentId));
    };

    intentHandlers.UnrecognizedIntent = function (intent, session, response) {
        var intentId = GameConst.Intents.CANT_UNDERSTAND;
        response.tell(GameMachine.processIntent(intentId));
    };
};
exports.register = registerIntentHandlers;
