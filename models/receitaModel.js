const mongoose = require('mongoose');

//---------------------------------------------------------------------------------------------------------------//

const receitaSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: String,
  nome: {
    type: String,
  },
  ingredientes_medidas_en: {
    type: String,
  },
  receita: {
    type: String,
  },
  link: {
    type: String,
  },
  ingredientes: {
    type: [String],
    trim: true,
  },
});
/* 

{
  "_id": ObjectId("5744eff20ca7832b5c745a48"),
  "nome": "Brownie de Chocolate com Gengibre",
  "secao": [
    {
      "nome": " Ingredientes",
      "conteudo": [
        "50 g farinha de milho fina",
        "10 g de cacau em pó",
        "250 g de chocolate meio amargo",
        "200 g de manteiga sem sal cortada em cubos",
        "20 ml de suco de gengibre",
        "5 ovos",
        "200 g de açúcar",
        "1 colher (chá) de fermento em pó",
        "100 g de nozes picadas grosseiramente",
        " "
      ]
    },
    {
      "nome": " Modo de Preparo",
      "conteudo": [
        "1 - Coloque numa tigela a farinha de milho fina e o cacau em pó.",
        "2 - Misture e reserve.",
        "3 - Numa panela, em banho-maria, derreta o chocolate meio amargo picado com a manteiga sem sal cortada em cubos.",
        "4 - Retire do fogo.",
        "5 - Adicione o suco de gengibre e misture.",
        "6 - Acrescente a mistura de farinha com cacau em pó (reservada acima). Misture bem e reserve.",
        "7 - Numa batedeira, coloque os ovos e o açúcar. Bata bem até dobrar de volume.",
        "8 - Com a batedeira ainda ligada, adicione o fermento em pó e bata até misturar.",
        "9 - Desligue a batedeira. Acrescente a mistura de chocolate (reservada acima) e as nozes picadas. Misture.",
        "10 - Transfira a massa para uma assadeira retangular (18 cm X 30 cm) untada e forrada com papel manteiga.",
        "11 - Leve para assar em forno médio pré-aquecido a 180°C por +/- 40 minutos.",
        "12 - Retire do forno.",
        "13 - Cubra o brownie com papel manteiga.",
        "14 - Coloque outra assadeira do mesmo tamanho pressionando levemente o brownie para que fique mais compacto e úmido",
        "15 - Deixe por +/- 4 horas na geladeira.",
        "16 - Retire a assadeira de cima do brownie, desenforme, corte em quadrados e sirva em seguida.",
        " "
      ]
    },
    {
      "nome": " Outras informações",
      "conteudo": [
        "Rendimento: 20 porções "
      ]
    }
  ]
}




















IDEIA IMPORTANTE AAAAAAAAAAAAAAAAA
{
  "_id": ObjectId("5744eff20ca7832b5c745a48"),
  ingredientes: "50 g farinha de milho finam 10 g de cacau em pó 250 g de chocolate meio amargo 200 g de manteiga sem sal cortada em cubos 20 ml de suco de gengibre",5 ovos","
}






exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: 1 }
    }
    // {
    //   $match: { _id: { $ne: 'EASY' } }
    // }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});







*/

//---------------------------------------------------------------------------------------------------------------//

const Receita = mongoose.model('receitas_items', receitaSchema);

module.exports = Receita;
