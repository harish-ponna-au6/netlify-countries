var pages = [];
(async () => {
    const response = await fetch(`https://restcountries.eu/rest/v2/all`)
    const responseJson = await response.json()
    pages = [];
    renderCountries(responseJson)

})()

function renderCountries(responseData) {
    if (responseData.status === 404) {
        document.querySelector('.container-cards').innerHTML = `<div style="font-size:30px; font-weight:600px; text-align:center;">No Results Found</div>`
        return res.status
    }
    set = []
    counter = 0

    for (var i = 0; i < responseData.length; i++) {
        const card = document.createElement('div')
        card.innerHTML = `<div class="m-2 card-content" style="background-color:rgba(85, 86, 99, 0.46);color:white;min-height:406px;">
                                <img class="image-fluid" src="${responseData[i].flag}" onclick='countryClick("${responseData[i].name}")'style="width:100%;cursor:pointer">
                                <div class="m-4" style="margin-bottom:20px">
                                <p style="font-size:17px; font-weight:700;">${responseData[i].name}</p>
                                <p style="font-size:15px; font-weight:500;">Population : ${responseData[i].population}</p>
                                <p style="font-size:15px; font-weight:500;">Region     : ${responseData[i].region}</p>
                                <p style="font-size:15px; font-weight:500;">Capital    : ${responseData[i].capital}</p>
                                <br>                                
                                </div>
                                </div>
                    `
        card.className = "col-xl-3 col-lg-3 col-md-5 col-sm-10";
        counter += 1
        set.push(card)
        if (counter == 16) {
            pages.push(set)
            set = []
            counter = 0
        }
    }
    document.querySelector("#pagination").innerHTML = ''
    for (var i = 0; i < (responseData.length / 16) - 1; i++) {
        var page = document.createElement("div")
        page.innerHTML = `
        <button style="background-color:rgba(85, 86, 99, 0.46);color:white;cursor:pointer; border:grey 0.5px solid" class="m-1 rounded" onclick="allCountriesPage(${i})" >${i + 1}</button>`
        document.querySelector("#pagination").insertAdjacentElement("beforeend", page)
    }
    allCountriesPage(0)
}

function allCountriesPage(pageNumber) {
    document.querySelector(".container-cards").innerHTML = ""
    document.querySelector(".country").innerHTML = ""
    for (var i = 0; i < pages[pageNumber].length; i++) {
        document.querySelector('.container-cards').insertAdjacentElement("beforeend", pages[pageNumber][i])
    }
    document.querySelector("#region").value=""
}

function regionSearch() {
    pages = [];
    (async () => {
        const response = await fetch(`https://restcountries.eu/rest/v2/region/${document.querySelector("#region").value}`)
        const responseJson = await response.json()
        renderCountries(responseJson)
    })()
}
function countrySearch() {
    (async () => {
        const response = await fetch(`https://restcountries.eu/rest/v2/name/${document.querySelector("#country").value}`)
        const responseJson = await response.json()
        renderCountry(responseJson)
    })()
};
function countryClick(name) {
    (async () => {
        document.querySelector('.country').innerHTML=''
        const response = await fetch(`https://restcountries.eu/rest/v2/name/${name}`)
        const responseJson = await response.json()
        console.log(responseJson)
        renderCountry(responseJson)
    })()
};
function borderClick(code) {
    (async () => {
        document.querySelector('.country').innerHTML=''
        const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${code}`)
        const responseJson = await response.json()
        console.log(responseJson)
        renderCountry(responseJson)
    })()
};
function renderCountry(responseData) {
    if (responseData.status === 404) {
        document.querySelector('.container-cards').innerHTML = `<div style="font-size:30px; font-weight:600px; text-align:center;">No Results Found</div>`
        return responseData.status
    }
    if (responseData.length === undefined) {
        var responseData = [(responseData)]
    }
    if (responseData.length === 1) {
        var index = 0;
    }
    else {
        for (var i = 0; i < responseData.length; i++) {
            if (responseData[i].name.toLowerCase() == document.querySelector("#country").value.toLowerCase()) {
                var index = i;
            }
        }
    }
    var languagesArray = []
    for (var i = 0; i < responseData[index].languages.length; i++) {
        languagesArray.push(responseData[index].languages[i].name)
    }

    var bordersArray = []
    for (var i = 0; i < responseData[index].borders.length; i++) {
        bordersArray.push(`<span  onclick="borderClick('${responseData[index].borders[i]}')" class="span-button mt-1" style=" border:solid 1px black; padding:2px 8px;box-shadow: 1px -1px 2px;cursor:pointer;margin-right: 10px;
        margin-left: 10px;"><tt>${responseData[index].borders[i]}</tt></span>`)
    }

    var bordersArrayJoined = bordersArray.join(' ')

    document.querySelector(".container").style.display = 'none'
    document.querySelector(".country").innerHTML = ''

    var countryInject = document.createElement('div');
    countryInject.innerHTML = ` <button  onclick = "back()" style="background-color:rgb(238, 229, 214) ;border: solid black 1px;"
    class="btn py-1  ml-2">Back</button>
    <div class="country-card container">
                    <div class="row d-flex justify-content-around flex-wrap" >
                    <div class="country-flag mt-3 col-xl-4 col-lg-6 col-md-8 col-sm-10"><img src="${responseData[index].flag}" class="image-fluid" style="width: 100%;"  alt=""></div>
                    <div class="country-content mt-3 col-xl-6 col-lg-6 col-md-8 col-sm-10 px-5 py-1" style="box-sizing:border-box;padding:50px;background-color:rgba(85, 86, 99, 0.46);color:white;">
        <div class="title mt-0" style="font-size:24px"><b>${responseData[index].name}</b></div>
        <div class="details row mt-2">
            <div class="details1 col-6"><p>Native Name : ${responseData[index].nativeName}</p>
            <p>Population : ${responseData[index].population}</p>
            <p>Region : ${responseData[index].region}</p>
            <p>Sub Region : ${responseData[index].subregion}</p>
            <p>Capital : ${responseData[index].capital}</p>
            </div>
            <div class="details2 col-6">
            <p>Top Level Domain : ${responseData[index].topLevelDomain}</p>
            <p>Currencies : ${responseData[index].currencies[0].name}</p>
            <p>Languages : ${languagesArray}</p>
            </div>
        </div>
        <div class="footer">
        <b><u>Border Countries :</u></b>
        <div class="row d-flex"> ${bordersArrayJoined}</div>
        </div>
        </div>
    </div>
</div>`

    document.querySelector(".country").insertAdjacentElement('beforeend', countryInject)
    document.querySelector("#country").value=""
  
}

function back(){
    document.querySelector(".country").innerHTML=""
    document.querySelector(".container").style.display="block"
}

