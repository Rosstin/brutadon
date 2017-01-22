// welcome text
// tutorial text (pull out first event)

var GameData = require('./GameData');
var GameConst = require('./GameConst');

var setupState = function() {
    GameMachine.intentResponseCallback = function(intentId) {};

    // welcome to game
    var welcomeString = "HELLO HELLO HELLO";
    welcomeString += "Welcome to GET EM BRUTEDON, a heartwarming tale of friendship and destroying cities";
    welcomeString += "Thank you for playing";

    return welcomeString + GameMachine.changeState(GameConst.States.TUTORIAL);
};

var tutorialResponse = function(isSuccess) {
    if (isSuccess) {
        GameData.tutorialEvents.shift();
        GameMachine.changeState(GameConst.States.TUTORIAL);
    }
    if (GameData.tutorialEvents.isEmpty()) {
        GameMachine.changeState(GameConst.States.FIGHT);
    }
};

var tutorialState = function() {
    GameMachine.intentResponseCallback = tutorialResponse;
    // Start the heartbreaking story
    // iterate through the tutorial events

    var tutorialEvent = GameData.tutorialEvents[0];
    GameData.currentEvent = tutorialEvent;

    return tutorialEvent.prompt;

    // set up game state
    /*GameData.timer = setTimeout(function () {
        // simulate no-response intent
        processIntent(NO_RESPONSE);
    }, 10*1000);*/
};

var GameMachine = {
    //getResponseForIntent
    processIntent: function(intentKey) {
        //clearTimeout(GameData.timer);

        var event = GameData.currentEvent;
        var responseNumKey = event[intentKey];

        var responsePrompt = "";
        var isSuccess = false;

        if (intentKey === GameConst.Intents.CANT_UNDERSTAND) {
            // don't even handle for now
        } else {
            // TODO validate this JSON blob
            if (responseNumKey) {
                responsePrompt = event[responseNumKey + "t"];
                isSuccess = event[responseNumKey + "s"] === "1";
            }
        }

        return responsePrompt + GameMachine.intentResponseCallback(isSuccess);
    },

    //getResponseForNewState
    changeState: function (newState) {
      GameData.currentState = newState;

      switch (newState) {
          case GameConst.States.SETUP:
              return setupState();
          case GameConst.States.TUTORIAL:
              return tutorialState();
          default:
               // ideally shouldn't happen
              console.log("NO STATE");
              // exit the game or whatever
      }
      return "derpderp";
    }
};

module.exports = GameMachine;
