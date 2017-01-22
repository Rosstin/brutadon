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
    if (GameData.repeatTutorial) {
        return "";
    }
    var tutorialEvent = GameData.tutorialEvents[GameData.tutorialIndex];
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
        if (responseNumKey) {
            responsePrompt = event[responseNumKey + "t"];
            isSuccess = event[responseNumKey + "s"] === "1";
        }
    }

    if (isSuccess) {
        GameData.repeatTutorial = false;
        GameData.tutorialIndex++;
    } else {
        GameData.repeatTutorial = true;
    }
    if (GameData.tutorialIndex >= GameData.tutorialEvents.length) {
        return responsePrompt + " " + GameMachine.getResponseForNewState(GameConst.States.FIGHT);
    }
    return responsePrompt + " " + GameMachine.getResponseForNewState(GameConst.States.TUTORIAL);
};

var fightState = function() {
    var fightEvent = GameData.fightEvents[GameData.fightIndex];
    GameData.currentEvent = fightEvent;
    GameData.fightIndex++;
    return fightEvent.prompt;
};

var fightIntentState = function(intentKey) {
    // TODO abstract this out
    var event = GameData.currentEvent;
    var responseNumKey = event[intentKey];
    var responsePrompt = "";
    var isSuccess = false;

    if (intentKey === GameConst.Intents.CANT_UNDERSTAND) {
        // don't even handle for now
    } else {
        if (responseNumKey) {
            responsePrompt = event[responseNumKey + "t"];
            isSuccess = event[responseNumKey + "s"] === "1";
        }
    }

    if (!isSuccess) {
        GameData.numFailures++;
    }

    if (GameData.numFailures > GameData.failureTolerance) {
        return "OH NO DEAD.";
    }
    if (GameData.fightIndex >= GameData.fightEvents.length) {
        return "OH NO OUT OF FIGHT.";
    }

    return responsePrompt + " " + GameMachine.getResponseForNewState(GameConst.States.FIGHT);
};

var GameMachine = {
    getResponseForIntent: function(intentKey) {
        switch (GameData.currentState) {
            case GameConst.States.SETUP:
                return setupIntentState(intentKey);
            case GameConst.States.TUTORIAL:
                return tutorialIntentState(intentKey);
            case GameConst.States.FIGHT:
                return fightIntentState(intentKey);
            default:;
        }
    },

    getResponseForNewState: function (newState) {
        GameData.currentState = newState;

        switch (newState) {
            case GameConst.States.SETUP:
                return setupState();
            case GameConst.States.TUTORIAL:
                return tutorialState();
            case GameConst.States.FIGHT:
                return fightState();
            default:;
        }
        return "Cannot find state for " + newState + ".";
    }
};

module.exports = GameMachine;
