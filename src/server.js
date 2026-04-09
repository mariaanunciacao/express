import 'dotenv/config';
import express from 'express'
import routes from './routes/index.js'
import './models/index.js'

const app = express();

app.use(express.json()); 

routes(app);

app.listen(process.env.API_PORT, () => {
    console.log('sistema rodando na porta ' + process.env.API_PORT);
})