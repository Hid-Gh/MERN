const User = require('../models/User')
const Destination = require('../models/Destination');

const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError,NotFoundError } = require('../errors')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ userId: user._id, token });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Failed to create user' });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ userId: user._id, token });
};
const getUserAndDestination = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId, '-_id fName lName email nationality');
    const destination = await Destination.findById(req.params.destinationId, '-_id name description continent climate bestTimeToVisit language currency image');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    const { fName, lName, email, nationality } = user;
    const { name, description, continent, climate, bestTimeToVisit, language, currency, image } = destination;

    res.status(200).json({ user: { fName, lName, email, nationality }, destination: { name, description, continent, climate, bestTimeToVisit, language, currency, image } }); // Send both responses in the same JSON object
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
const userUpdate = async (req, res) => {
  try {
    const { userId: userIdParam } = req.params;
    const { fName, lName, email, password, nationality } = req.body;

    // Check if email already exists
    const userWithEmail = await User.findOne({ email });
    if (userWithEmail && userWithEmail._id.toString() !== userIdParam) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password if it exists
    let hashedPassword;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userIdParam,
      { fName, lName, email, password: hashedPassword, nationality },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new NotFoundError(`No user with id ${userIdParam}`);
    }

    res.status(StatusCodes.OK).json({ user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
};
module.exports = {
  register,
  login,
  userUpdate,
  getUserAndDestination
}
