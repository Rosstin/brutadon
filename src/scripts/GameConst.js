/**
 *  YOU GOT THIS BRUTADON
 *
 *  Made for Global Game Jam 2017 @ Facebook MPK
 */
'use strict';

var GameConst = {
    States: {
      SETUP: 'SETUP',
      OPTIONS: 'OPTIONS',
      TUTORIAL: 'TUTORIAL',
      FIGHT: 'FIGHT',
      ENDING: 'ENDING',
      FINISH: 'FINISH'
    },

    // Keep these textual values constant!  They're used to properly access
    // event response data in events1.js
    Intents: {
      WRECK: 'wreck',
      PUMP: 'pump',
      GOT_THIS: 'got',
      HOLD_BACK: 'hold',
      //NO_RESPONSE: 'none',
      CANT_UNDERSTAND: 'huh',
      OPTIONS: 'OptionsIntent',
      CHANGE_OPTION: 'ChangeOptionsIntent',
      START_GAME: 'StartGameIntent',
      START_TUTORIAL: 'StartTutorialIntent',
    },

    // The textual values should be kept in-sync with LIST_OF_OPTION_NAMES
    Options: {
      EVENT_COUNT: 'event count',
      FAILURE_TOLERANCE: 'failure tolerance'
    },

    Text: {
      GOODBYE: 'Brutadon, with tears in his eyes, waves goodbye',
      PROMPT: 'Say wreck em, pump it up, you got this, or hold back.',
      WELCOME: "Welcome to, You Got This Brutadon, a game where you must use your voice in the name of true friendship." +
      " Shout START TUTORIAL to begin the tutorial. " +
      " Shout START GAME to skip the tutorial. " +
      " Shout OPTIONS to configure the game. ",
      WELCOME_REPEAT: "If this is your first time playing, You Got This Brutadon, shout, START TUTORIAL, to begin the tutorial." +
      " If you would like to skip the tutorial, shout START GAME." +
      " If you want to configure the game, should OPTIONS.",
      OPTION_PROMPT: "Change an option by saying 'CHANGE OPTION NAME TO VALUE'." +
      " When done, say 'START TUTORIAL' or 'START GAME'.",
      ENDING_BAD: "But as the battle wears on, you can see that Brutadon is getting more and more weary. His seven shoulders sag. His " +
      "emotion-sac is dull grey. Each of his punches is weaker than the last. Gromyulox has simply outlasted him. In the end, there is" +
      " nothing you can do but watch as Gromyulox fires his parasitic, egg, missles, into Brutadon's wounded side, where they will" +
      " fester and grow into baby Gromyuloxes, each more terrifying than the last. You weep bitter tears as Gromyulox shoves your " +
      "friend's mangled corpse out to sea, headed for the deep-sea kaijew breeding grounds. But in the end, you shared something special" +
      " with Brutadon. You will always remember his craggy smile, his giant biceps, and the pure honesty of his perfect soul. In the days" +
      " to come, the city will hold a state funeral for Brutadon, their most perfect son. God bless you, Brutadon. You were the best of us.",
      ENDING_GOOD: "Suddenly, there's an opening. Gromyulox staggers with exhaustion, revealing his weak spot: the fleshy, neon orange" +
      " brain sac hidden in his secret armpit. Brutadon stabs it, and Gromyulox's blood sprays everywhere. Gromyulox roars with the sound" +
      " of one million volcanoes erupting in the same place at the same time. his massive body topples into the river, where his" +
      " radioactive heart fires are extinguished in a cloud of hissing steam, and his whole body melts into a toxic soup. This district of" +
      " the city will be uninhabitable for the next ten thousand years. Brutadon weakly high fives you, a thin smile on his craggy face." +
      " You know that Brutadon has finally attained inner peace. He has conquered not only Gromyulox, but also his own doubts. As you walk" +
      " off into the sunset together, you know that even more important than saving the city and the lives of its one million citizens," +
      " was the friendship that you shared. Thank you, Brutadon. You are a true friend.",
    },

    Sounds: {
      ROAR: "<audio src='https://s3.amazonaws.com/brutadonsounds/output.mp3'/> ",
      SUCCESS: "<audio src='https://s3.amazonaws.com/brutadonsounds/goodchoice.mp3'/> ",
      FAIL: "<audio src='https://s3.amazonaws.com/brutadonsounds/failbrutadon.mp3'/> ",
      ENDING: "<audio src='https://s3.amazonaws.com/brutadonsounds/endingbrutadon.mp3'/> ",
    }
};

module.exports = GameConst;
