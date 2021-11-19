import {RatesByClass} from "./dataParcer";

export function generateTable(data: RatesByClass): void {
  const container = document.getElementById('table-container')

  // destroy previous table
  container.innerHTML = '';

  const tbl = document.createElement('table');
  const tblBody = document.createElement('tbody');
  const headingRow = document.createElement('tr');

  const headingTitles = data.economy.map(item => item.name).sort().reverse() as string[];
  headingTitles.unshift('');

  headingTitles.forEach(title => {
    const heading = document.createElement('th');
    const headingTitle = document.createTextNode(title);
    heading.appendChild(headingTitle);
    headingRow.appendChild(heading);
  });
  tblBody.appendChild(headingRow);

  // create nested array with data for rows
  const dataMatrix = [];
  const _data = {...data};
  Object.values(_data).forEach(hotelClass => hotelClass.sort((a, b) => b.name > a.name && 1 || -1))
  for (let key of Object.keys(_data)) {
    let row = [];
    row.push(key.substring(0, 1).toUpperCase().concat(key.substring(1)));
    data[key as keyof RatesByClass].forEach(hotel => {
      let price = hotel.price === null ? 'N/A' : `${hotel.price} ${hotel.currency}`;
      row.push(price)
    });
    dataMatrix.push(row);
  }

  for (let i = 0; i < dataMatrix.length; i++) {
    const row = document.createElement('tr');

    for (let j = 0; j < dataMatrix[0].length; j++) {
      const cell = document.createElement('td');
      const cellText = document.createTextNode(dataMatrix[i][j]);

      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    tblBody.appendChild(row);
  }

tbl.appendChild(tblBody);
container.appendChild(tbl);
}
