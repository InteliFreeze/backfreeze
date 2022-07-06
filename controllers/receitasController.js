const axios = require('axios');
const Receita = require('../models/receitaModel');

//---------------------------------------------------------------------------------------------------------------//

exports.ocr = async (req, res) => {
  const response = await axios({
    method: 'post',
    url: 'https://backfreeze-ocr.herokuapp.com/img_to_str/',
    data: {
      base64_img: req.body.base64,
    },
  })
    .catch((err) => {
      return 'Erro ao tentar realizar o OCR';
    });

  const validadeBruta = response.data.text_str.replace(' ', '').replace('.', '/').replace('-', '/').replace(/[a-z]|[A-Z]/g, '');
  const extraida = /[0-9]+\/[0-9]+\/[0-9]+/.exec(validadeBruta) || {0: '01/01/2023'};

  res
    .status(200)
    .json({
      status: 'sucess',
      data: extraida[0],
      stringInicial: response.data.text_str,
      stringFinal: validadeBruta,
      stringExtraida: extraida,
    });
};

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

  const limit = 30;

  const resposta = await Receita.aggregate([
    {
      $match: {
        ingredientes: { $in: ingredientes },
        nome: { $regex: '' },
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
        nome: '$nome',
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
    { $sort: { sugestionIndex: -1, ingredientesParaReceita: -1 } },
  ]).limit(limit);

  res.status(200).json({ status: 'sucess', data: { resposta } });
};

//---------------------------------------------------------------------------------------------------------------//

exports.getReceita = async (req, res) => {
  const receita = await Receita.find({ _id: req.body.id });
  res.status(200).json({ status: 'sucess', data: { receita } });
};
