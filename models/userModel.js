const mongoose = require('mongoose');

//---------------------------------------------------------------------------------------------------------------//

const userSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  items: [
    {
      nome: {
        type: String,
        trim: true,
        toLowerCase: true,
      },
      validade: {
        type: Date,
      },
      codigo: {
        type: Number,
      },
    },
  ],
});

//---------------------------------------------------------------------------------------------------------------//

const Tour = mongoose.model('user', userSchema);

module.exports = Tour;
