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

  let originIndex = req.params.UserRank-1, 
    newIndex = req.body.UserRank-1,
    start = originIndex > newIndex ? newIndex: originIndex, 
    finish = originIndex > newIndex ? originIndex : newIndex, updatedPlayer =[];
  PprOverall.find()
    .then(results => {

      //origin = 3, new = 0
      

      if(results){
        let player = results.splice(originIndex, 1);

      
        results.splice(newIndex,0, player[0]);
  
        for (let i = start; i <= finish; i +=1){
          
          PprOverall.findByIdAndUpdate(results[i].id, { $set: { UserRank: i+1 }}, { new: true }, function (err, currentPlayer) {
            if (err) {
              console.log(err);
            }
            results[i].UserRank = currentPlayer.UserRank;
            results[i] =currentPlayer;

            

          });
          updatedPlayer.push(results[i]);
        }
        console.log(updatedPlayer);

        res.send('hello');
  
      } else {
        next();
      }
    })
    .catch(err => next(err));
});



module.exports = router;