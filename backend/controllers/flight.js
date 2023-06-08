const Flight = require('../models/Flight');
const getAllFlights = async (req, res) => {
            try {
              const userId = req.params.id;
          
              if (!userId) {
                throw new Error('User ID is missing');
              }
              // Get all flights for the user
              const flights = await Flight.find({ userId });
              res.status(200).json({ flights });
            } catch (error) {
              console.error(error);
              res.status(500).send('Internal Server Error');
            }
          };  

          const createFlight = async (req, res) => {
            try {
              const {destinationName, destinationCurrency, cost, flightDate, returnDate } = req.body;
              const userId = req.params.id;
          
              if (!userId) {
                throw new Error('User ID is missing');
              }
          
              const flight = new Flight({ userId, destinationName, destinationCurrency, cost, flightDate, returnDate });
              await flight.save();
          
              res.status(201).json({ message: 'Flight created successfully', flight });
            } catch (error) {
              console.error(error);
              res.status(500).send('Internal Server Error');
            }
          };
          
          const deleteFlights = async (req, res) => {
            try {
              const userId = req.params.id;
              const result = await Flight.deleteMany({ userId });
              console.log(`Deleted ${result.deletedCount} flights for user ${userId}`);
              res.status(200).json({ message: `Deleted ${result.deletedCount} flights for user ${userId}` });
            } catch (error) {
              console.error(error);
              res.status(500).send('Internal Server Error');
            }
          };

module.exports={
            getAllFlights,
            createFlight,
            deleteFlights
}