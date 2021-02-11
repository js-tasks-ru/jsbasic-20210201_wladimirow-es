/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
  let result = 0;
    for (const prop in salaries) {
      if (isFinite(salaries[prop]) && !isNaN(salaries[prop])) {
        result += salaries[prop];
      }
    }
  return result;
}
