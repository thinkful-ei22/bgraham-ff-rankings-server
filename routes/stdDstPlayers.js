'use strict';

const express = require('express');
const mongoose = require('mongoose');

const StdDst = require('../models/std-dst');

const router = express.Router();

router.get('/', (req, res, next) =>{

  StdDst.find()
    .sort({Rank: 1})
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => next(err));
});

module.exports = router;