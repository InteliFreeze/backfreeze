const dotenv = require('dotenv');

const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

//---------------------------------------------------------------------------------------------------------------//

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.log(err));
const app = require('./app');

const port = process.env.PORT || 3000;

//---------------------------------------------------------------------------------------------------------------//

// eslint-disable-next-line no-unused-vars
const server = app.listen(port, (req, res) => {
  console.log(`App running on port ${port}...`);
});

//---------------------------------------------------------------------------------------------------------------//
