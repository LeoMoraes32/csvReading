import { Request, Response, Router } from 'express';
import { Readable } from 'stream';
import readline from 'readline';
import multer from 'multer';

const multerConfig = multer();
const router = Router();

router.post('/clients', multerConfig.single("file"), async (request: Request, response: Response) => {
    const buffer = request.file?.buffer;

    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    const clientsLine = readline.createInterface({
        input: readableFile
    })
    let result = [];
    for await (let line of clientsLine){
        const clientLineSplit = line.split(';')
        result.push({
            Nome_do_cliente: clientLineSplit[0],
            Codigo_SAP: clientLineSplit[1],
            //Grupo_de_Clientes: clientLineSplit[2],
            //Organizacao_de_Vendas: clientLineSplit[3],
            //Setor_de_Vendas_Regional: clientLineSplit[4],
            //Rotulo_de_territorio: clientLineSplit[5],
            //Data_da_ultima_compra: clientLineSplit[6],
            Email: clientLineSplit[8],
            Telefone: clientLineSplit[7],
            //CNPJ: clientLineSplit[9],
            CPF: clientLineSplit[10],
        })
    }
    return response.send({statusCode: 200, clients: result});
})

export { router };