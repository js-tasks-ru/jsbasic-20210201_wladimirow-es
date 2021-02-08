/**
 * ucFirst
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {
  if (!str.trim()) {
    return str;
  }

  let result = str[0].toUpperCase() + str.substr(1);
  return result;
}
