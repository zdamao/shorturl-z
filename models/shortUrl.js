const mongoose = require("mongoose");
const shortId = require("shortid");

const shortUrlSchema = mongoose.Schema({
  origin_url: {
    type: String,
    required: true
  },
  short_url: {
    type: String,
    required: true,
    default: shortId.generate
  }
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema);