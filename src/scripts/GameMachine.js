var runEvent = function (event) {
  // play event.prompt
  // wait for 10 seconds
  // detect intent somehow -- a handler?
  // convert intent to int
  var intentId = gameIntents.WRECK;

  var responseId = event.actions[intentId];
  var response = event.responses[responseId];
  var responsePrompt = response.prompt;
  var isSuccess = response.isSuccess;

  // play response.prompt
  return response.isSuccess;
}

var tutorialState = function () {
    var event = gameData.tutorialEvents[0];
    var isSuccess = runEvent(event);

    if (isSuccess) {
        // The player can only continue when they succeed at the tutorial event.
        gameData.tutorialEvents.shift();
    }

    if (gameData.tutorialEvents.length === 0) {
        gameData.currentState = gameStates.FIGHT;
    }
};

/*var fightState = function () {
    // TODO: Randomize the fight events later!!!!!!!!
    GameData.currentEvent = GameData.fightEvents[0];

    setTimeout(function() {
        // Oops, the player didn't respond :(
    }, 10*1000);

    /// wait for response

    var isSuccess = runEvent(event);

    if (isSuccess) {
        // The player can only continue when they succeed at the tutorial event.
        gameData.tutorialEvents.shift();
    }

    if (gameData.tutorialEvents.length === 0) {
        gameData.currentState = gameStates.FIGHT;
    }
};*/

var processIntent = function(intent /* WRECK IT, PUMP IT UP */) {
    var currentEvent = GameData.currentEvent; // comes from somewhere
    var isSuccess = runEvent(event);

    // play event.prompt
    // wait for 10 seconds
    // detect intent somehow -- a handler?
    // convert intent to int

    var responseId = event.actions[intentId];
    var response = event.responses[responseId];
    var responsePrompt = response.prompt;
    var isSuccess = response.isSuccess;

    if (isSuccess) {
        // The player can only continue when they succeed at the tutorial event.
        gameData.tutorialEvents.shift();
    }

    if (gameData.tutorialEvents.length === 0) {
        gameData.currentState = gameStates.FIGHT;
    }
}

var runloop = function (blob) {
    switch(gameData.currentState) {
       case gameStates.SETUP:
          setupState(blob);
          break;
       case gameStates.LOADING:
          // still loading?
          break;
       case gameStates.TUTORIAL:
          tutorialState(blob);
          break;
       case gameStates.FIGHT:
          fightState(blob);
          break;
       case gameStates.ENDING:
       case gameStates.FINISH:
    }
};

var setupState = function () {
    gameData.currentState = gameStates.LOADING;

    d3.tsv("BRUTADON_EVENTS - Sheet1.tsv", function (data) {
        gameStates.fightEvents = [];

        d3.tsv("BRUTADON_EVENTS - Sheet1.tsv", function (data) {
            gameStates.tutorialEvents = [];

            gameData.currentState = gameStates.TUTORIAL;
            console.log("YOU GOT THIS BRUTADON");
        });
    });
}

var processIntent = function(response) {

}
