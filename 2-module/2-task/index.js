/**
 * Проверяем объект obj на пустоту
 * @param {Object} obj
 * @returns {Boolean}
 */
function isEmpty(obj) {
  let result = true;
  for (let prop in obj) {
    if (prop in obj || obj[prop] === undefined) {
      result = false;
    }
  }
  return result;
}
