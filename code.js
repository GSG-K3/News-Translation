let menu = document.getElementById("search-section__menu")
let search = document.getElementById("search-section__button")
let countryCode;
let li=document.createElement('li');
let ul=document.getElementsByClassName("topic-item");


search.addEventListener('click', () =>{
    let countryCode = menu.value;
    let xhr = new XMLHttpRequest;
    

    xhr.onreadystatechange = () => {
        if (xhr.status === 200 && xhr.readyState === 4) {
            const response = JSON.parse(xhr.responseText)
            console.log(response)
        }
    }
    
    var url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=626633f093cd40b7bda4ca1a94cc2b89`
         console.log(url)

    xhr.open('GET', url)
    xhr.send();
})



apicall(url, (response) => {
    apicall(response.title, (response) => {
        console.log(response[0].title);
    });
});