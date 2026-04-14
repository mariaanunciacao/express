import pessoaController from "../controllers/pessoaController.js";
import verifyTokenPerfilForGetPessoas from "../middlewares/verifyTokenPerfilForGetPessoas.js";

export default (app) => {
    app.delete('/pessoa/delete/:id', pessoaController.destroy);
    app.patch('/pessoa/update/:id', pessoaController.update);
    app.post('/pessoa/create', pessoaController.create);
    app.get('/pessoa/get-all', verifyTokenPerfilForGetPessoas, pessoaController.get);
    app.get('/pessoa/get/:id', pessoaController.getById);
}
