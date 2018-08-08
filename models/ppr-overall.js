'use strict';

const mongoose = require ('mongoose');

const pprOverallSchema = new mongoose.Schema({
  Name: {type: String, required: true},
  Team: String,
  Position: String,
  ByeWeek : Number,
  Rank: {type: Number, required: true, unique: true},
  UserRank: {type: Number, required: true, unique: true}
}, {collection: 'ppr-overall'});

pprOverallSchema.set('toObject', {
  virtuals: true,     // include built-in virtual `id`
  versionKey: false,  // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
  }
});

module.exports = mongoose.model('PprOverall', pprOverallSchema);