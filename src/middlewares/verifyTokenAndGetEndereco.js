import jwt from 'jsonwebtoken'; //biblioteca usada para criar e validar tokens JWT (autenticação)
import Usuario from '../models/UsuarioModel.js';
import Pessoa from '../models/PessoaModel.js';

const getAuthToken = (authorization) => {
    if (!authorization) {
        return null;
    }

    const [scheme, value] = authorization.split(' ');
    return value ? value : scheme;
}


const verifyTokenAndGetEndereco = async(req, res, next) =>{
    try {

        const token = getAuthToken(req.headers.authorization);

        if(!token){
            return res.status(403).send({
                type: 'error',
                message: 'Usuario nao identificado',
                data: null
            });
        }

        const usuario = jwt.verify(token, process.env.JWT_SECRET || 'secret');

        const usuarioExistente = {
            id: usuario.id,
            email: usuario.email,
            nome: usuario.nome
        };

        const usuarioDb = await Usuario.findByPk(usuarioExistente.id);
        
        if(!usuarioDb){
            return res.status(404).send({
                type: 'error',
                message: 'Usuario nao encontrado',
                data: null
            });
        }

        const pessoa = await Pessoa.findOne({
            where: { email: usuarioExistente.email }
        });

        if(!pessoa){
            return res.status(404).send({
                type: 'error',
                message: 'Pessoa vinculada ao usuario não encontrada',
                data: null
            });
        }

        req.idPessoa = pessoa.id;

        next()
    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro!',
            data: error.message
        });
    }
}

export default verifyTokenAndGetEndereco;