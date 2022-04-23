const fs = require('fs');

let arquivo = fs.readFileSync('query_receitas.txt', 'utf-8');

// TIRAR AS PARADINHA CHATA DO PC DO SASAKI
arquivo = arquivo.replace(/," "/g, '');

//---------------------------------------------------------------------------------------------------------------//

arquivo = arquivo.replace(/[0-9]+ g|kg|litro|litros|ml|xícaras|copo|xícara|copos|colheres|colher|pitada|gramas|grama|unidade|Kg de /g, '');

arquivo = arquivo.replace(/[0-9]+g|kg|litro|litros|ml|xícaras|copo|xícara|copos|colheres|colher|pitada|gramas|grama|unidade|Kg de /g, '');

arquivo = arquivo.replace(/(sopa)/g, '');

arquivo = arquivo.replace(/" /g, '"');
arquivo = arquivo.replace(/ "/g, '"');
fs.writeFile("query_receitas3.json", arquivo, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log("File saved successfully!");
});
