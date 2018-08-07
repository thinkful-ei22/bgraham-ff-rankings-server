'use strict';

const express = require('express');
const mongoose = require('mongoose');

const PprTe = require('../models/ppr-te');

const router = express.Router();

router.get('/', (req, res, next) =>{

  PprTe.find()
    .sort({Rank: 1})
    .limit(100)
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => next(err));
});

module.exports = router;