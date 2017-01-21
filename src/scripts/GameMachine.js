// welcome text
// tutorial text (pull out first event)

var processIntent = function(intentId) {
    var event = GameData.currentEvent;
    var responseId = event.actions[intentId];
    var response = event.responses[responseId];
    var responsePrompt = response.prompt;
    var isSuccess = response.isSuccess;

    clearTimeout(GameData.timer);

    GameMachine.intentResponseCallback(isSuccess);
};

var setupState = function(response) {
    GameMachine.intentResponseCallback = function(intentId) {};

    // welcome to game
    response.tell("Welcome to GET EM BRUTEDON, a heartwarming tale of friendship and destroying cities");
    return GameConst.States.TUTORIAL;
};

var tutorialResponse = function(isSuccess) {
    if (isSuccess) {
        GameData.tutorialEvents.shift();
    }
    if (GameData.tutorialEvents.isEmpty()) {
        GameData.currentState = GameConst.States.FIGHT;
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
        var isSuccess = processIntent(NO_RESPONSE);
        tutorialResponse(isSuccess);
    }, 10*1000);
};

var GameMachine = {
    processIntent: processIntent,

    runloop: function (response) {
      var currentState = GameData.currentState;

      switch (GameData.currentState) {
          case GameConst.States.SETUP:
              GameData.currentState = setupState(response);
              break;
          case GameConst.States.TUTORIAL:
              GameData.currentState = tutorialState(response);
          default:;
      }
    }
}

module.exports = GameMachine;
