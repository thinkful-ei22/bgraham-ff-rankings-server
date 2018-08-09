'use strict';

const express = require('express');
const mongoose = require('mongoose');

const StdWr = require('../models/std-wr');

const router = express.Router();

router.get('/', (req, res, next) =>{

  StdWr.find()
    .sort({UserRank: 1})
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => next(err));
});
router.get('/:UserRank', (req, res, next) =>{

  const userRank = req.params.UserRank;

  console.log(userRank);

  StdWr.findOne({UserRank: userRank})
   
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => next(err));
});
module.exports = router;