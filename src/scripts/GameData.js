/**
 *  YOU GOT THIS BRUTADON
 *
 *  Made for Global Game Jam 2017 @ Facebook MPK
 */
'use strict';

var GameConst = require('./GameConst');

var GameData = {
  reload: function () {
      this.repeatWelcome = false;
      this.repeatTutorial = false;
      this.currentState = GameConst.States.SETUP;

      this.numFailures = 0;

      this.tutorialEvents = require('./../tutorial').tutorial;
      this.tutorialIndex = 0;

      // randomize the fight events.
      var fightEvents = require('./../events1').events1;
      for (var i = fightEvents.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = fightEvents[i];
          fightEvents[i] = fightEvents[j];
          fightEvents[j] = temp;
      }
      this.fightEvents = fightEvents;
      this.fightIndex = 0;

      this.failureTolerance = 5;
      this.fightTolerance = 10;

      this.promptEveryTime = false;
      this.repromptIfNoResponse = true;

  }
};

module.exports = GameData;
