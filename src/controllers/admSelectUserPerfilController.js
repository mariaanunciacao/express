//esse controller será convertido em uma rota que deve validar se 
// o usuário logado tem o perfil de administrador(sera passado um authorization token pelo headers), caso tenha, ele poderá acessar 
// as informações do perfil do usuário, e definir no body se o perfil do usuário é cliente, entregador, gerente ou administrador, 
// para isso ele deve passar o id do usuário e o id do perfil,
// caso contrário, 
// ele receberá uma mensagem de acesso negado
import UsuarioPerfil from "../models/UsuarioPerfilModel.js";
import jwt from 'jsonwebtoken';
import Usuario from "../models/UsuarioModel.js";
import Perfil from "../models/PerfilModel.js";

const getAuthToken = (authorization) => {
    if (!authorization) {
        return null;
    }

    const [scheme, value] = authorization.split(' ');
    return value ? value : scheme;
};

const isAdmin = async (req, res) => {
    try {
        const token = getAuthToken(req.headers.authorization);

        if (!token) {
            res.status(403).send({
                type: 'error',
                message: 'Usuário não identificado',
                data: null
            });
            return false;
        }

        const usuario = jwt.verify(token, process.env.JWT_SECRET || 'secret');

        const perfilAdmin = await Perfil.findOne({
            where: {
                perfil: 'ADMIN'
            }
        });

        const perfilUsuario = await UsuarioPerfil.findOne({
            where: { idUsuario: usuario.id },
            include: [
                {
                    model: Perfil,
                    as: 'perfis'
                }
            ]
        });

        const ehAdmin = Boolean(perfilAdmin && perfilUsuario && Number(perfilUsuario.idPerfil) === Number(perfilAdmin.id));

        if (!perfilUsuario || !ehAdmin) {
            res.status(403).send({
                type: 'error',
                message: 'Acesso negado. Perfil de administrador é necessário para acessar esta rota.',
                data: null
            });
            return false;
        }

        return true;
    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ocorreu um erro',
            data: error.message
        });
        return false;
    }
};

const get = async (req, res) => {
    try {
        const autorizado = await isAdmin(req, res);

        if (!autorizado) {
            return;
        }

        const dados = await UsuarioPerfil.findAll({
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

        res.status(200).send({
            type: 'success',
            message: 'Perfis dos usuários encontrados com sucesso',
            data: dados
        });
    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ocorreu um erro',
            data: error.message
        });
    }
};

const getById = async (req, res) => {
    try {
        const autorizado = await isAdmin(req, res);

        if (!autorizado) {
            return;
        }

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

const update = async (req, res) => {
    try {
        const autorizado = await isAdmin(req, res);

        if (!autorizado) {
            return;
        }

        const { idUsuario, idPerfil } = req.body;

        if (!idUsuario || !idPerfil) {
            return res.status(400).send({
                type: 'error',
                message: 'Informe idUsuario e idPerfil no body',
                data: null
            });
        }

        const usuario = await Usuario.findByPk(idUsuario);
        if (!usuario) {
            return res.status(404).send({
                type: 'error',
                message: 'Usuário não encontrado',
                data: null
            });
        }

        const perfil = await Perfil.findByPk(idPerfil);
        if (!perfil) {
            return res.status(404).send({
                type: 'error',
                message: 'Perfil não encontrado',
                data: null
            });
        }

        const usuarioPerfilExistente = await UsuarioPerfil.findOne({
            where: { idUsuario }
        });

        let usuarioPerfil;

        if (usuarioPerfilExistente) {
            await usuarioPerfilExistente.update({ idPerfil });
            usuarioPerfil = usuarioPerfilExistente;
        } else {
            usuarioPerfil = await UsuarioPerfil.create({ idUsuario, idPerfil });
        }

        const usuarioPerfilComAssociacoes = await UsuarioPerfil.findByPk(usuarioPerfil.id, {
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

        return res.status(200).send({
            type: 'success',
            message: 'Perfil do usuário atualizado com sucesso',
            data: usuarioPerfilComAssociacoes
        });
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'Ocorreu um erro',
            data: error.message
        });
    }
};

export default {
    get,
    getById,
    update
};