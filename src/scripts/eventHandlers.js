/**
 *  YOU GOT THIS BRUTADON
 *
 *  Made for Global Game Jam 2017 @ Facebook MPK
 */
'use strict';

var GameData = require('./GameData');
var GameConst = require('./GameConst');
var GameMachine = require('./GameMachine');

var registerEventHandlers = function (eventHandlers, skillContext) {
    eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
        GameData.reload();
    };

    eventHandlers.onLaunch = function (launchRequest, session, response) {
        GameData.reload();
        response.tell(GameMachine.getResponseForNewState(GameConst.States.SETUP));
    };

    eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
        response.tell('Goodbye');
    };
};
exports.register = registerEventHandlers;
