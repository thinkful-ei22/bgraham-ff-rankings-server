'use strict';

const express = require('express');
const mongoose = require('mongoose');

const StdTe = require('../models/std-te');

const router = express.Router();

router.get('/', (req, res, next) =>{

  StdTe.find()
    .sort({UserRank: 1})
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => next(err));
});
router.get('/:UserRank', (req, res, next) =>{

  const userRank = req.params.UserRank;

  console.log(userRank);

  StdTe.findOne({UserRank: userRank})
   
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => next(err));
});
module.exports = router;