let menu = document.getElementById("search__menu")
let search = document.getElementById("search__button")
let countryCode;
let ul = document.querySelector(".articles__list");
let xhr = new XMLHttpRequest;


search.addEventListener('click', () => {
    let countryCode = menu.value;
    var url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=626633f093cd40b7bda4ca1a94cc2b89`

    var child = ul.lastElementChild;
    while (child) {
        ul.removeChild(child);
        child = ul.lastElementChild;
    }

    apicall(url)

})


let apicall = (url) => {
    xhr.onreadystatechange = () => {
        if (xhr.status === 200 && xhr.readyState === 4) {
            const response = JSON.parse(xhr.responseText)

            let artArray = response.articles;

            artArray.map(item => {
                let li = document.createElement('li');
                let btn=document.createElement('button');
                btn.innerHTML="Translate";
                li.innerHTML = item.title;
                li.appendChild(btn); 
                ul.appendChild(li);


            });
        }
    }
    xhr.open('GET', url)
    xhr.send();

}


