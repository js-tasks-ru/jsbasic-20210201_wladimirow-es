function getMinMax(str) {
  let result = {};
  let separetedArray = str.split(',').join(' ').split(' ');
  let numbers = separetedArray.filter(value => Number.isFinite(+value));
  
  result.max = Math.max(...numbers);
  result.min = Math.min(...numbers);
  
  return result;
}
