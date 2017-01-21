/**
 *  YOU GOT THIS BRUTADON
 *
 *  Made for Global Game Jam 2017 @ Facebook MPK
 */
'use strict';
var AlexaSkill = require('./AlexaSkill'),
    eventHandlers = require('./eventHandlers'),
    intentHandlers = require('./intentHandlers');

var APP_ID = undefined;//replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var skillContext = {};

/**
 * BrutadonGame is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var BrutadonGame = function () {
    AlexaSkill.call(this, APP_ID);
    skillContext.needMoreHelp = true;
};

// Extend AlexaSkill
BrutadonGame.prototype = Object.create(AlexaSkill.prototype);
BrutadonGame.prototype.constructor = BrutadonGame;

eventHandlers.register(BrutadonGame.prototype.eventHandlers, skillContext);
intentHandlers.register(BrutadonGame.prototype.intentHandlers, skillContext);

module.exports = BrutadonGame;
