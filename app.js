const express = require('express');
const receitasRouter = require('./routes/receitasRouter');
const userRouter = require('./routes/userRouter');

const app = express();

module.exports = app;

//---------------------------------------------------------------------------------------------------------------//

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(express.json());

app.use('/api/receitas', receitasRouter);
app.use('/api/users', userRouter);

//---------------------------------------------------------------------------------------------------------------//
