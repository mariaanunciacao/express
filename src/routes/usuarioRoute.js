import usuarioController from '../controllers/usuarioController.js';

export default (app) => {
    app.post('/usuario/login', usuarioController.login);
    app.post('/usuario/register', usuarioController.register);
}