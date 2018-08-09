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
module.exports = router;