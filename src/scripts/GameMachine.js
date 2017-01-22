// welcome text
// tutorial text (pull out first event)

var GameData = require('./GameData');
var GameConst = require('./GameConst');

var setupState = function() {
    var welcomeText = "";
    if (GameData.repeatWelcome) {
        welcomeText = "If this is your first time playing, You Got This Brutadon, shout, PUMP IT UP BRUTADON, to begin the tutorial." +
                      " If you would like to skip the tutorial, shout WRECK um BRUTADON.";
    } else {
        welcomeText = "Welcome to, You Got This Brutadon, a game where you must use your voice in the name of true friendship." +
                      " Make sure Alexa can hear you clearly, and make sure no one will be disturbed by your cacophonous shouting." +
                      " If this is your first time playing, You Got This Brutadon, shout, PUMP IT UP BRUTADON, to begin the tutorial." +
                      " If you would like to skip the tutorial, shout WRECK um BRUTADON.";
    }

    return welcomeText;
};

var setupIntentState = function(intentId) {
    switch (intentId) {
        case GameConst.Intents.PUMP:
            return GameMachine.getResponseForNewState(GameConst.States.TUTORIAL);
        case GameConst.Intents.WRECK:
            return GameMachine.getResponseForNewState(GameConst.States.FIGHT);
        default:
            GameData.repeatWelcome = true;
            return GameMachine.getResponseForNewState(GameConst.States.SETUP);
    }
};

var tutorialState = function() {
    // Start the heartbreaking story
    // iterate through the tutorial events
    var tutorialEvent = GameData.tutorialEvents[0];
    GameData.currentEvent = tutorialEvent;
    return tutorialEvent.prompt;
};

var tutorialIntentState = function(intentKey) {
    // TODO abstract this out
    var event = GameData.currentEvent;
    var responseNumKey = event[intentKey];
    var responsePrompt = "";
    var isSuccess = false;

    if (intentKey === GameConst.Intents.CANT_UNDERSTAND) {
        // don't even handle for now
    } else {
        // TODO validate this JSON blob
        if (responseNumKey) {
            return responseNumKey + "t";
            responsePrompt = event[responseNumKey + "t"];
            isSuccess = event[responseNumKey + "s"] === "1";
        }
    }

    if (isSuccess) {
        GameData.tutorialEvents.shift();
    }
    if (GameData.tutorialEvents.isEmpty()) {
        return responsePrompt + GameMachine.getResponseForNewState(GameConst.States.FIGHT);
    }
    return responsePrompt + GameMachine.getResponseForNewState(GameConst.States.TUTORIAL);
};

var GameMachine = {
    getResponseForIntent: function(intentKey) {
        switch (GameData.currentState) {
            case GameConst.States.SETUP:
                return setupIntentState(intentKey);
            case GameConst.States.TUTORIAL:
                return tutorialIntentState(intentKey);
            default:
                 // ideally shouldn't happen
                console.log("NO STATE");
                // exit the game or whatever
        }
    },

    getResponseForNewState: function (newState) {
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
        return "Cannot find state for " + newState + ".";
    }
};

module.exports = GameMachine;
