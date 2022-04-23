const Receita = require('../models/receitaQueryModel');

//---------------------------------------------------------------------------------------------------------------//

exports.getReceita = async (req, res) => {
  const ingredientes = ['Açúcar', 'açúcar cristal', 'Sal', 'cacau em pó'];

  const resposta = await Receita.aggregate([
    {
      $match: {
        secao: { $in: ingredientes },
      },
    },
    {
      $project: {
        size: { $size: '$secao' },
        order: {
          $size: {
            $setIntersection: [ingredientes, '$secao'],
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
