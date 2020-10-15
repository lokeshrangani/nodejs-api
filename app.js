const express = require("express");
const app = express();
const db = require("./models");
var bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
var cors = require('cors')
app.use(cors())
// const config = require('config');
const port = 3000;

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.json()); 

const apiRoutes = require("./routes/apiRoutes");
app.use("/api", apiRoutes);
// app.use("/api", apiRoutes, jwt({ secret: 'shhhhhhared-secret'}));

db.sequelize
  .authenticate() 
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`listening on: http://localhost:${port}`);
  });
});