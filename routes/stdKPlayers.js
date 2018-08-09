'use strict';

const express = require('express');
const mongoose = require('mongoose');

const StdK = require('../models/std-k');

const router = express.Router();

router.get('/', (req, res, next) =>{

  StdK.find()
    .sort({UserRank: 1})
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => next(err));
});
router.get('/:UserRank', (req, res, next) =>{

  const userRank = req.params.UserRank;

  console.log(userRank);

  StdK.findOne({UserRank: userRank})
   
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => next(err));
});
module.exports = router;