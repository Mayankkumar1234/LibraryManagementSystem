const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
  token:{
    type:String
  }
})

const BlackList = mongoose.model('BlackList',blacklistSchema);

module.exports = BlackList;