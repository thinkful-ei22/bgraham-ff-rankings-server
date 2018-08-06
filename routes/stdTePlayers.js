'use strict';

const express = require('express');
const mongoose = require('mongoose');

const StdTe = require('../models/std-te');

const router = express.Router();

router.get('/', (req, res, next) =>{

  StdTe.find()
    .sort({Rank: 1})
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => next(err));
});

module.exports = router;