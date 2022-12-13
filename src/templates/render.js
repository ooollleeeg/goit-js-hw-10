function renderList(dataArr) {
  return dataArr
    .map(data => {
      return ` 
      <li class="list-item">
        <img class="flag" src="${data.flags.svg}" alt="flag of ${data.name.common}" width="50" height="auto"/>
        <p class="country-name">${data.name.common}</p>
      </li>`;
    })
    .join('');
}

function renderCard(dataArr) {
  const { flags, name, population, capital, languages } = dataArr[0];
  const lan = Object.values(languages).join(', ');

  return `
        <div class="country-card-title">
          <img src="${flags.svg}" alt="flag of ${name.common}" width="75" height="auto" class="card-flag"/>
          <p>${name.official}</p>
        </div>
        <ul class="country-card-data">
          <li><p><span>Capital: </span>${capital}</p></li>
          <li><p><span>Population: </span>${population}</p></li>
          <li><p><span>Languages: </span>${lan}</p></li>
        </ul>
        `;
}
export { renderList, renderCard };
