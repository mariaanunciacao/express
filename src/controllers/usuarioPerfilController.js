//permite que o usuário acesse as informações do perfil, como nome, email, foto, etc.

import UsuarioPerfil from "../models/UsuarioPerfilModel.js";

const getById = async (req, res) => {
    try {
        const { id } = req.params;

        const usuarioPerfil = await UsuarioPerfil.findOne({
            where: { id },
            include: [
                {
                    association: 'usuarios',
                    attributes: ['id', 'email', 'nome']
                },
                {
                    association: 'perfis',
                    attributes: ['id', 'nome']
                }
            ]
        });

        if (!usuarioPerfil) {
            return res.status(404).send({
                type: 'error',
                message: 'Perfil do usuário não encontrado',
                data: null
            });
        }

        res.status(200).send({
            type: 'success',
            message: 'Perfil do usuário encontrado com sucesso',
            data: usuarioPerfil
        });
    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ocorreu um erro',
            data: error.message
        });
    }
};

export default {
    getById
};