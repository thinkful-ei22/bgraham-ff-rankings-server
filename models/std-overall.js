'use strict';

const mongoose = require ('mongoose');

const stdOverallSchema = new mongoose.Schema({
  Name: {type: String, required: true},
  Team: String,
  Position: String,
  ByeWeek : Number,
  Rank: {type: Number, unique: true},
  UserRank: {type: Number, required: true}
}, {collection: 'std-overall'});

stdOverallSchema.set('toObject', {
  virtuals: true,     // include built-in virtual `id`
  versionKey: false,  // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
  }
});

module.exports = mongoose.model('StdOverall', stdOverallSchema);