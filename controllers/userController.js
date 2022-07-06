const userModel = require('../models/userModel');

//---------------------------------------------------------------------------------------------------------------//

exports.getUser = async (req, res) => {
  try {
    const User = await userModel.find({ token: req.params.token });
    res.status(200).json({ status: 'success', data: { User } });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: 'a request falhou' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const User = await userModel.create(req.body);
    res.status(200).json({ status: 'success', data: { User } });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: 'Esse token já existe.' });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const User = await userModel.find({ token: req.params.token });

    const idDoitemASerDeletado = req.params.itemId;

    const { items } = User[0];
    const itemsFiltrados = await JSON.parse(JSON.stringify(items)).filter(
      (item) => item.codigo !== idDoitemASerDeletado * 1
    );
    const updatedUser = await User[0].set({ items: itemsFiltrados });

    await userModel.findOneAndUpdate({ token: req.params.token }, updatedUser);

    res.status(200).json({ status: 'success', data: { updatedUser } });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err });
  }
};

exports.addItem = async (req, res) => {
  try {
    const User = await userModel.find({ token: req.params.token });

    const itemASerAdicionado = await req.query.item;
    const { validade } = await req.query;
    const { codigo } = await req.query;

    const { items } = User[0];
    const itemsFiltrados = await JSON.parse(JSON.stringify(items));

    itemsFiltrados[itemsFiltrados.length] = {
      nome: itemASerAdicionado,
      validade,
      codigo,
    };

    const updatedUser = await User[0].set({ items: itemsFiltrados });

    await userModel.findOneAndUpdate({ token: req.params.token }, updatedUser);

    res.status(200).json({ status: 'success', data: { updatedUser } });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err });
  }
};

exports.sync = async (req, res) => {
  try {
    await userModel.findOneAndUpdate(
      { token: req.params.token },
      { items: req.body.items }
    );

    res.status(200).json({ status: 'success', message: 'Sincronizado' });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err });
  }
};

//---------------------------------------------------------------------------------------------------------------//
