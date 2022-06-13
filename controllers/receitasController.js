const Receita = require('../models/receitaModel');

//---------------------------------------------------------------------------------------------------------------//

exports.sugerirReceitas = async (req, res) => {
  let ingredientes = [];
  if (req.body.ingredientes !== undefined && req.body.ingredientes !== '') {
    ingredientes = req.body.ingredientes
      .replace('[', '')
      .replace(']', '')
      .split(',');
  }
  let validades = [];
  if (req.body.validades !== undefined && req.body.validades !== '') {
    validades =
      req.body.validades.replace('[', '').replace(']', '').split(',') || [];
  }
  const ingredientesQuaseVencidos = [];

  let i = 0;
  while (i < ingredientes.length) {
    if (new Date(validades[i]) - Date.now() <= 432000000) {
      ingredientesQuaseVencidos.push(ingredientes[i]);
    }
    i += 1;
  }

  const limit = 200;

  const resposta = await Receita.aggregate([
    {
      $match: {
        ingredientes: { $in: ingredientes },
      },
    },
    {
      $project: {
        ingredientesParaReceita: { $size: '$ingredientes' },
        naGeladeira: {
          $size: {
            $setIntersection: [ingredientes, '$ingredientes'],
          },
        },
        itemsEmVencimentoNaReceita: {
          $setIntersection: [ingredientes, '$ingredientes'],
        },
        itemsFaltantes: {
          $setDifference: ['$ingredientes', ingredientes],
        },
        itemsEmVencimento: {
          $size: {
            $setIntersection: [ingredientesQuaseVencidos, '$ingredientes'],
          },
        },
      },
    },
    {
      $addFields: {
        sugestionIndex: {
          $multiply: [
            { $divide: ['$naGeladeira', '$ingredientesParaReceita'] },
            { $divide: ['$itemsEmVencimento', '$ingredientesParaReceita'] },
          ],
        },
        porcentagemNaGeladeira: {
          $multiply: [
            { $divide: ['$naGeladeira', '$ingredientesParaReceita'] },
            100,
          ],
        },
      },
    },
    {
      $lookup: {
        from: 'receitas',
        localField: 'nome',
        foreignField: 'nome',
        as: 'nome',
      },
    },
    { $sort: { sugestionIndex: -1, ingredientesParaReceita: -1 } },
  ]).limit(limit);

  res.status(200).json({ status: 'sucess', data: { resposta } });
};

//---------------------------------------------------------------------------------------------------------------//

exports.getReceita = async (req, res) => {
  const receita = await Receita.find({ _id: req.body.id });
  res.status(200).json({ status: 'sucess', data: { receita } });
};
