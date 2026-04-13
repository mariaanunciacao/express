import Perfil from "../models/PerfilModel.js";

//GET ALL
const get = async (req, res) => {
    try {
        const dados = await Perfil.findAll();

        return res.status(200).send({
            type: 'success',
            message: 'Perfis encontrados',
            data: dados
        });

    } catch (error) {

        res.status(500).send({
            type: 'error',
            message: 'Ocorreu um erro',
            data: error.message
        });

    }
}

//GET BY ID
const getById = async (req, res) => {
    try {
        const { id } = req.params;
        //se o id for all retorna todos os elementos da tabela
        if(id === 'all') {
            const dados = await Perfil.findAll();

            return res.status(200).send({
                type: 'success',
                message: 'Perfis encontrados',
                data: dados
            });
        }
        const dados = await Perfil.findByPk(id);
        
        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Perfil não encontrado',
                data: null
            });
        }
        return res.status(200).send({
            type: 'success',
            message: 'Perfil encontrado',
            data: dados
        });

    } catch (error) {

        res.status(500).send({
            type: 'error',
            message: 'Ocorreu um erro',
            data: error.message 
        });

    }
}

export default {
    get,
    getById
};