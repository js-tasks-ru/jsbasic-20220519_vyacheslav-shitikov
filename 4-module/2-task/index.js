function makeDiagonalRed(table) {
  let getTable = document.body.firstElementChild;
  for (let i = 0; i < getTable.rows.length; i++) {
    let row = table.rows[i];
    row.cells[i].style.backgroundColor = 'red';
  }
}
