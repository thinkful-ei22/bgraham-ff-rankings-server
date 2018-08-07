'use strict';

const express = require('express');
const mongoose = require('mongoose');

const StdWr = require('../models/std-wr');

const router = express.Router();

router.get('/', (req, res, next) =>{

  StdWr.find()
    .sort({Rank: 1})
    .limit(100)
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => next(err));
});

module.exports = router;