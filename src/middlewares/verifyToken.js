import jwt from 'jsonwebtoken';
import Usuario from '../models/UsuarioModel.js';

const getAuthToken = (authorization) => {
    if (!authorization) {
        return null;
    }

    const [scheme, value] = authorization.split(' ');
    return value ? value : scheme;
};

const verifyToken = async(req, res, next) =>{
    try {
        
        const token = getAuthToken(req.headers.authorization);

        if(!token){
            return res.status(403).send({
                type: 'error',
                message: 'Usuario nao identificado',
                data: null
            })
        }

        const usuario = jwt.verify(token, process.env.JWT_SECRET || 'secret')

        const usuarioExistente = {
            id: usuario.id,
            email: usuario.email,
            nome: usuario.nome
        };

        next();
    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno',
            data: error.message
        });
    }
}

export default verifyToken
