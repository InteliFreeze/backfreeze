const express = require('express');
const receitasRouter = require('./routes/receitasRouter');
const estoqueRouter = require('./routes/estoqueRouter');

const app = express();

module.exports = app;

//---------------------------------------------------------------------------------------------------------------//

app.use(express.json());

app.use('/api/receitas', receitasRouter);
app.use('/api/estoque', estoqueRouter);

//---------------------------------------------------------------------------------------------------------------//
