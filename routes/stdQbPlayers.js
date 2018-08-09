'use strict';

const express = require('express');
const mongoose = require('mongoose');

const StdQb = require('../models/std-qb');

const router = express.Router();

router.get('/', (req, res, next) =>{

  StdQb.find()
    .sort({UserRank: 1})
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => next(err));
});
router.get('/:UserRank', (req, res, next) =>{

  const userRank = req.params.UserRank;

  console.log(userRank);

  StdQb.findOne({UserRank: userRank})
   
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => next(err));
});
module.exports = router;