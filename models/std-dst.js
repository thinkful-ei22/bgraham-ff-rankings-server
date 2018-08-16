'use strict';

const mongoose = require ('mongoose');

const stdDstSchema = new mongoose.Schema({
  Name: {type: String, required: true},
  Team: String,
  Position: String,
  ByeWeek : Number,
  TacklesForLoss: Number,
  Sacks: Number,
  QuarterbackHits: Number,
  Interceptions: Number,
  FumblesRecovered: Number,
  Safeties: Number,
  DefensiveTouchdowns: Number,
  SpecialTeamsTouchdowns: Number,
  FantasyPoints: Number,
  Profile: String,
  Rank: {type: Number, unique: true},
  UserRank: {type: Number, required: true}
}, {collection: 'std-dst'});

stdDstSchema.set('toObject', {
  virtuals: true,     // include built-in virtual `id`
  versionKey: false,  // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
  }
});

module.exports = mongoose.model('StdDst', stdDstSchema);