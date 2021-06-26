//id, name, email, country, wins, losses, draws, totalGamesPlayed  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    currentGames: {
        games: [
            {
                gameId: {
                    type: Schema.Types.ObjectId,
                    ref: 'GamePlay'
                },
            }
        ]

    },
    wins: Number,
    losses: Number,
    draws: Number,
    //totalGamesPlayed: Number, //need or calculate from wins/losses/draws?
    resetToken: String,
    resetTokenExpiration: Date,


});
userSchema.methods.totalGamesPlayed = function()  {
//calculate total from wins, losses, and draws
}
userSchema.methods.addGame = function(gamePlay)  {
    const currentGames = [...this.currentGames.games];
    currentGames.push({ gameId: gamePlay._id });
    const updatedGames = {
        games: currentGames
      };
      this.currentGames = updatedGames;
      return this.save();
}
module.exports = mongoose.model('User', userSchema);