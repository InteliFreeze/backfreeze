const Receita = require('../models/receitaQueryModel');

//---------------------------------------------------------------------------------------------------------------//

exports.getReceita = async (req, res) => {
  const ingredientes = ["suco de laranja", "presunto", "queijo", "pão", "cebola", "carne", "carne moída", "feijão", "arroz", "batata", "laranja", "chocolate", "macarrão", "fermento em pó", "farinha", "sal", "requeijão", "mortadela"];

  const resposta = await Receita.aggregate([
    {
      $match: {
        ingredientes: { $in: ingredientes },
      },
    },
    {
      $project: {
        size: { $size: '$ingredientes' },
        order: {
          $size: {
            $setIntersection: [ingredientes, '$ingredientes'],
          },
        },
      },
    },
    {
      $addFields: {
        percentage: { $divide: ['$order', '$size'] },
      },
    },
    { $sort: { percentage: -1 } },
  ]);

  // const resposta = await Receita.aggregate([
  //   {
  //     $match: {
  //       Nome: { $eq: 'Scalloped Corn' },
  //     }
  //   }
  // ]);

  // const resposta = await Receita.aggregate([
  //   {
  //     $match: {
  //       secao: { $in: ingredientes },
  //     },
  //   },
  //   {
  //     $project: {
  //       size: { $size: '$secao' },

  //     },
  //   },
  //   { $sort: { size: 1 } },
  // ]);

  // const doc = await Receita.findById(req.params.id);
  res.status(200).json({ status: 'sucess', data: { resposta } });
};

//---------------------------------------------------------------------------------------------------------------//
