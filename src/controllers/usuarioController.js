const token = require("../util/token");
const usuarioModel = require('../models/usuarioModel');

exports.entrar = async (req, res) => {
    const { nick } = req.body;
    try {
        let resp = await usuarioModel.registrarUsuario(nick);
        if (resp.insertedId) {
            const userId = resp.insertedId.toString();
            res.status(200).json({
                idUser: userId,
                token: await token.setToken(userId, nick),
                nick: nick
            });
        } else {
            res.status(400).json({ msg: "Erro ao registrar usuário" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Erro ao processar entrada", error });
    }
};
