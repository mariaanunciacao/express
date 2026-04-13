import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/UsuarioModel.js';

const getAuthToken = (authorization) => {
    if (!authorization) {
        return null;
    }

    const [scheme, value] = authorization.split(' ');
    return value ? value : scheme;
};

const register = async (req, res) => {
    try {
        const { email, nome, password } = req.body;

        if (email === undefined || email === null || email === '') {
            return res.status(400).send({
                type: 'error',
                message: 'Campo email não preenchido',
                data: null
            });
        }

        if (nome === undefined || nome === null || nome === '') {
            return res.status(400).send({
                type: 'error',
                message: 'Campo nome não preenchido',
                data: null
            });
        }

        if (password === undefined || password === null || password === '') {
            return res.status(400).send({
                type: 'error',
                message: 'Campo password não preenchido',
                data: null
            });
        }

        const usuarioExistente = await Usuario.findOne({
            where: { email }
        });

        if (usuarioExistente) {
            return res.status(400).send({
                type: 'error',
                message: 'Usuário já existe',
                data: null
            });
        }
        //bcrypt.hash função da biblioteca bcrypt que transforma a senha (ex: "123456") em uma sequência confusa de caracteres (o "hash")
        const passwordHash = await bcrypt.hash(password, 10);

        const usuario = await Usuario.create({
            email,
            nome,
            passwordHash
        });

        return res.status(201).send({
            type: 'success',
            message: 'Usuário criado com sucesso',
            data: {
                id: usuario.id,
                email: usuario.email,
                nome: usuario.nome
            }
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ocorreu um erro',
            data: error.message
        });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === undefined || email === null || email === '') {
            return res.status(400).send({
                type: 'error',
                message: 'Campo email não preenchido',
                data: null
            });
        }

        if (password === undefined || password === null || password === '') {
            return res.status(400).send({
                type: 'error',
                message: 'Campo password não preenchido',
                data: null
            });
        }

        const usuario = await Usuario.findOne({
            where: { email }
        });

        if (!usuario) {
            return res.status(400).send({
                type: 'error',
                message: 'Usuário ou senha não encontrado',
                data: null
            });
        }

        const senhaValida = await bcrypt.compare(password, usuario.passwordHash);

        if (!senhaValida) {
            return res.status(400).send({
                type: 'error',
                message: 'Usuário ou senha não encontrado',
                data: null
            });
        }
        //jwt.sign é a função usada para gerar um Token (o JSON Web Token) após o usuário se autenticar com sucesso
        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
                nome: usuario.nome
            },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1d' }
        );

        return res.status(200).send({
            type: 'success',
            message: 'Login realizado com sucesso',
            data: {
                id: usuario.id,
                email: usuario.email,
                nome: usuario.nome,
                token
            }
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ocorreu um erro',
            data: error.message
        });
    }
};

//envaindotoken pelo authorization header, o getUserByToken é uma função que pode ser usada para obter as informações do usuário a partir do token JWT enviado na requisição. Ele decodifica o token e retorna os dados do usuário contidos nele.
const getUserByToken = async (req, res) => {
    try {
        const token = getAuthToken(req.headers.authorization);

        if (!token) {
            return res.status(401).send({
                type: 'error',
                message: 'Token não identificado',
                data: null
            });
        }

        const resposta = jwt.verify(token, process.env.JWT_SECRET || 'secret');

        return res.json({
            data: resposta
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ocorreu um erro',
            data: error.message
        });
    }
};

export default {
    register,
    login,
    getUserByToken,
};
