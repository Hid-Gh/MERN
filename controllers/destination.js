const Destination = require('../models/Destination');

const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find({});
   
    res.status(200).json({ data: destinations }); // Send the data in the response body
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// const getDestination = async (req, res) => {
//   try {
//     const destination = await Destination.findById(req.params.id, '-_id name description continent climate bestTimeToVisit language currency image');
//     if (!destination) {
//       return res.status(404).json({ message: 'Destination not found' });
//     }
  
//     res.status(200).json({ data: destination }); // Send the data in the response body
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// };

const createDestination = async (req, res) => {
  try {
    const {
      name,
      description,
      continent,
      climate,
      bestTimeToVisit,
      language,
      currency,
      image
    } = req.body;

    const destination = new Destination({
      name,
      description,
      continent,
      climate,
      bestTimeToVisit,
      language,
      currency,
      image
    });

    const createdDestination = await destination.save();

    res.status(201).json({ destination: createdDestination });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports={
  getAllDestinations,
 // getDestination,
  createDestination
}