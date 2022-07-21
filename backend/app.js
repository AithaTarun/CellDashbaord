const express = require('express');

const app = express();

const mongoose = require('mongoose');

const connectionURL = process.env.MONGO_DB_URL

const databaseName = 'cells-dashboard-database';

mongoose.connect
(
  connectionURL + "/" + databaseName,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const database = mongoose.connection;

database.on
(
  'open', () =>
  {
    console.log("Connected to database");
  }
);

database.on
(
  'error', (error) =>
  {
    console.log("Error while connecting to database : ", error);
  }
);

app.use
(
  express.json()
);

app.use
{
  express.urlencoded
  (
    {
      extended: true
    }
  )
}

try
{
  app.use //To handle CORS error.
    (
      (request,response,next)=>
      {
        response.setHeader
        (
          'Access-Control-Allow-Origin',
          '*'
        );

        response.setHeader
        (
          'Access-Control-Allow-Origin', process.env.FRONT_END_URL
        );

        response.setHeader
        (
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );

        response.setHeader
        (
          'Access-Control-Allow-Methods',
          'GET, POST, PATCH, DELETE, OPTIONS, PUT'
        );

        response.setHeader
        (
          'Access-Control-Allow-Credentials',
          'true'
        )

        next();
      }
    );
}
catch (e)
{
  console.log("Error occurred :", e)
}

// Routes
const userRoutes = require('./routes/cell');
app.use("/api/cells", userRoutes);

module.exports = app;
