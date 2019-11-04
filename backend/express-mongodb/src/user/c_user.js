'use strict'

const User = require('../user/user');

const controller_user = {};


controller_user.list = async (req,res) => {
    const users = await User.find({});
    res.status(200).send({users});
}

controller_user.insert = async (req, res) => {
    try {
        const {firstName, lastName, age, email} = req.body;

        if (!firstName || !lastName || !age || !email) {
            const err = new Error();
            err.code = 400;
            err.message = 'Ingrese los campos obligatorios';
            throw err;
        }

        const newUser = new User({firstName, lastName, age, email});
        await newUser.save();
        res.send({message : 'Se insertó'});
    } catch (err) {
        console.error(err);
        res.status(err.code || 500).send(err);
    }
}

controller_user.update = async (req, res) => {
    try {
        const {id} = req.params;
        const {firstName, lastName, age, email} = req.body;

        if (!firstName || !lastName || !age || !email || !id) {
            const err = new Error();
            err.code = 400;
            err.message = 'Ingrese los campos obligatorios';
            throw err;
        }

        await User.findByIdAndUpdate(id, {firstName, lastName, age, email});
        res.send({message : 'Se actualizó'});
    } catch (err) {
        console.error(err);
        res.status(err.code || 500).send(err);
    }
};

controller_user.delete = async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            const err = new Error();
            err.code = 400;
            err.message = 'No se ingreso el id';
            throw err;
        }

        await User.findByIdAndDelete(id);
        res.send({message : 'Se eliminó'});
    } catch (err) {
        console.error(err);
        res.status(err.code || 500).send(err);
    }
};




module.exports = controller_user;