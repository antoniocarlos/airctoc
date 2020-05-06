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
            var h1Element = document.createElement('h1');
            var h1Text = document.createTextNode(apartment.name);
    
            //var linkElement = document.createElement('a');
    
            //linkElement.setAttribute('href', '#');
    
            //var pos = todos.indexOf(todo);
            //linkElement.setAttribute('onclick', 'deleteTodo(' + pos + ')');
    
            //var linkText = document.createTextNode('Excluir');
    
            //linkElement.appendChild(linkText);
    
            h1Element.appendChild(h1Text);
    
            cardsElement.appendChild(h1Element);
        }
    }