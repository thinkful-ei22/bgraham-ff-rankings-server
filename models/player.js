'use strict';

const mongoose = require ('mongoose');

const playerSchema = new mongoose.Schema({
  Name: {type: String, required: true},
  Team: String,
  Position: String,
  ByeWeek : Number,
  Rank: {type: Number, unique: true},
  UserRank: {type: Number, required: true},
  Category: {type: String},
  OvrRank: {type: Number, unique: true}
});

playerSchema.set('toObject', {
  virtuals: true,     // include built-in virtual `id`
  versionKey: false,  // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
  }
});

module.exports = mongoose.model('Player', playerSchema);