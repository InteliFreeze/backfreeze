const mongoose = require('mongoose');

const slugify = require('slugify');

//---------------------------------------------------------------------------------------------------------------//

const userSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  items: [
    {
      id: mongoose.Types.ObjectId,
      name: {
        type: String,
        unique: true,
        trim: true,
      },
      slug: String,
      validade: {
        type: Date,
      },
    },
  ],
});

userSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//---------------------------------------------------------------------------------------------------------------//

const Tour = mongoose.model('user', userSchema);

module.exports = Tour;
