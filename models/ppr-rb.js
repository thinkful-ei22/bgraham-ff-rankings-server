'use strict';

const mongoose = require ('mongoose');

const pprRbSchema = new mongoose.Schema({
  Name: {type: String, required: true},
  Team: String,
  Position: String,
  ByeWeek : Number,
  RushingYards: Number,
  RushingTouchdowns: Number,
  Receptions: Number,
  ReceivingYards: Number,
  ReceivingTouchdowns: Number,
  FantasyPoints: Number,
  Profile: String,
  Rank: {type: Number, unique: true},
  UserRank: {type: Number, required: true}
}, {collection: 'ppr-rb'});

pprRbSchema.set('toObject', {
  virtuals: true,     // include built-in virtual `id`
  versionKey: false,  // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
  }
});

module.exports = mongoose.model('PprRb', pprRbSchema);