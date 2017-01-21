/**
 *  YOU GOT THIS BRUTADON
 *
 *  Made for Global Game Jam 2017 @ Facebook MPK
 */
'use strict';
var BrutadonGame = require('./scripts/BrutadonGame');

var events1 = require('./events1').events1;

exports.handler = function (event, context) {
    var brutadonGame = new BrutadonGame();
    brutadonGame.execute(event, context);
};
