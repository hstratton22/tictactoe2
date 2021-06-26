const User = require('../models/user');
const GamePlay = require('../models/gamePlay');

exports.getProfile = (req, res, next) => {
    res.render('editUserProfile', {
        pageTitle: 'Edit Profile',
        path: '/editUserProfile'
    });
};
// exports.getDashboard = (req, res, next) => {
//     res.render('dashboard', {
//         pageTitle: 'Dashboard',
//         path: '/dashboard'
//     });
// };
exports.getDashboard = (req, res, next) => {
    const gameDetails = {};
    User.find()
        .then(players => {
            gameDetails.players = players
            return gameDetails;  
        }).then(gameDetails => {
            gameDetails.games = GamePlay.find({ player2: req.session.user });
            return gameDetails;
        }).then(gameDetails => {
            //console.log(gameDetails.games);
            res.render('dashboard', { 
                games: gameDetails.games,
                players: gameDetails.players,
                user: req.session.user,
                pageTitle: 'Dashboard', 
                path: '/dashboard' 
            }); 
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
          });
        // function renderItems(games) {
        //     res.render('dashboard', { 
        //         games: games,
        //         players: req.session.players,
        //         user: req.session.user,
        //         pageTitle: 'Dashboard', 
        //         path: '/dashboard' 
        //     });  
        //   }

    // GamePlay.find({ player2: req.session.user })
    //     .then(games => {
    //         console.log(req.session.players);
    //         res.render('dashboard', { 
    //             games: games,
    //             players: players,
    //             user: req.session.user,
    //             pageTitle: 'Dashboard', 
    //             path: '/dashboard' 
    //         });            
    //     })
         

      
};

exports.getPlayGame = (req, res, next) => {
    
    const gameDetails = {
        _id: req.body.gamePlay_id,
        play: req.body.play,
        player1Turn: req.body.player1Turn,
        player1: req.body.player1,
        player2: req.body.player2,
        player1Country: req.body.player1Country,
        player2Country: req.body.player2Country,
        gameWinner: req.body.gameWinner,
        gameGrid: req.body.gameGrid
    };

    // const game_id = gameDetails.gamePlay_id;
    // console.log(game_id);
    // GamePlay.findByIdAndUpdate(
    //     {_id: gameDetails._id},
    //     {play: gameDetails.play,
    //     player1Turn: gameDetails.player1Turn,
    //     player1: gameDetails.player1,
    //     player2: gameDetails.player2,
    //     player1Country: gameDetails.player1Country,
    //     player2Country: gameDetails.player2Country,
    //     gameWinner: gameDetails.gameWinner,
    //     gameGrid: gameDetails.gameGrid}
    //     )
    //     .then(result => {
    //         console.log(result);
    //         res.render('playGame', { 
    //             user: req.session.user,
    //             gameDetails: gameDetails,
    //             pageTitle: 'Play Game', 
    //             path: '/playGame' 
    //         });
    // })

    // Book.findOneAndUpdate({ "_id": bookId }, { "$set": { "name": name, "genre": genre, "author": author, "similar": similar}}).exec(function(err, book){
    //     if(err) {
    //         console.log(err);
    //         res.status(500).send(err);
    //     } else {
    //              res.status(200).send(book);
    //     }
    //  });

    if (gameDetails.play === 'false'){
        gameDetails.play = false;
    } else if (gameDetails.play === 'true'){
        gameDetails.play = true;
    }

    GamePlay.findByIdAndUpdate(
        {_id: gameDetails._id},
        {play: gameDetails.play,
        player1Turn: gameDetails.player1Turn,
        gameWinner: gameDetails.gameWinner,
        gameGrid: gameDetails.gameGrid},
        function(err, result){
            if(err){
                res.send(err) 
            } else {
                console.log(result);
                return result
            }
        }
    ).then(result => {
        console.log(result);
        if (result.gameGrid){
            gameDetails.gameGrid = JSON.parse(result.gameGrid);
        } else {
            gameDetails.gameGrid = {
                "1": "",
                "2": "",
                "3": "",
                "4": "",
                "5": "",
                "6": "",
                "7": "",
                "8": "",
                "9": ""
            };
        }
        res.render('playGame', { 
            user: req.session.user,
            gameDetails: gameDetails,
            pageTitle: 'Play Game', 
            path: '/playGame' 
        });
    })


    // console.log(gameDetails.play);
    // console.log('gamePlay_id');
    // GamePlay.findById(gameDetails.gamePlay_id)
    //     .then(result => {
    //         console.log(result);
    //         if (result.gameGrid){
    //             gameDetails.gameGrid = JSON.parse(result.gameGrid);
    //         } else {
    //             gameDetails.gameGrid = {
    //                 "1": "",
    //                 "2": "",
    //                 "3": "",
    //                 "4": "",
    //                 "5": "",
    //                 "6": "",
    //                 "7": "",
    //                 "8": "",
    //                 "9": ""
    //             };
    //         }
    //         res.render('playGame', { 
    //             user: req.session.user,
    //             gameDetails: gameDetails,
    //             pageTitle: 'Play Game', 
    //             path: '/playGame' 
    //         });
    //     })

    // Product.findById(prodId)
    // .then(product => {
    //   return req.user.addToCart(product);
    // })
    // .then(result => {
    //   console.log(result);
    //   res.redirect('/cart');
    // })
    // .catch(err => {
    //   const error = new Error(err);
    //   error.httpStatusCode = 500;
    //   return next(error);
    // });
};

