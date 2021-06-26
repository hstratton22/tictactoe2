//- id, activePlayer= userModelId, player1=UserModel, player2=UserModel, win, loss, draw, 1=null, 2=null, 3=null, 4=null, 5=null, 6=null, 7=null, 8=null, 9=null

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const gameSchema = new Schema({
    play: {
        type: Boolean,
        required: true,
    },
    player1Turn: {
        type: Boolean,
        required: true
    },
    player1: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    player2: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    player1Country: {
        type: String,
        required: true
    },
    player2Country: {
        type: String,
        required: true
    },
    gameWinner: String, // Options: player1, player2, tie
    gameGrid: { 
        type: String,
        required: false
    }
});

// gameSchema.methods.chooseSpace = function () {
//     //Loop through gameGrid spaces and assign player to chosen space
// }
// gameSchema.methods.determineState = function () {
//     //check for wins
//     //loop through gameGrid and determine if all spaces are filled for draw
// }
// gameSchema.methods.drawBoard = function () {

// }
module.exports = mongoose.model('GamePlay', gameSchema);