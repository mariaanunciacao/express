import Restaurante from '../models/RestauranteModel.js';

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://places.googleapis.com/v1/places:searchNearby',
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress'
    }
});

const searchNearby = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;

        if (latitude === undefined || longitude === undefined) {
            return res.status(400).send({
                type: 'error',
                message: 'Latitude e longitude são obrigatórias',
                data: null
            });
        }

        const lat = Number(latitude);
        const lng = Number(longitude);

        if (isNaN(lat) || isNaN(lng)) {
            return res.status(400).send({
                type: 'error',
                message: 'Latitude e longitude devem ser números válidos',
                data: null
            });
        }

        const response = await api.post('', {
            includedTypes: ['restaurant'],
            maxResultCount: 10,
            locationRestriction: {
                circle: {
                    center: {
                        latitude: lat,
                        longitude: lng
                    },
                    radius: 1500.0
                }
            }
        });

        return res.status(200).send({
            type: 'success',
            message: 'Restaurantes próximos encontrados',
            data: response.data
        });

    } catch (error) {
        console.log(error.response?.data || error.message);

        return res.status(500).send({
            type: 'error',
            message: 'Erro ao buscar restaurantes',
            data: error.response?.data || error.message
        });
    }
};

//GET ALL
const get = async (req, res) => {
    try {
        const dados = await Restaurante.findAll();

        return res.status(200).send({
            type: 'sucess',
            message: 'Restaurantes encontrados',
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
            const dados = await Restaurante.findAll();

            return res.status(200).send({
                type: 'success',
                message: 'Restaurantes encontrados',
                data: dados
            });
        }
        const dados = await Restaurante.findByPk(id);
        
        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Restaurante não encontrado',
                data: null
            });
        }
        return res.status(200).send({
            type: 'success',
            message: 'Restaurante encontrado',
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

//POST
const create = async (req, res) => {
    try {
        const {
            cnpj,
            nome_restaurante,
            horario_atendimento,
            tempo_entrega,
            idCupom,
        } = req.body;

        if(nome_restaurante === undefined || nome_restaurante === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo nome_restaurante não preenchido',
                data: null
            });
        }

        if(cnpj === undefined || cnpj === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo cnpj não preenchido',
                data: null
            });
        }

        if(horario_atendimento === undefined || horario_atendimento === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo horario_atendimento não preenchido',
                data: null
            });
        }

        if(tempo_entrega === undefined || tempo_entrega === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo tempo_entrega não preenchido',
                data: null
            });
        }

        if(idCupom === undefined || idCupom === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo idCupom não preenchido',
                data: null
            });
        }

        const retorno = await Restaurante.create({
            cnpj,
            nome_restaurante,
            horario_atendimento,
            tempo_entrega,
            idCupom,
        });

        return res.status(201).send({
            type: 'success',
            message: 'Restaurante criado',
            data: retorno
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            type: 'error',
            message: 'Ocorreu um erro',
            data: error.message 
        });
    }
}

//DELETE
const destroy = async (req, res) => {
    try {
        const { id } = req.params;
    
        const dados = await Restaurante.findByPk(id);

        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Restaurante não encontrado',
                data: []
            });
        }

        await dados.destroy();

        return res.status(200).send({
            type: 'success',
            message: 'Restaurante excluído',
            data: []
        });
        
    } catch (error) {

        console.log(error.message);
        res.status(500).send({
            type: 'error',
            message: 'Ocorreu um erro',
            data: error.message 
        });

    }

}

//PATCH BY ID
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const requisicao = req.body;
        const dados = await Restaurante.findByPk(id);
        const camposPermitidos = ['cnpj', 'nome_restaurante', 'horario_atendimento', 'tempo_entrega', 'idCupom'];

        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Restaurante não encontrado',
                data: []
            });
        }

        const camposInvalidos = Object.keys(requisicao).filter(campo => !camposPermitidos.includes(campo));

        if(camposInvalidos.length > 0) {
            return res.status(400).send({
                type: 'error',
                message: 'Campos inválidos para atualização',
                data: camposInvalidos
            });
        }
        
        Object.keys(requisicao).forEach(campo => dados[campo] = requisicao[campo]);
        await dados.save();

        return res.status(200).send({
            type: 'success',
            message: 'Restaurante atualizado',
            data: dados
        });

    } catch (error) {

        console.log(error.message);
        res.status(500).send({
            type: 'error',
            message: 'Ocorreu um erro',
            data: error.message 
        });

    }
}
export default {
    get,
    create,
    getById,
    destroy,
    update,
    searchNearby
}
