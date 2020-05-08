//Vars
let apartments = {};
let apartmentsInUse = {}
let page = 0;
let limitPerPage = 5;
let daysOfStay = 1;

//Monting cards
var cardsElement = document.querySelector('.cards');
function renderCards(apartments, page, limitPerPage) {
  cardsElement.innerHTML = '';

  for (let i = page * limitPerPage; i < (page + 1) * limitPerPage; i++) {
    if (apartments[i]) {
      var cardElement = document.createElement('div');
      cardElement.setAttribute('class', 'card');

      var cardHorizontalElement = document.createElement('div');
      cardHorizontalElement.setAttribute('class', 'card-horizontal');

      var imgSquareWrapperElement = document.createElement('div');
      imgSquareWrapperElement.setAttribute('class', 'img-square-wrapper');

      var imgElement = document.createElement('img');
      imgElement.setAttribute('src', apartments[i].photo);
      imgElement.setAttribute('class', 'img-fluid');

      imgSquareWrapperElement.appendChild(imgElement);

      var bodyElement = document.createElement('div');
      bodyElement.setAttribute('class', 'card-body');

      var cardTitleElement = document.createElement('h5');
      cardTitleElement.setAttribute('class', 'card-title');
      var cardTitleElementText = document.createTextNode(apartments[i].name);
      cardTitleElement.appendChild(cardTitleElementText);

      var propertyTypeElement = document.createElement('p');
      propertyTypeElement.setAttribute('class', 'card-text');
      var propertyTypeElementText = document.createTextNode("Tipo de propriedade: " + apartments[i].property_type);
      propertyTypeElement.appendChild(propertyTypeElementText);

      let valuePriece = apartments[i].price

      var priceElement = document.createElement('p');
      priceElement.setAttribute('class', 'card-text');
      var priceElementElementText = document.createTextNode("Preço da diária: $" + valuePriece);
      priceElement.appendChild(priceElementElementText);


      var totalPriceElement = document.createElement('p');
      totalPriceElement.setAttribute('class', 'card-text');
      var totalPriceElementText = document.createTextNode(`Preço total: $${valuePriece * daysOfStay}`);
      totalPriceElement.appendChild(totalPriceElementText);

      bodyElement.appendChild(cardTitleElement);
      bodyElement.appendChild(propertyTypeElement);
      bodyElement.appendChild(priceElement);
      bodyElement.appendChild(totalPriceElement);

      //Appends

      cardHorizontalElement.appendChild(imgSquareWrapperElement);
      cardHorizontalElement.appendChild(bodyElement);

      cardElement.appendChild(cardHorizontalElement);


      cardsElement.appendChild(cardElement);
    }
  }
}



//pagination
var luElement = document.querySelector('#pagination_nav ul');

function dealWithPage(pageToGo) {
  page = pageToGo;
  renderCards(apartmentsInUse, page, limitPerPage);
  renderPagination(page, apartmentsInUse.length / limitPerPage);
}

//Itens per page
var selectItensPerPageElement = document.querySelector('#selectPagination');
selectItensPerPageElement.onchange = handleItensPerPage;

function handleItensPerPage() {
  page = 0;
  limitPerPage = selectItensPerPageElement.value;
  dealWithPage(page);
}

function renderPagination(page, total) {
  luElement.innerHTML = '';
  for (let i = 0; i < total; i++) {
    if (i == page) {
      var liElement = document.createElement('li');
      liElement.setAttribute('class', 'page-item active');
    } else {
      var liElement = document.createElement('li');
      liElement.setAttribute('class', 'page-item');
    }

    var aElement = document.createElement('a');
    aElement.setAttribute('class', 'page-link');
    aElement.setAttribute('href', '#');

    aElement.setAttribute('onclick', 'dealWithPage(' + i + ')');

    let id = i;

    var linkText = document.createTextNode(id + 1);
    aElement.appendChild(linkText);

    liElement.appendChild(aElement);
    luElement.appendChild(liElement);
  }
}

//Search bar
var buttonElement = document.querySelector('#searchButton');
buttonElement.onclick = search;

var selectElement = document.querySelector('#select');

function search() {
  let interApartments = [];

  if(selectElement.value.includes("Todas as localidades")){
    
    apartmentsInUse = apartments;

  }else{
    for(apartment of apartments){
      if(apartment.location.includes(selectElement.value)){
        interApartments.push(apartment);
      }
    }
    apartmentsInUse = interApartments;
  }
  page = 0;
  renderCards(apartmentsInUse, page, limitPerPage);
  renderPagination(page, apartmentsInUse.length / limitPerPage);
}

//Price Update
function priceUpdate(days) {
  daysOfStay = days;
  renderCards(apartmentsInUse, page, limitPerPage)
}


//Colect data  from API
async function getData(url = '', data = {}) {
  const response = await fetch(url, {});
  return response.json(); // parses JSON response into native JavaScript objects
}
//https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72

getData('https://v2-api.sheety.co/56973b30d24a379366aa02a2d61cf220/airctoc/airctoc', {})
  .then(data => {
    apartments = data.airctoc;
    apartmentsInUse = data.airctoc;
    renderCards(apartments, page, limitPerPage);
    renderPagination(page, apartments.length / limitPerPage);
  });

