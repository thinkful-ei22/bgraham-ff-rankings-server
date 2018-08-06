'use strict';

const express = require('express');
const mongoose = require('mongoose');

const StdK = require('../models/std-k');

const router = express.Router();

router.get('/', (req, res, next) =>{

  StdK.find()
    .sort({Rank: 1})
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => next(err));
});

module.exports = router;