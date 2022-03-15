import chalk from 'chalk';
import fs from 'fs';
import path from 'path'
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

function linkExtract(text) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$\s].[^\s]*)\)/gm
    const result = []
    let temp
    while ((temp = regex.exec(text)) !== null) {
        result.push({ [temp[1]]: temp[2] })        
    }
    return result.length === 0 ? 'there is no link' : result
}

function errorHandler(error) {
    throw new Error(chalk.red(error.code, 'there is no file in the path'))
}

async function getFile(caminhoDoArquivo) {
    const encoding = 'utf-8';
    try {
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        return linkExtract(texto);
    } catch(error) {
        errorHandler(error);
    }
  }


// async function getFile (p){
//     const absolutePath = path.join(__dirname, '.', p)
//     const enconding = 'utf-8'
//     try {
//         const files = await fs.promises.readdir(absolutePath, { enconding })
//         const result = await Promise.all(files.map(async (file) => {
//             const filePath = `${absolutePath}/${file}`
//             const text = await fs.promises.readFile(filePath, enconding)
//             return linkExtract(text)
//         }))
//         return result   
//     } catch (error) {
//         errorHandler(error)
//     }
// }

// function getFile (path) {
//     const enconding = 'utf-8';
//      fs.promises
//     .readFile(path, enconding)
//     .then((data) => console.log(chalk.green(data)))
//     .catch((error) => errorHandler(error))
// }

// function getFile(path) {
//     const enconding = 'utf-8'
//     fs.readFile(path, enconding, (err, data) => {
//         if(err) {
//             errorHandler(err)
//         }
//         console.log(chalk.green(data));
//     })
// }

//getFile('./arquivos/texto1.md')

export { getFile }
