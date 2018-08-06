'use strict';

const express = require('express');
const mongoose = require('mongoose');

const StdOverall = require('../models/std-overall');

const router = express.Router();

router.get('/', (req, res, next) =>{

  StdOverall.find()
    .sort({Rank: 1})
    .limit(100)
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => next(err));
});

module.exports = router;