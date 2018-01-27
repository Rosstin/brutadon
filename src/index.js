/**
 *  THE HANDS OF AN ANGRY GOD
 *
 *  Made for Global Game Jam 2018 @ Facebook MPK
 */
'use strict';
var BrutadonGame = require('./scripts/BrutadonGame');

exports.handler = function (event, context) {
    var brutadonGame = new BrutadonGame();
    brutadonGame.execute(event, context);
};
