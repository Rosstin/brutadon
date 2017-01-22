/**
 *  YOU GOT THIS BRUTADON
 *
 *  Made for Global Game Jam 2017 @ Facebook MPK
 */
'use strict';

var GameConst = require('./GameConst');

var GameData = {
  // variable state
  repeatWelcome: false,
  currentState: GameConst.States.SETUP,
  numFailures: 0,

  // event cache; needs to be loaded
  tutorialEvents: require('./../tutorial').tutorial,
  fightEvents: require('./../events1').events1,

  // game customization
  failureTolerance: 1000
};

module.exports = GameData;
