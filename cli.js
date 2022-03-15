import chalk from 'chalk';
import { getFile } from './index.js'
import { validaURLs } from './http-validator.js';

const path = process.argv

async function textProcessor(path){
    const result = await getFile(path[2])

    if(path[3] === 'validar'){
        console.log(chalk.yellow('links validados'), await validaURLs(result))
    } else {
        console.log(chalk.yellow('lista de links'), result)
    }
}

textProcessor(path)