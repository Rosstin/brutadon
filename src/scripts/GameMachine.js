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
    //return "<break time=\"750ms\"/> " + fightEvent.prompt;
    return " <audio src='https://s3.amazonaws.com/brutadonsounds/output.mp3'/> " + fightEvent.prompt;
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

    var soundFile = "<audio src='https://s3.amazonaws.com/brutadonsounds/goodchoice.mp3'/> "
    if (!isSuccess) {
        GameData.numFailures++;
        soundFile = "<audio src='https://s3.amazonaws.com/brutadonsounds/failbrutadon.mp3'/> ";
    }

    var newState = GameConst.States.FIGHT;
    if (GameData.numFailures >= GameData.failureTolerance ||
        GameData.fightIndex >= GameData.fightTolerance) {
        newState = GameConst.States.ENDING;
    }

    return soundFile + responsePrompt + " " + GameMachine.getResponseForNewState(newState);
};

var endingState = function() {
    var responsePrompt = "But as the battle wears on, you can see that Brutadon is getting more and more weary. His seven shoulders sag. His emotion-sac is dull grey. Each of his punches is weaker than the last. Gromyulox has simply outlasted him. In the end, there is nothing you can do but watch as Gromyulox fires his parasitic, egg, missles, into Brutadon's wounded side, where they will fester and grow into baby Gromyuloxes, each more terrifying than the last. You weep bitter tears as Gromyulox shoves your friend's mangled corpse out to sea, headed for the deep-sea kaijew breeding grounds. But in the end, you shared something special with Brutadon. You will always remember his craggy smile, his giant biceps, and the pure honesty of his perfect soul. In the days to come, the city will hold a state funeral for Brutadon, their most perfect son. God bless you, Brutadon. You were the best of us.";
    if (GameData.numFailures < GameData.failureTolerance) {
        responsePrompt = "Suddenly, there's an opening. Gromyulox staggers with exhaustion, revealing his weak spot: the fleshy, neon orange brain sac hidden in his secret armpit. Brutadon stabs it, and Gromyulox's blood sprays everywhere. Gromyulox roars with the sound of one million volcanoes erupting in the same place at the same time. his massive body topples into the river, where his radioactive heart fires are extinguished in a cloud of hissing steam, and his whole body melts into a toxic soup. This district of the city will be uninhabitable for the next ten thousand years. Brutadon weakly high fives you, a thin smile on his craggy face. You know that Brutadon has finally attained inner peace. He has conquered not only Gromyulox, but also his own doubts. As you walk off into the sunset together, you know that even more important than saving the city and the lives of its one million citizens, was the friendship that you shared. Thank you, Brutadon. You are a true friend.";
    }
    return responsePrompt;
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
