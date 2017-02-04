/**
 *  YOU GOT THIS BRUTADON
 *
 *  Made for Global Game Jam 2017 @ Facebook MPK
 */

var GameData = require('./GameData');
var GameConst = require('./GameConst');
var GameMachine = require('./GameMachine');

///////////////////////////////////////////////////////////////////////

GameMachine.addState(GameConst.States.SETUP, {
    onTransition: function() {
        if (GameData.repeatWelcome) return GameConst.Text.WELCOME_REPEAT;
        else return GameConst.Sounds.ROAR + GameConst.Text.WELCOME;
    },

    onIntent: function(intentId) {
        switch (intentId) {
        	// TODO: the 'reprompt' for this state is sometimes the wrong reprompt
        	// TODO: there is a crasher when the "options" intent doesn't understand you... 
        	// this happens when you say (in the options menu) "options" or "dog park" (or a similarly misunderstood phrase)
        	// the reprompt is also wrong
            //case GameConst.Intents.OPTIONS:
            //    return GameMachine.getResponseForNewState(GameConst.States.OPTIONS);
            case GameConst.Intents.START_TUTORIAL:
                return GameMachine.getResponseForNewState(GameConst.States.TUTORIAL);
            case GameConst.Intents.START_GAME:
                return GameMachine.getResponseForNewState(GameConst.States.FIGHT);
            default:
                GameData.repeatWelcome = true;
                return GameMachine.getResponseForNewState(GameConst.States.SETUP);
        }
    }
});

///////////////////////////////////////////////////////////////////////

GameMachine.addState(GameConst.States.OPTIONS, {
    onTransition: function() {
        var options = "Brutadon options. ";
        for (var key in GameConst.Options) {
            if (GameConst.Options.hasOwnProperty(key)) {
                var value = GameConst.Options[key];
                options += value + " is currently set to " + GameData[value] + ". ";
            }
        }
        options += GameConst.Text.OPTION_PROMPT;
        return options;
    },


	// TODO: there is a crasher when the "options" intent doesn't understand you... 
	// this happens when you say (in the options menu) "options" or "dog park" (or a similarly misunderstood phrase)
	// the reprompt is also wrong

    onIntent: function(intentId, slots) {
        switch (intentId) {
            case GameConst.Intents.START_TUTORIAL:
                return GameMachine.getResponseForNewState(GameConst.States.TUTORIAL);
            case GameConst.Intents.START_GAME:
                return GameMachine.getResponseForNewState(GameConst.States.FIGHT);
            case GameConst.Intents.CHANGE_OPTION:
                var optionName = slots.OptionName.value;
                var optionValue = slots.OptionValue.value;
                var changeSuccessText = "";
                if (optionName !== undefined && optionValue !== undefined) {
                    changeSuccessText = "Set " + optionName + " to " + optionValue + ". ";
                    GameData[optionName] = optionValue;
                }
                return changeSuccessText + GameMachine.getResponseForNewState(GameConst.States.OPTIONS);
            case GameConst.Intent.OPTIONS:
                return GameMachine.getResponseForNewState(GameConst.States.OPTIONS);
            default:
                return GameConst.Text.OPTION_PROMPT;
        }
    }
});

///////////////////////////////////////////////////////////////////////

GameMachine.addState(GameConst.States.TUTORIAL, {
    onTransition: function() {
        if (GameData.repeatTutorial) {
            return "";
        }
        var tutorialEvent = GameData.tutorialEvents[GameData.tutorialIndex];
        GameData.currentEvent = tutorialEvent;
        return GameConst.Sounds.ROAR + tutorialEvent.prompt;
    },

    onIntent: function(intentKey) {
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
    }
});

///////////////////////////////////////////////////////////////////////

GameMachine.addState(GameConst.States.FIGHT, {
    onTransition: function() {
        var fightEvent = GameData.fightEvents[GameData.fightIndex];
        GameData.currentEvent = fightEvent;
        GameData.fightIndex++;

        if(GameData.promptEveryTime) return GameConst.Sounds.ROAR + fightEvent.prompt + " " + GameConst.Text.PROMPT;
        else return GameConst.Sounds.ROAR + fightEvent.prompt;
    },

    onIntent: function(intentKey) {
        // TODO abstract this out
        var event = GameData.currentEvent;
        var responseNumKey = event[intentKey];
        var responsePrompt = "";
        var isSuccess = false;

        // if an entry is "1" it's a success. if it's not "1", it's a failure

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
        if (GameData.numFailures >= GameData[GameConst.Options.FAILURE_TOLERANCE] ||
            GameData.fightIndex >= GameData[GameConst.Options.EVENT_COUNT]) {
            newState = GameConst.States.ENDING;
        }

    	return soundFile + responsePrompt + " " + GameMachine.getResponseForNewState(newState);
    }
});

///////////////////////////////////////////////////////////////////////

GameMachine.addState(GameConst.States.ENDING, {
    onTransition: function() {
        //bad
        if (GameData.numFailures >= GameData[GameConst.Options.FAILURE_TOLERANCE])
            return GameConst.Sounds.ENDING + GameConst.Text.ENDING_BAD;
        //good
        else
            return GameConst.Sounds.ENDING + GameConst.Text.ENDING_GOOD;
    },
    onIntent: function(intentKey) {
        // nothing.
    }
});
