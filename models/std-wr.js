'use strict';

const mongoose = require ('mongoose');

const stdWrSchema = new mongoose.Schema({
  Name: {type: String, required: true},
  Team: String,
  Position: String,
  ByeWeek : Number,
  Rank: {type: Number, required: true, unique: true},
  UserRank: {type: Number, required: true, unique: true}
}, {collection: 'std-wr'});

stdWrSchema.set('toObject', {
  virtuals: true,     // include built-in virtual `id`
  versionKey: false,  // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
  }
});

module.exports = mongoose.model('StdWr', stdWrSchema);