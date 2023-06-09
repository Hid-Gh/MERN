require('dotenv').config();
require('express-async-errors');
MONGO_URI = "mongodb+srv://hidayagharad2002:Grey-may21@cluster0.vntl8f8.mongodb.net/Travel?retryWrites=true&w=majority"
// extra security packages
;
const cors = require('cors');
const rateLimiter = require('express-rate-limit');

const path = require('path')
const express = require('express');
const app = express();

const connectDB = require('./db/connect');
//const authenticateUser = require('./middleware/authentication');
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
const buildPath = path.join(__dirname, 'build')


app.use(express.static(buildPath))
app.use(express.json());
app.use(cors());



// routes
app.use('/api/v1', authRouter);
app.use('/api/v1/destination', destinationRouter);
app.use('/api/v1/myFlights', flightRouter);
app.use('/api/v1',  paymentRouter)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 5010;
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'))
})
// try {
//       await connectDB(process.env.MONGO_URI);
//       app.listen(port, () =>
//         console.log(`Server is listening on port ${port}...`)
//       );
//     } catch (error) {
//       console.log(error);
//     }

const start = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
