const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  continent: {
    type: String,
    required: true
  },
  climate: {
    type: String,
    required: true
  },
  bestTimeToVisit: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;