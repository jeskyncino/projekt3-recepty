let logo = document.querySelector("#logo");
logo.addEventListener("click", () => {
    window.location.reload()
});


const boxRecepty = document.querySelector('#recepty');
const boxDetail = document.querySelector(".recept-box")
const pocetReceptu = recepty.length;
let zobrazeneRecepty = recepty

for (i = 0; i < pocetReceptu; i++) {
    let polozka = recepty[i];
    polozka.index = i;
}

/* 1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html.*/

zobrazeneRecepty.forEach(vypisRecepty)

function vypisRecepty(polozka) {
    let recept = document.createElement('div');
    recept.setAttribute("class", "recept");
    recept.setAttribute("data-index", recepty.indexOf(polozka));
    recept.setAttribute("onclick", "priKliknuti(this)");

    let divObrazek = document.createElement('div');
    divObrazek.setAttribute("class", "recept-obrazek");

    let imgObrazek = document.createElement('img');
    imgObrazek.src = polozka.img;

    let divNadpis = document.createElement('div');
    divNadpis.setAttribute("class", "recept-info");

    let textNadpis = document.createElement('h3');
    textNadpis.innerHTML = polozka.nadpis;

    divNadpis.appendChild(textNadpis);
    divObrazek.appendChild(imgObrazek);

    recept.appendChild(divObrazek);
    recept.appendChild(divNadpis);

    boxRecepty.appendChild(recept);

}

/* 2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
by se měl seznam receptů vyfiltrovat podle hledaného slova.*/

let vyhledat = document.querySelector('#hledat');
vyhledat.addEventListener('change', vyhledej)

function vyhledej() {
    boxRecepty.innerHTML = '';

    for (i = 0; i < pocetReceptu; i++) {
        let receptLowercase = recepty[i].nadpis.toLowerCase();
        let vyhledatLowercase = vyhledat.value.toLowerCase();

        if (receptLowercase.includes(vyhledatLowercase)) {
            zobrazeneRecepty = [];
            zobrazeneRecepty.push(recepty[i]);
            zobrazeneRecepty.forEach(vypisRecepty);
        }
    }

}

/* 3) Doplň filtrovanání receptů podle kategorie. */

let razeniKategorie = document.getElementById("kategorie");
razeniKategorie.addEventListener("change", vyberKategorii);

function vyberKategorii() {
    boxRecepty.innerHTML = '';
    zobrazeneRecepty = [];
    let vybranaKategorie = razeniKategorie.value;

    for (i = 0; i < pocetReceptu; i++) {

        if (vybranaKategorie === recepty[i].stitek || vybranaKategorie === '') {
            zobrazeneRecepty.push(recepty[i]);
        }
    }
    zobrazeneRecepty.forEach(vypisRecepty);
}


/* 4) Doplň řazení receptů podle hodnocení. */

let razeniHodnoceni = document.getElementById("razeni");
razeniHodnoceni.addEventListener("change", seradPodleHodnoceni);

function nejhorsi(a, b) {
    if (a.hodnoceni < b.hodnoceni) {
        return -1;
    }
    if (a.hodnoceni > b.hodnoceni) {
        return 1;
    }
    return 0;
}

function nejlepsi(a, b) {
    if (a.hodnoceni > b.hodnoceni) {
        return -1;
    }
    if (a.hodnoceni < b.hodnoceni) {
        return 1;
    }
    return 0;
}

function puvodni(a, b) {
    if (a.index < b.index) {
        return -1;
    }
    if (a.index > b.index) {
        return 1;
    }
    return 0;
}


function seradPodleHodnoceni() {
    let vybraneRazeni = razeniHodnoceni.value;
    boxRecepty.innerHTML = '';

    if (vybraneRazeni == '') {
        zobrazeneRecepty.sort(puvodni)
        zobrazeneRecepty.forEach(vypisRecepty);
    } else if (vybraneRazeni == "1") {
        zobrazeneRecepty.sort(nejlepsi);
        zobrazeneRecepty.forEach(vypisRecepty);
    } else if (vybraneRazeni == "2") {
        zobrazeneRecepty.sort(nejhorsi);
        zobrazeneRecepty.forEach(vypisRecepty);
    }
}



/* 5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
recept-hodnoceni, recept-nazev, recept-popis.

6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl. */


function priKliknuti(recept) {
    //zobraz recept
    let index = recept.getAttribute("data-index")
    document.querySelector('#recept-foto').src = recepty[index].img;
    document.querySelector('#recept-kategorie').innerHTML = recepty[index].kategorie;
    document.querySelector('#recept-hodnoceni').innerHTML = recepty[index].hodnoceni;
    document.querySelector('#recept-nazev').innerHTML = recepty[index].nadpis;
    document.querySelector('#recept-popis').innerHTML = recepty[index].popis;
    boxDetail.style.display = "block";

    //ulož do localStorage
    let posledniRecept = recepty[index]
    localStorage.clear();
    localStorage.posledniRecept = JSON.stringify(posledniRecept);

}

nactiLocal();

function nactiLocal() {

    if (localStorage.posledniRecept === null || localStorage.posledniRecept === undefined) {
        //boxDetail schovej
        boxDetail.style.display = "none";
    } else {
        //zobraz recept z localStorage
        let receptLocal = JSON.parse(localStorage.posledniRecept);
        document.querySelector('#recept-foto').src = receptLocal.img;
        document.querySelector('#recept-kategorie').innerHTML = receptLocal.kategorie;
        document.querySelector('#recept-hodnoceni').innerHTML = receptLocal.hodnoceni;
        document.querySelector('#recept-nazev').innerHTML = receptLocal.nadpis;
        document.querySelector('#recept-popis').innerHTML = receptLocal.popis;
        boxDetail.style.display = "block";

    }
}