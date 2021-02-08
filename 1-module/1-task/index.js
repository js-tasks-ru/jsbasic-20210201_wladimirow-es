/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  if (n == 0 || n == 1) {
    return 1;
  }

  let result = n;
  for (let index = n - 1; index > 0; index--) {
    result *= (n - index);
  }
  return result;
}
