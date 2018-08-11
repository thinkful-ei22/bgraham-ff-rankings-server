'use strict';

const express = require('express');
const mongoose = require('mongoose');

const PprWr = require('../models/ppr-wr');

const router = express.Router();

router.get('/', (req, res, next) =>{

  PprWr.find()
    .sort({UserRank: 1})
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) =>{


  const {id}= req.params;

  PprWr.findOne({_id: id})
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

router.put('/:id', (req, res, next) => {

  const {id} = req.params;
  const {Name, UserRank} = req.body;
  const updatePlayer = {Name, UserRank};
  
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  if (Name === '') {
    const err = new Error('Missing `Name` in request body');
    err.status = 400;
    return next(err);
  }

  if (UserRank === undefined){
    const err = new Error('Missing `UserRank` in request body');
    err.status = 400;
    return next(err);
  }

  PprWr.find()
    .then (players => {
      if (players){
        let playerToUpdate;


        for (let i =0; i < players.length; i++){
          if (players[i].id === id){
            playerToUpdate = players.splice(i, 1);
            // console.log('splicedPlayer: ', playerToUpdate);
          }
        }
        
        let startRank = playerToUpdate[0].UserRank;
        // console.log('startRank: ', startRank);

        let startIndex = startRank-1;
        // console.log('startIndex: ', startIndex);

        let endRank = updatePlayer.UserRank;
        // console.log('endRank: ', endRank);

        let endIndex = endRank-1;
        // console.log('endIndex: ', endIndex);

        players.splice(endIndex,0, playerToUpdate[0]);

        const promises = [];

        if (startIndex < endIndex){
          for (let i = startIndex; i <= endIndex; i +=1){
          
            const promise = PprWr.findByIdAndUpdate(players[i].id, { $set: { UserRank: i+1 }}, { new: true }).then(currentPlayer => {

              // console.log('current Player: ', currentPlayer);
              players[i].UserRank = currentPlayer.UserRank;
              players[i] =currentPlayer;

              return currentPlayer;
            });
            promises.push(promise);

          }
        }
        else if (startIndex > endIndex){
          for (let i = startIndex; i >= endIndex; i -=1){
          
            const promise = PprWr.findByIdAndUpdate(players[i].id, { $set: { UserRank: i+1 }}, { new: true }).then(currentPlayer => {

              // console.log('current Player: ', currentPlayer);
              players[i].UserRank = currentPlayer.UserRank;
              players[i] =currentPlayer;

              return currentPlayer;
            });
            promises.push(promise);

          }
        }
        
        Promise.all(promises).then(updatedPlayers => {
          PprWr.find()
            .sort({UserRank: 1})
            .then (results => {
              res.json(results);
            });
        });
      }
    })
    .catch(err => {
      next(err);
    });

});
module.exports = router;