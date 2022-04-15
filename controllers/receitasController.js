const Receita = require('../models/receitaModel');

//---------------------------------------------------------------------------------------------------------------//

exports.getReceita = async (req, res) => {
  const resposta = await Receita.aggregate([
    {
      $match: { nome: { $eq: 'Peixe Delícia de Olinda da Eliane' } },
    },
  ]);
  // const doc = await Receita.findById(req.params.id);
  res.status(200).json({ status: 'sucess', data: { resposta } });
};

//---------------------------------------------------------------------------------------------------------------//
