const express = require('express');
const receitasRouter = require('./routes/receitasRouter');
const userRouter = require('./routes/userRouter');

const app = express();

module.exports = app;

//---------------------------------------------------------------------------------------------------------------//

app.use(express.json());

app.use('/api/receitas', receitasRouter);
app.use('/api/users', userRouter);

//---------------------------------------------------------------------------------------------------------------//
