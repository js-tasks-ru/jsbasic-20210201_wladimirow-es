function camelize(str) {
  let result = str.split('-');
  
  for (let i = 1; i < result.length; i++) {
    result[i] = result[i][0].toUpperCase() + result[i].substring(1);
  }
  
  return result.join('');
}
