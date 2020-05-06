//Vars
var cardsElement = document.querySelector('.cards');
let apartments = {};

//Colect data  from API
async function getData(url = '', data = {}) {
  const response = await fetch(url, {});
  return response.json(); // parses JSON response into native JavaScript objects
}

getData('https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72', {})
  .then(data => {
    console.log(data); // JSON data parsed by `response.json()` call
    apartments = data;
    renderCards (apartments);
  });

  //Monting cards

  function renderCards(apartments) {
    cardsElement.innerHTML = '';
    
        for (apartment of apartments) {
            var cardElement = document.createElement('div');
            cardElement.setAttribute('class', 'card');

            var cardHorizontalElement = document.createElement('div');
            cardHorizontalElement.setAttribute('class', 'card-horizontal');

            var imgSquareWrapperElement = document.createElement('div');
            imgSquareWrapperElement.setAttribute('class', 'img-square-wrapper');

            var imgElement = document.createElement('img');
            imgElement.setAttribute('src', apartment.photo);
            imgElement.setAttribute('class', 'img-fluid');

            imgSquareWrapperElement.appendChild(imgElement);

            var bodyElement = document.createElement('div');
            bodyElement.setAttribute('class', 'card-body');

            var cardTitleElement = document.createElement('h5');
            cardTitleElement.setAttribute('class', 'card-title');
            var cardTitleElementText = document.createTextNode(apartment.name);
            cardTitleElement.appendChild(cardTitleElementText);

            var propertyTypeElement = document.createElement('p');
            propertyTypeElement.setAttribute('class', 'card-text');
            var propertyTypeElementText = document.createTextNode('Tipo de propriedade: ' + apartment.property_type);
            propertyTypeElement.appendChild(propertyTypeElementText);

            var priceElement = document.createElement('p');
            priceElement.setAttribute('class', 'card-text');
            var priceElementElementText = document.createTextNode('Preço da diária: $' + apartment.price);
            priceElement.appendChild(priceElementElementText);

            bodyElement.appendChild(cardTitleElement);
            bodyElement.appendChild(propertyTypeElement);
            bodyElement.appendChild(priceElement);
    
            //Apends

            cardHorizontalElement.appendChild(imgSquareWrapperElement);
            cardHorizontalElement.appendChild(bodyElement);

            cardElement.appendChild(cardHorizontalElement);
    
    
            cardsElement.appendChild(cardElement);
        }
    }

    /**
     <div class="card">*
            <div class="card-horizontal">*

              <div class="img-square-wrapper">
              </div>

              <div class="card-body">
              </div>

            </div>
          </div>
     */