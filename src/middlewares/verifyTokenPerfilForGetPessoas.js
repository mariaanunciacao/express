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

//somende administradores e gerentes podem acessar a lista de pessoas
const verifyTokenPerfilForGetPessoas = async(req, res, next) =>{
    try{

        const token = getAuthToken(req.headers.authorization);

        if(!token){
            return res.status(403).send({
                type: 'error',
                message: 'Usuario nao identificado',
                data: null
            });
        }
        //jwt.verify é uma função da biblioteca jsonwebtoken que verifica a assinatura do token
        const usuario = jwt.verify(token, process.env.JWT_SECRET || 'secret')

        const usuarioExistente = {
            id: usuario.id,
            email: usuario.email,
            nome: usuario.nome
        };

        const perfilUsuario = await UsuarioPerfil.findOne({
            where: { idUsuario: usuarioExistente.id },
            include: [
                {
                    model: Perfil,
                    as: 'perfis'
                }
            ]
        });

        if((!perfilUsuario || perfilUsuario.perfis.nome == 'Cliente') || (!perfilUsuario || perfilUsuario.perfis.nome == 'Entregador')){
            return res.status(403).send({
                type: 'error',
                message: 'Acesso negado. Este perfil não possui autorização para acessar esta rota.',
                data: null
            });
        }


        next();
    }catch {
        res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro!',
            data: error.message
        });
    }
}

export default verifyTokenPerfilForGetPessoas;