exports.postPlayerMove = (req, res, next) => {
    
    const gameDetails = {
        _id: req.body._id,
        play: req.body.play,
        player1Turn: req.body.player1Turn,
        player1: req.body.player1,
        player2: req.body.player2,
        gameWinner: req.body.gameWinner,
        gameGrid: req.body.gameGrid
    };
    console.log("json");
    console.log(gameDetails._id);
    // need to update data in mongoDB findByIdAndUpdate()
    // https://kb.objectrocket.com/mongo-db/how-to-use-mongoose-to-find-by-id-and-update-with-an-example-1209
    // then redirect back to the page with the updated mongoDB data
    if (gameDetails.player1Turn === "false"){
        gameDetails.player1Turn = false;
    } else {
        gameDetails.player1Turn = true;
    }
    
    GamePlay.findByIdAndUpdate(
        {_id: gameDetails._id},
        {play: gameDetails.play,
        player1Turn: gameDetails.player1Turn,
        gameWinner: gameDetails.gameWinner,
        gameGrid: gameDetails.gameGrid},
        function(err, result){
            if(err){
                res.send(err) 
            } else {
                // console.log(result);
                return result
            }
        }
    ).then(result => {
        console.log(result);
        if (result){
            console.log(typeof result.gameGrid);
            // gameDetails.gameGrid = JSON.parse(result.gameGrid);
            console.log(gameDetails.gameGrid);
            //return gameDetails.gameGrid
        } else {
            gameDetails.gameGrid = {
                "1": "",
                "2": "",
                "3": "",
                "4": "",
                "5": "",
                "6": "",
                "7": "",
                "8": "",
                "9": ""
            };
        }
        res.render('playGame', { 
            user: req.session.user,
            gameDetails: gameDetails,
            pageTitle: 'Play Game', 
            path: '/playGame' 
        });
    })

    
}


// exports.getPlayers = (req, res, next) => {
//     GamePlay.find()
//       .then(players => {
//         console.log(players);
//         res.render('shop/product-list', {
//           plays: players,
//           pageTitle: 'All Products',
//           path: '/products'
//         });
//       })
//       .catch(err => {
//         const error = new Error(err);
//         error.httpStatusCode = 500;
//         return next(error);
//       });
//   };

exports.postGamePlay = (req, res, next) => {

    const gamePlay = new GamePlay({
        play: req.body.play,
        player1Turn: req.body.player1Turn,
        player1: req.body.player1,
        player2: req.body.player2,
        player1Country: req.body.player1Country,
        player2Country: req.body.player2Country,
        gameWinner: req.body.gameWinner,
        gameGrid: req.body.gameGrid
    });

    gamePlay.save()
        .then(result => {
            console.log('Created New Game');
            return result;
        }).then(result => {
            const games = GamePlay.find({$or:[ 
                {player1: req.session.user},
                {player2: req.session.user}
            ]
            });
            return games;
        }).then(games => {
            res.render('dashboard', { 
                games: games,
                players: req.session.players,
                user: req.session.user,
                pageTitle: 'Dashboard', 
                path: '/dashboard' 
            });            
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}

