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

        var speechResponse = GameMachine.getResponseForNewState(GameConst.States.SETUP);
        speechResponse = {
            type: 'SSML',
            speech: "<speak>" + speechResponse + "</speak>"
        };

        response.tell(speechResponse, false);
    };

    eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
        // nothing.
    };
};
exports.register = registerEventHandlers;
