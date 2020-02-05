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


let apicall = (url, callback) => {
    xhr.onreadystatechange = () => {
        if (xhr.status === 200 && xhr.readyState === 4) {
            const response = JSON.parse(xhr.responseText)
            if (callback) {
                callback(response);
                return;
            }
            let artArray = response.articles;
        

            artArray.map(item => {
                let li = document.createElement('li');

                let title = document.createElement("span");
                title.innerHTML = item.title;

                let description = document.createElement("span");
                description.innerHTML = item.description;

                let btn=document.createElement('button');
                btn.classList.add("translate-btn");
                btn.innerHTML="Translate";
                
                li.appendChild(title)
                li.appendChild(description)

                li.appendChild(btn);

                ul.appendChild(li);
                btn.addEventListener("click", () =>{
                    let url2 ="https://translate.yandex.net/api/v1.5/tr.json/translate" + 
                    "?key=trnsl.1.1.20200204T203412Z.4c3799296843dd33.06f6e271e121e6ebd8428ff4fbab8ad1e1fa3a32"+
                    "&text="+ item.description +
                    "&lang=ar"

                    apicall(url2, (response)=>{

                        description.innerText = response.text[0];

                    })
                })

            
            });
        }
    }
    xhr.open('GET', url)
    xhr.send();

}


