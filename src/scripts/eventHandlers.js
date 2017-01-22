/**
 *  YOU GOT THIS BRUTADON
 *
 *  Made for Global Game Jam 2017 @ Facebook MPK
 */
'use strict';

var GameConst = require('./GameConst');
var GameMachine = require('./GameMachine');

var registerEventHandlers = function (eventHandlers, skillContext) {
    eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    };

    eventHandlers.onLaunch = function (launchRequest, session, response) {
        response.tell(GameMachine.getResponseForNewState(GameConst.States.SETUP));
    };

    eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
        response.tell('Goodbye');
    };
};
exports.register = registerEventHandlers;
