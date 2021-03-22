// Libraries
const filesystem = require('fs');
const path = require('path');

// Services
const UtilService = require('./util.service');

/**
 * Escreve uma informação no log.
 * 
 * @param {String} message Informação a ser escrita
 * @param {String} body Corpo da requisição
 */
function info(message, body) {

    write(`[${UtilService.getDateTime()}][INFO]: ${message}`);

    if (body) {
        write(`[${UtilService.getDateTime()}][INFO]: Body: ${JSON.stringify(body)}`);
    }

    write('');
}

/**
 * Escreve um alerta no log.
 * 
 * @param {String} message Alerta a ser escrito
 */
function warn(message, body) {

    write(`[${UtilService.getDateTime()}][WARN]: ${message}`);

    if (body) {
        write(`[${UtilService.getDateTime()}][WARN]: Body: ${JSON.stringify(body)}`);
    }

    write('');
}

/**
 * Escreve um erro no log.
 * 
 * @param {String} message Erro a ser escrito 
 * @param {String} path Endepoint do erro
 * @param {Object} error Erro da requisição
 */
function error(message, path, error) {

    write(`[${UtilService.getDateTime()}][ERRO]: ${message}`);
    write(`[${UtilService.getDateTime()}][ERRO]: Path: ${path}`);

    if (error && error.stack) {

        const stack = error.stack.split('\n');

        write(`[${UtilService.getDateTime()}][ERRO]: Error: ${error.message}`);
        write(`[${UtilService.getDateTime()}][ERRO]: Stack: ${stack[0]}`);

        for (let index = 1; index < stack.length; index++) {
            write(stack[index]);
        }
    } else {
        write(`[${UtilService.getDateTime()}][ERRO]: Error: ${JSON.stringify(error)}`);
    }

    write('');
}

/**
 * Escreve uma nova linha no arquivo de log.
 * 
 * @param {String} message Mensagem a ser escrita no arquivo
 */
function write(message) {

    // A mensagem também deve ser exibida no console
    log(message);

    filesystem.appendFileSync(`${path.join(__dirname, '../../../')}/logs/${UtilService.getDate()}.txt`, `${message}\n`, (error) => {

        if (error) {
            log(error);
        }
    });
}

/**
 * Escreve uma mensagem no terminal, apenas no modo de desenvolvimento.
 * @param {String} message Mensagem a ser escrita no terminal.
 */
function log(message) {

    // if (process.env.NODE_ENV !== 'production') {
        console.log(message);
    // }
}

function writeOrders(message) {

    filesystem.appendFileSync(`${path.join(__dirname, '../../../')}/logs/${UtilService.getDate()}_Pedidos.txt`, `${message}\n`, (error) => {

        if (error) {
            log(error);
        }
    });
}

module.exports = {
    info,
    warn,
    error,
    log,
    writeOrders
};