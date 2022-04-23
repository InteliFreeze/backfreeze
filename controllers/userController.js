const userModel = require('../models/userModel');

//---------------------------------------------------------------------------------------------------------------//

exports.getUser = (req, res) => {
  const User = userModel.find({ token: req.params.id });
  res.status(200).json({ status: 'success', data: { User } });
};

exports.createUser = (req, res) => {
  const User = userModel.create(req.body);
  res.status(200).json({ status: 'success', data: { User } });
};

exports.deleteItem = (req, res) => {
  res.status(500).json({ status: 'fail', message: 'Mão foi feito ainda' });
};

exports.addItem = (req, res) => {
  res.status(500).json({ status: 'fail', message: 'Mão foi feito ainda' });
};

//---------------------------------------------------------------------------------------------------------------//
