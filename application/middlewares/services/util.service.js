/* eslint-disable no-fallthrough */
const currencyFormatter = require('currency-formatter');
const moment = require('moment');
require('moment-precise-range-plugin');
/**
 * Retorna a data informada sem incluir horas, minutos e segundos.
 * Caso não seja informada uma data, será retornada a data atual.
 * Formato 1: yyyy-mm-dd
 * Formato 2: dd/mm/yyyy
 *
 * @param {Date} date Data a ser tratada.
 * @param {Number} type Tipo de formato a ser retornado
 */
function getDate(date, type) {

  if (!date) {
    date = new Date();
  } else {

    if (typeof (date) === 'string') {

      const format = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

      // Quando a data estiver no formato dd/mm/yyyy, não é possível utilizar
      // o construtor do new Date() para criar a data esperada
      if (date.match(format)) {

        date = new Date(date);
      } else {

        const elements = date.split('/');

        date = new Date(`${elements[2]}-${elements[1]}-${elements[0]}`);

        // TODO: Verificar melhor forma de corrigir UTC
        date = new Date(date.setHours(date.getHours() + 3));
      }
    }
  }

  let result;

  switch (type) {
    case 2:
      result = `${("0" + date.getDate()).slice(-2)}/${("0" + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
      break;

    default:
      result = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
      break;
  }

  return result;
}

/**
 * Retorna a data informada incluindo horas, minutos e segundos.
 * Caso não seja informada uma data, será retornada a data atual.
 * Formato: yyyy-mm-dd hh:mm:ss
 *
 * @param {Date} date Data a ser tratada.
 */
function getDateTime(date, type) {

  if (!date)
    date = new Date();

  return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${("0" + date.getSeconds()).slice(-2)}`;
}

/**
 * Retorna um valor formatado para a moeda indicada
 *
 * @param {Number} value Valor a ser tratad
 * @param {String} currency Moeda
 */
function getMoney(value, currency) {
  return currencyFormatter.format(value, { code: currency });
}

/**
 * Verifica se a data informada está inclusa nas últimas 24 horas
 *
 * @param {Date} date Data que deseja verificar
 */
function check24Hours(date) {

  // Obtendo timestamp atual
  const current = Math.round(new Date().getTime() / 1000);

  // Obtendo timestamp das últimas 24 horas
  const yesterday = current - (24 * 3600);

  // Verificando se a data informada está inclusa nas últimas 24 horas
  return date >= new Date(yesterday * 1000).getTime();
}

function checkDateDifference(lastDate, expectedDifference) {

  let expectedMonthsDifference = null;
  let expectedDaysDifference = 0;

  switch (expectedDifference) {
    case 'WEEKLY':
      // eslint-disable-next-line no-unused-vars
      expectedDaysDifference = 8;
    case 'MONTHLY':
      expectedMonthsDifference = 1;
      break;
    case 'BIMONTHLY':
      expectedMonthsDifference = 2;
      break;
    case 'QUARTERLY':
      expectedMonthsDifference = 3;
      break;
    case 'BIANNUAL':
      expectedMonthsDifference = 6;
      break;
    case 'ANNUAL':
      expectedMonthsDifference = 11;
      break;
    /* default:
        expectedMonthsDifference = 0;
        break; */
  }

  if (expectedDifference === 'WEEKLY') {

    const today = new Date();
    const newDate = new Date();
    newDate.setDate(today.getDate() - 8);

    if (newDate.getDate() >= lastDate.getDate()) {
      return true;
    } else {
      return false;
    }
  }

  const timeDifference = moment.preciseDiff(new Date().setHours(0, 0, 0, 0), lastDate.setHours(0, 0, 0, 0), true);

  if (expectedDifference === 'ANNUAL') {
    if (timeDifference.years >= 1) {
      return true;
    } else {
      return false;
    }
  }

  if (timeDifference.months >= expectedMonthsDifference) {
    return true;
  }

  return false;
}



module.exports = {
  getDate,
  getDateTime,
  getMoney,
  check24Hours,
  checkDateDifference
};
