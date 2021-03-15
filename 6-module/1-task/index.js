/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement("table");
    this.rows = rows;
    this.render();
  }
  
  render() {
    this.thead = document.createElement("thead");
    this.thead.insertAdjacentHTML("afterbegin", "<tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr>");
    this.elem.createTBody();

    for (const row of this.rows) {
      let curRow = document.createElement("tr");
      
      for (const key in row) {
        if (Object.hasOwnProperty.call(row, key)) {
          curRow.insertAdjacentHTML("afterbegin", `<td>${row[key]}</td>`);
        }
      }
      
      curRow.insertAdjacentHTML("beforeend", "<td><button>X</button></td>");
      this.elem.tBodies[0].appendChild(curRow);
    }
    
    this.elem.prepend(this.thead);
    this.addDeleteEvent();
  }

  addDeleteEvent() {
    const buttons = this.elem.querySelectorAll("button");
    for (const button of buttons) {
      button.addEventListener("click", (event) => {
        const rowToDelete = event.target.parentNode.parentNode;
        rowToDelete.parentNode.removeChild(rowToDelete);
      })
    }
  }
}
