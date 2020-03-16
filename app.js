const nav = document.querySelector('.nav')
const navRight = document.querySelector('.nav-right')
const navRightImg = document.querySelector('.nav-right img')
const navRightSpan = document.querySelector('.nav-right span')
const homepage = document.querySelector('.homepage')
const country = document.querySelector('.country')
const containerCards = document.querySelector('.container-cards')
const input = document.querySelector('input')
const form = document.querySelector('form');
var cards;
var search;
var code;


// -------------------------------mutilple countries----------------------------




index(`all`);

function onchanged(rgn) {
    containerCards.innerHTML = ''
    index(`region/${rgn}`);
}

function index(allOrRegion) {
    fetch(`https://restcountries.eu/rest/v2/${allOrRegion}`)
        .then(res => {
            if (res.status === 404) {
                containerCards.innerHTML = `<div style="font-size:30px; font-weight:600px; text-align:center;">No Results Found</div>`
                return res.status
            }
            return res.json()
        })
        .then(resJson => {
            for (var i = 0; i < resJson.length; i++) {
                const card = document.createElement('div')
                card.innerHTML = `<div class="flag"><img src="${resJson[i].flag}" id='${resJson[i].name}'style="width:250px; height:150px;"></div>
                                <div class = "content" style="margin-top:10px;margin-left:10px;width:230px; height:180px; word-wrap:break-word">
                                    <p style="font-size:19px; font-weight:700;">${resJson[i].name}</p>
                                    <p style="font-size:17px; font-weight:500;">Population : ${resJson[i].population}</p>
                                    <p style="font-size:17px; font-weight:500;">Region     : ${resJson[i].region}</p>
                                    <p style="font-size:17px; font-weight:500;">Capital    : ${resJson[i].capital}</p>
                        </div>`
                card.className = "card";
                containerCards.insertAdjacentElement("beforeend", card)
            }
            var cards = document.getElementsByClassName('card')
            if (nav.className === "nav dark-mode-others") {
                for (var i = 0; i < cards.length; i++) {
                    var card = cards[i]
                    card.classList.toggle("dark-mode-others");
                }
            }
        })
}


// ------------------------------------single country------------------------------



containerCards.addEventListener("click", (event) => {
    event.preventDefault();
    search = event.target.id;
    var z = `name/${search}`
    if (isNaN(search)) countryName(z);
})

form.addEventListener('submit', function (event) {
    event.preventDefault();
    search = input.value;
    var z = `name/${search}`
    countryName(z)
})

function countryCode(x) {
    var z = `alpha/${x}`
    country.innerHTML = ''
    countryName(z);
}

function countryName(searchOrClick) {
    fetch(`https://restcountries.eu/rest/v2/${searchOrClick}`)
        .then((res) => {
            if (res.status === 404) {
                homepage.innerHTML = ` <span  class="back" style="position:relative;left:100px"><img src="back.png" height=20px>Back</span><div style="font-size:30px; font-weight:600px; text-align:center;">No Results Found</div>`
                country.insertAdjacentElement('beforeend', countryInject)
                
                return res.status
            }
            return res.json()
        })
        .then((resJson) => {
            if (resJson.length === undefined) {
                var resJson = [(resJson)]
            }
            if (resJson.length === 1) {
                var index = 0;
            }
            else {
                for (var i = 0; i < resJson.length; i++) {
                    if (resJson[i].name.toLowerCase() === search.toLowerCase()) {
                        var index = i;
                    }
                }
            }
            var languagesArray = []

            for (var i = 0; i < resJson[index].languages.length; i++) {
                languagesArray.push(resJson[index].languages[i].name)
            }

            var bordersArray = []
            for (var i = 0; i < resJson[index].borders.length; i++) {
                bordersArray.push(`<span onclick="countryCode('${resJson[index].borders[i]}')" class="span-button" style=" border:solid 1px black; padding:2px 8px;box-shadow: 1px -1px 2px;cursor:pointer;margin-right: 10px;
                margin-left: 10px;"><tt>${resJson[index].borders[i]}</tt></span>`)
            }

            var bordersArrayJoined = bordersArray.join(' ')

            homepage.style.display = 'none'

            var countryInject = document.createElement('div');
            countryInject.innerHTML = ` <span class="back"><img src="back.png" height=20px>Back</span>
        <div class="country-card">
            <div class="country-flag"><img src="${resJson[index].flag}" height="300px" width="300px" alt=""></div>
            <div class="country-content">
                <div class="title">${resJson[index].name}</div>
                <div class="details">
                    <div class="details1"><p>Native Name : ${resJson[index].nativeName}</p>
                    <p>Population : ${resJson[index].population}</p>
                    <p>Region : ${resJson[index].region}</p>
                    <p>Sub Region : ${resJson[index].subregion}</p>
                    <p>Capital : ${resJson[index].capital}</p>
                    </div>
                    <div class="details2">
                    <p>Top Level Domain : ${resJson[index].topLevelDomain}</p>
                    <p>Currencies : ${resJson[index].currencies[0].name}</p>
                    <p>Languages : ${languagesArray}</p>
                    </div>
                </div>
                <div class="footer">
                Border Countries : ${bordersArrayJoined}
                </div>
            </div>
        </div>`

            country.insertAdjacentElement('beforeend', countryInject)
            var back = document.querySelector('.back')
            back.addEventListener('click', function () {
                homepage.style.display = 'block';
                country.innerHTML = ""
            })
        })
}

// ------------------------dark mode-------------------------------------

var toggler = false;

navRight.addEventListener('click', function () {
    document.body.classList.toggle("dark-mode-body");
    var cards = document.getElementsByClassName('card')
    nav.classList.toggle("dark-mode-others");
    input.classList.toggle("dark-mode-others");
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i]
        card.classList.toggle("dark-mode-others");
    }
    togglerImgSrc()
})

function togglerImgSrc() {
    toggler === true ? navRightImg.src = "night.png" : navRightImg.src = "sun.png";
    toggler === true ? navRightSpan.textContent = "Dark Mode" : navRightSpan.textContent = "Light Mode"
    toggler === true ? toggler = false : toggler = true;
}