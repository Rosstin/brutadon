// welcome text
// tutorial text (pull out first event)

var GameData = require('./GameData');
var GameConst = require('./GameConst');


var processIntent = function(intentKey, response) {
    clearTimeout(GameData.timer);

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

            response.tell(responsePrompt);

            if (GameMachine.intentResponseCallback) {
                GameMachine.intentResponseCallback(isSuccess);
            }
        }
    }
};

var setupState = function(response) {
    GameMachine.intentResponseCallback = function(intentId) {};

    // welcome to game
    response.tell("HELLO HELLO HELLO");
    response.tell("Welcome to GET EM BRUTEDON, a heartwarming tale of friendship and destroying cities");
    response.tell("Thank you for playing");

    GameMachine.changeState(GameConst.States.TUTORIAL);
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

var tutorialState = function(response) {
    GameMachine.intentResponseCallback = tutorialResponse;
    // Start the heartbreaking story
    // iterate through the tutorial events

    var tutorialEvent = GameData.tutorialEvents[0];
    GameData.currentEvent = tutorialEvent;
    response.tell(tutorialEvent.prompt);

    // set up game state
    GameData.timer = setTimeout(function () {
        // simulate no-response intent
        processIntent(NO_RESPONSE);
    }, 10*1000);
};

var GameMachine = {
    processIntent: processIntent,

    changeState: function (newState, response) {
      GameData.currentState = newState;

      switch (newState) {
          case GameConst.States.SETUP:
              setupState(response);
              break;
          case GameConst.States.TUTORIAL:
              tutorialState(response);
          default:
               // ideally shouldn't happen
              console.log("NO STATE");
              // exit the game or whatever
      }
    }
};

module.exports = GameMachine;
