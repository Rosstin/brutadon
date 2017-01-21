/**
 *  YOU GOT THIS BRUTADON
 *
 *  Made for Global Game Jam 2017 @ Facebook MPK
 */
'use strict';

var GameConst = require('./GameConst');

var GameData = {
  // variable state
  currentState: GameConst.States.SETUP,
  numFailures: 0,

  eventTimer: NaN,

  // event cache; needs to be loaded
  tutorialEvents: [],
  fightEvents: [],

  // game customization
  failureTolerance: 1000
};

module.exports = GameData;