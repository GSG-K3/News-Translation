let menu = document.getElementById("search-section__menu")
let search = document.getElementById("search-section__button")
let countryCode;

search.addEventListener('click', () =>{
     countryCode = menu.value;
    console.log(countryCode)
})


var url = `https://newsapi.org/v2/top-headlines?' +
          'country=${countryCode}&' +
          'apiKey=626633f093cd40b7bda4ca1a94cc2b89`;

