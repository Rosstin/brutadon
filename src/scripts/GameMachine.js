// welcome text
// tutorial text (pull out first event)

var GameData = require('./GameData');
var GameConst = require('./GameConst');


var setupState = function() {
    if (GameData.repeatWelcome) return GameConst.Text.WELCOME_REPEAT;
    else return GameConst.Sounds.ROAR + GameConst.Text.WELCOME;
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

    if (responseNumKey) {
        responsePrompt = event["t" + responseNumKey];
        isSuccess = event["s" + responseNumKey] == "1";
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

    if(GameData.promptEveryTime) return GameConst.Sounds.brutadonRoar + fightEvent.prompt + " " + GameConst.Text.PROMPT;
    else return GameConst.Sounds.ROAR + fightEvent.prompt;
};

var fightIntentState = function(intentKey) {
    // TODO abstract this out
    var event = GameData.currentEvent;
    var responseNumKey = event[intentKey];
    var responsePrompt = "";
    var isSuccess = false;

    if (responseNumKey) {
        responsePrompt = event["t" + responseNumKey];
        isSuccess = event["s" + responseNumKey] == "1";
    }

    if (intentKey == GameConst.Intents.CANT_UNDERSTAND) {
        responsePrompt += " " + GameConst.Text.PROMPT;
    }

    // Success or failure?
    var soundFile = GameConst.Sounds.SUCCESS;
    if (!isSuccess) {
        GameData.numFailures++;
        soundFile = GameConst.Sounds.FAIL;
    }

    var newState = GameConst.States.FIGHT;
    if (GameData.numFailures >= GameData.failureTolerance ||
        GameData.fightIndex >= GameData.fightTolerance) {
        newState = GameConst.States.ENDING;
    }

    if(newState == GameConst.States.FIGHT && GameData.promptEveryTime){
        return soundFile + responsePrompt + " " + GameMachine.getResponseForNewState(newState) + GameConst.Text.PROMPT;
    } else return soundFile + responsePrompt + " " + GameMachine.getResponseForNewState(newState);

};

var endingState = function() {
    //bad
    if (GameData.numFailures >= GameData.failureTolerance) return GameConst.Sounds.ENDING + GameConst.Text.ENDING_BAD;
    //good
    else return GameConst.Sounds.ENDING + GameConst.Text.ENDING_GOOD;
}

var endIntentState = function(intentKey) {
    // nothing.
}

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
            case GameConst.States.ENDING:
                return endingState();
            default:;
        }
        return "Cannot find state for " + newState + ".";
    }
};

module.exports = GameMachine;
