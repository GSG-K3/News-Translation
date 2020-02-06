let menu = document.getElementById("search__menu")
let search = document.getElementById("search__button")
let ul = document.querySelector(".articles__list");

let xhr = new XMLHttpRequest;

// Get APIs
let apicall = (url, callback) => {
    xhr.onreadystatechange = () => {
        if (xhr.status === 200 && xhr.readyState === 4) {
            const response = JSON.parse(xhr.responseText)
            if (callback) {
                callback(response);
            }
        }
    }
    xhr.open('GET', url)
    xhr.send();

}

// Search function
search.addEventListener('click', () => {
    let countryCode = menu.value;
    let url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=626633f093cd40b7bda4ca1a94cc2b89`

    // to remove previous list items from the list 
    let child = ul.lastElementChild;
    while (child) {
        ul.removeChild(child);
        child = ul.lastElementChild;
    }

    //  Call News API
    apicall(url, (response) => {

        let artArray = response.articles;
        artArray.map(item => {

            let li = document.createElement('li');
            li.classList.add("articles__item")

            let title = document.createElement("span");
            title.innerHTML = item.title;
            title.classList.add("article__title")

            let description = document.createElement("span");
            description.innerHTML = item.description;
            description.classList.add("article__description")

            let anchor = document.createElement('a');
            anchor.href = item.url;
            anchor.appendChild(title);
            anchor.classList.add("articles__anchor");

            let translateBtn = document.createElement('button');
            translateBtn.innerHTML = "Translate";
            translateBtn.classList.add("translate-button");
            if (menu.value == "eg" || menu.value == "ma" || menu.value == "ae") translateBtn.style.display = "none"
            li.appendChild(anchor);
            li.appendChild(description)
            li.appendChild(translateBtn);
            ul.appendChild(li);

            // Call Translate API
            translateBtn.addEventListener("click", () => {
                let url2 = "https://translate.yandex.net/api/v1.5/tr.json/translate" +
                    "?key=trnsl.1.1.20200204T203412Z.4c3799296843dd33.06f6e271e121e6ebd8428ff4fbab8ad1e1fa3a32" +
                    "&text=" + item.title + "&text=" + item.description +
                    "&lang=ar";

                apicall(url2, (response) => {
                    title.innerText = response.text[0];
                    description.innerText = response.text[1];

                })
            })
        })
    })
});


