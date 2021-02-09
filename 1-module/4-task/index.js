/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  let check = str.toLowerCase();
  if (check.includes('1xbet') || check.includes('xxx')) {
    return true;
  } else return false;
}
