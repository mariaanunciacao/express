import { type } from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

export default async (file, parametros) => {
    try{
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        let extensao = path.extname(file.name);
        let filepath = `public/${parametros.tabela}/${parametros.tipo}/${parametros.id}${extensao}`;
        let uploadPath = `${__dirname}/../../${filepath}`;

        await file.mv(uploadPath);
        return {
            type: 'success',
            message: 'Upload feito com sucesso',
            path: filepath
        }

    } catch(error) {
        throw new Error(error.message);
    }
}