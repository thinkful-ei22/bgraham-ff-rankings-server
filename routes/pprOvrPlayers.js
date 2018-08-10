'use strict';

const express = require('express');
const mongoose = require('mongoose');

const PprOverall = require('../models/ppr-overall');
const router = express.Router();

router.get('/', (req, res, next) =>{

  PprOverall.find()
    .sort({UserRank: 1})
    .then(results => {
    // console.log(results);
      res.status(200).json(results);
    })
    .catch(err => next(err));
});


router.get('/:UserRank', (req, res, next) =>{
  const userRank = req.params.UserRank;

  PprOverall.findOne({UserRank: userRank})
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

router.put('/:UserRank', (req, res, next) => {

  let startRank = req.params.UserRank;
  let startIndex = req.params.UserRank-1;
  console.log('startRank: ', startRank);
  console.log('startIndex: ', startIndex);

  let endRank = req.body.UserRank;
  let endIndex = req.body.UserRank-1;
  console.log('endRank: ', endRank);
  console.log('endIndex: ', endIndex);



  PprOverall.find()
    .then (players => {
      if (players){

        let player = players.splice(startIndex, 1);
        
        console.log('splicedPlayer: ', player);

        players.splice(endIndex,0, player[0]);

        const promises = [];
        for (let i = startIndex; i <= endIndex; i +=1){
          
          const promise = PprOverall.findByIdAndUpdate(players[i].id, { $set: { UserRank: i+1 }}, { new: true }).then(currentPlayer => {
            players[i].UserRank = currentPlayer.UserRank;
            players[i] =currentPlayer;

            return currentPlayer;
          });
          promises.push(promise);

        }
        
        Promise.all(promises).then(updatedPlayers => {
          PprOverall.find()
            .sort({UserRank: 1})
            .then (results => {
              res.json(results);
            });
        });
      }
    });























  // let originIndex = req.params.UserRank-1, 
  //   newIndex = req.body.UserRank-1,
  //   start = originIndex > newIndex ? newIndex: originIndex, 
  //   finish = originIndex > newIndex ? originIndex : newIndex;
  

  // console.log('originIndex:', originIndex);
  // console.log('newIndex', newIndex);
  // console.log('start: ', start);  
  // console.log('finish: ', finish);  


  // PprOverall.find()
  //   .then(results => {

  //     //origin = 3, new = 0
      

  //     if(results){
  //       let player = results.splice(originIndex, 1);

      
  //       results.splice(newIndex,0, player[0]);
  
  //       const promises = [];
  //       for (let i = start; i <= finish; i +=1){
          
  //         const promise = PprOverall.findByIdAndUpdate(results[i].id, { $set: { UserRank: i+1 }}, { new: true }).then(currentPlayer => {
  //           results[i].UserRank = currentPlayer.UserRank;
  //           results[i] =currentPlayer;

  //           return currentPlayer;
  //         });
            

            
  //         promises.push(promise);
  //       }
  //       Promise.all(promises).then(players => {
  //         res.json(players);
  //       });

  
  //     } else {
  //       next();
  //     }
  //   })
  //   .catch(err => next(err));
});



module.exports = router;