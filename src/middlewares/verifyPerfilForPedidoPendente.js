import jwt from 'jsonwebtoken';
import Usuario from '../models/UsuarioModel.js';
import UsuarioPerfil from '../models/UsuarioPerfilModel.js';
import Perfil from '../models/PerfilModel.js';

const getAuthToken = (authorization) => {
    if (!authorization) {
        return null;
    }

    const [scheme, value] = authorization.split(' ');
    return value ? value : scheme;
};

//somente entregadores podem acessar as rotas de pedidos pendentes, para isso verificamos o perfil do usuário logado, se for cliente, negamos o acesso
const verifyPerfilForPedidoPendente = async(req, res, next) =>{
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
        //objeto auxiliar criado manualmente a partir dos dados que vieram do token JWT:
        const usuarioExistente = {
            id: usuario.id,
            email: usuario.email,
            nome: usuario.nome
        };
        //Serve para filtrar apenas os dados necessários
        const perfilUsuario = await UsuarioPerfil.findOne({
            where: { idUsuario: usuarioExistente.id },
            include: [
                {
                    model: Perfil,
                    as: 'perfis'
                }
            ]
        });

        if (!perfilUsuario || perfilUsuario.perfis.nome == 'Cliente') {
            return res.status(403).send({
                type: 'error',
                message: 'Acesso negado. Perfil de cliente não possui autorização para acessar esta rota.',
                data: null
            });
        }

        next();
    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno',
            data: error.message
        });
    }
}

export default verifyPerfilForPedidoPendente;