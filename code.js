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

ul.addEventListener('click', () => {
    console.log(event.target)
});


let apicall = (url) => {
    xhr.onreadystatechange = () => {
        if (xhr.status === 200 && xhr.readyState === 4) {
            const response = JSON.parse(xhr.responseText)

            let artArray = response.articles;

            artArray.map(item => {
                let li = document.createElement('li');
                li.classList.add("articles__item")
                let transbtn = document.createElement('button');
                transbtn.innerHTML = "Translate";

                transbtn.classList.add("translate-button");
                
                let title=document.createElement('span');
                title.classList.add("article__title")
               

                title.innerHTML=item.title;
                let a=document.createElement('a');
                a.appendChild(title);
                li.appendChild(a);
                a.href= item.url;
                a.classList.add("articles__anchor");
                li.appendChild(transbtn);
                ul.appendChild(li);


            });
        }
    }
    xhr.open('GET', url)
    xhr.send();

}


