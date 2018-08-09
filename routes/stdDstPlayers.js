'use strict';

const express = require('express');
const mongoose = require('mongoose');

const StdDst = require('../models/std-dst');

const router = express.Router();

router.get('/', (req, res, next) =>{

  StdDst.find()
    .sort({UserRank: 1})
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => next(err));
});

router.get('/:UserRank', (req, res, next) =>{

  const userRank = req.params.UserRank;

  console.log(userRank);

  StdDst.findOne({UserRank: userRank})
   
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => next(err));
});

router.put('/:UserRank', (req, res, next) => {

  let originIndex = req.params.UserRank-1, 
    newIndex = req.body.UserRank-1,
    start = originIndex > newIndex ? newIndex: originIndex, 
    finish = originIndex > newIndex ? originIndex : newIndex, updatedPlayer =[];
  
  StdDst.find()
    .then(results => {

      //origin = 3, new = 0
      

      if(results){
        let player = results.splice(originIndex, 1);

      
        results.splice(newIndex,0, player[0]);
  
        const promises = [];
        for (let i = start; i <= finish; i +=1){
          
          const promise = StdDst.findByIdAndUpdate(results[i].id, { $set: { UserRank: i+1 }}, { new: true }).then(currentPlayer => {
            results[i].UserRank = currentPlayer.UserRank;
            results[i] =currentPlayer;

            return currentPlayer;
          });
            

            
          promises.push(promise);
        }
        Promise.all(promises).then(players => {
          res.json(players);
        });

  
      } else {
        next();
      }
    })
    .catch(err => next(err));
});
module.exports = router;