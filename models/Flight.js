const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
            userId: {
                        type: String,
                        ref: 'User',
                        required: true
                      },
  destinationName: { type: String, required: true },
  destinationCurrency: { type: String, required: true },
  cost: { type: Number, required: true },
  flightDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;