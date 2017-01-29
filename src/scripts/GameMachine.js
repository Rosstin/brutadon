/**
 *  YOU GOT THIS BRUTADON
 *
 *  Made for Global Game Jam 2017 @ Facebook MPK
 */

var GameMachine = {
    currentState: NaN,
    _stateMap: {},

    addState: function(stateId, state) {
        this._stateMap[stateId] = state;
    },

    getResponseForIntent: function (intentKey, slots) {
        var stateObject = this._stateMap[this.currentState];
        return stateObject.onIntent(intentKey, slots);
    },

    getResponseForNewState: function (newState) {
        this.currentState = newState;
        var stateObject = this._stateMap[this.currentState];
        return stateObject.onTransition();
    }
};

module.exports = GameMachine;
