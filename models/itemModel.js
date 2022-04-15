const mongoose = require('mongoose');
const slugify = require('slugify');

//---------------------------------------------------------------------------------------------------------------//

const itemSchema = new mongoose.Schema({
  id: String,
  name: {
    type: String,
    required: [true, 'Um item precisa ter um nome.'],
    unique: true,
    trim: true,
  },
  slug: String,
  validade: {
    type: Date,
    required: [true, 'Um item precisa ter uma validade.'],
  },
});

itemSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//---------------------------------------------------------------------------------------------------------------//

const Tour = mongoose.model('Item', itemSchema);

module.exports = Tour;
