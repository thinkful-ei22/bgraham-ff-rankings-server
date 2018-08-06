'use strict';

const mongoose = require ('mongoose');

const stdQbSchema = new mongoose.Schema({
  name: {type: String, required: true},
  team: String,
  position: String,
  byeWeek : Number,
  rank: {type: Number, required: true}
}, {collection: 'std-qb'});

stdQbSchema.set('toObject', {
  virtuals: true,     // include built-in virtual `id`
  versionKey: false,  // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
  }
});

module.exports = mongoose.model('StdQb', stdQbSchema);