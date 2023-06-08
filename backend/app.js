require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');


const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');
// routers
const authRouter = require('./routes/auth');
const flightRouter = require('./routes/flight');
const destinationRouter = require('./routes/destination');
const paymentRouter = require('./routes/payment');
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());


// routes
app.use('/api/v1', authRouter);
app.use('/api/v1/destination', destinationRouter);
app.use('/api/v1/myFlights', flightRouter);
// app.use('', authenticateUser, flightRouter)
//app.use('/api/v1', authenticateUser, paymentRouter)
app.use('/api/v1',  paymentRouter)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 5010;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();