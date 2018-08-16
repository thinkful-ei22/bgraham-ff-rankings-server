'use strict';

const mongoose = require ('mongoose');

const pprOverallSchema = new mongoose.Schema({
  Name: {type: String, required: true},
  Team: String,
  Position: String,
  ByeWeek : Number,
  Rank: {type: Number, unique: true},
  UserRank: {type: Number, required: true},
  PassingYards: Number,
  PassingTouchdowns: Number,
  RushingYards: Number,
  RushingTouchdowns: Number,
  Receptions: Number,
  ReceivingYards: Number,
  ReceivingTouchdowns: Number,
  TacklesForLoss: Number,
  Sacks: Number,
  QuarterbackHits: Number,
  Interceptions: Number,
  FumblesRecovered: Number,
  Safeties: Number,
  DefensiveTouchdowns: Number,
  SpecialTeamsTouchdowns: Number,
  FieldGoalsMade: Number,
  FieldGoalsAttempted: Number,
  FieldGoalPercentage: Number,
  ExtraPointsMade: Number,
  ExtraPointsAttempted: Number,
  FantasyPoints: Number,
  Profile: String,
  Expanded: {type: Boolean, default: false}
});

pprOverallSchema.set('toObject', {
  virtuals: true,     // include built-in virtual `id`
  versionKey: false,  // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
  }
});

module.exports = mongoose.model('PprOverall', pprOverallSchema);