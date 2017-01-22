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
        //if user said a one shot command that triggered an intent event,
        //it will start a new session, and then we should avoid speaking too many words.
        //skillContext.needMoreHelp = false;
    };

    eventHandlers.onLaunch = function (launchRequest, session, response) {
        //Speak welcome message and ask user questions
        //based on whether there are players or not.
        response.tell(GameMachine.changeState(GameConst.States.SETUP));
    };

    eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
        //Speak welcome message and ask user questions
        //based on whether there are players or not.
        //console.log(GameData.currentState);
        response.tell('Goodbye');
    };
};
exports.register = registerEventHandlers;
