function highlight(table) {
  let rows = table.rows;
  
  for (let i = 1; i < rows.length; i++) {

    if (rows[i].cells[3].getAttribute('data-available') === 'true') {
      rows[i].classList.add('available');
    } else if (rows[i].cells[3].getAttribute('data-available') === 'false') {
      rows[i].classList.add('unavailable');
    } else {
      rows[i].setAttribute('hidden', 'true');
    }
    
    if (rows[i].cells[2].innerHTML == 'm' ){
      rows[i].classList.add('male');
    } else {
      rows[i].classList.add('female');
    }

    if (rows[i].cells[1].innerHTML < 18) {
      rows[i].style.textDecoration = 'line-through';
    }
    
  }
}
