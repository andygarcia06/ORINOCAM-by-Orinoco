////////////////////// PARAMETRE DE REQUETE URL //////////////////////

const str = window.location;
const url = new URL(str);
const idUrl = url.searchParams.get("id");



////////////////////// FUNCTIONS //////////////////////

function promiseGet() {
    return new Promise((resolve, reject) => {
        let recoverHttp = new XMLHttpRequest();
        recoverHttp.open('GET', 'http://localhost:3000/api/teddies/'+ idUrl);
        recoverHttp.send();
        recoverHttp.onreadystatechange = function() {
            if(this.readyState === XMLHttpRequest.DONE) {
                if(this.status === 200) {
                    resolve(JSON.parse(this.responseText));
                }else {
                    reject(XMLHttpRequest);
                }
            }
        }
    })
    

}

function insertPicture(section, camera) {
    const newFigure = document.createElement('figure');
    section.appendChild(newFigure);
    const newPic = document.createElement('img');
    newFigure.appendChild(newPic);
    newPic.setAttribute('src', camera.imageUrl);
}
function insertName(description, camera) {
    const nameTeddy = document.createElement('h3');
    description.appendChild(nameTeddy);
    nameTeddy.innerHTML = camera.name;
}
function insertId(description, camera) {
    const divId = document.createElement('div');
    description.appendChild(divId);
    const paragraphNumId = document.createElement('p');
    divId.appendChild(paragraphNumId);
    const newSpan = document.createElement('span');
    paragraphNumId.appendChild(newSpan);
    newSpan.innerHTML = "Numéro d'Id : ";
    const paragraphId = document.createElement('p');
    divId.appendChild(paragraphId);
    paragraphId.innerHTML = camera._id;
}
function insertColor(description, camera) {
    const divColor = document.createElement('div');
    description.appendChild(divColor);
    divColor.className ="labelForColor"; 
    const labelColor = document.createElement('label');
    divColor.appendChild(labelColor);
    labelColor.innerHTML = 'Sélectionner votre Couleur préférée : ';
    const selectColor = document.createElement('select');
    labelColor.appendChild(selectColor);
    selectColor.id = 'choose_color';
    
    for(let i = 0; i < teddyColors.length; i +=1){
        const secondOption = document.createElement('option');
        selectColor.appendChild(secondOption);
        secondOption.setAttribute('value', teddyColors[i]);
        secondOption.setAttribute('required', '');
        secondOption.innerHTML = teddyColors[i];
    }
}
function insertDescription(description, teddy) {
    const paragraphDescription = document.createElement('p');
    description.appendChild(paragraphDescription);
    paragraphDescription.className = 'divDescript';
    paragraphDescription.innerHTML = teddy.description;
}
function insertButtonCart(section, teddy) {
    const divRate = document.createElement('div');
    section.appendChild(divRate);
    divRate.className = 'divTarifs';
    const divPrice = document.createElement('div');
    divRate.appendChild(divPrice);
    divPrice.className = 'prixTeddy';
    const paragraphPrice = document.createElement('p');
    divPrice.appendChild(paragraphPrice);
    paragraphPrice.innerHTML = [teddy.price].map(price => price / 100) + ' ' + '€';
    const buttonValid = document.createElement('button')
    divRate.appendChild(buttonValid);
    buttonValid.className = 'boutonPanier';
    buttonValid.setAttribute('type', 'submit');
    buttonValid.innerHTML = "Ajouter au Panier";
}


////////////////////// APPEL DES FONCTIONS //////////////////////

promiseGet()
    .then(function(response) {
        const pageProduct = document.getElementById('page_product');
        const mainSection = document.createElement('section');
        pageProduct.appendChild(mainSection);
        mainSection.className = 'onlyTeddy';
        insertPicture(mainSection, response);
        const teddyDescription = document.createElement('div');
        mainSection.appendChild(teddyDescription);
        teddyDescription.className = 'description_Teddy';
        insertName(teddyDescription, response);
        insertId(teddyDescription, response);
        insertColor(teddyDescription,response.colors);
        const chooseColor = document.querySelector('select');
        chooseColor.addEventListener('change', function(e) { //evenement pour voir la couloir choisi
            console.log(chooseColor.value);
        })
        insertDescription(teddyDescription, response);
        insertButtonCart(mainSection, response);

        
        /////////// EVENEMENTS ///////////
        const addCart = document.querySelector('button');
        addCart.addEventListener('click', function(e) { //evenement 'click' pour l'envoi au local storage
            let teddiesChoosen = {
                picture: response.imageUrl,
                firstName: response.name,
                theId: response._id,
                color: chooseColor.value,
                price: response.price,
            }
            const teddiesAdded = localStorage.getItem('product');
            if(teddiesAdded) {
                teddiesInCArt = JSON.parse(teddiesAdded);
                teddiesInCArt.push(teddiesChoosen);
                localStorage.setItem('product', JSON.stringify(teddiesInCArt));
                alert('Ajouté au panier !');
            } else {
                teddiesInCArt = [];
                teddiesInCArt.push(teddiesChoosen);
                localStorage.setItem('product', JSON.stringify(teddiesInCArt));
                alert('Ajouté au panier !');
            }
        })
    })
    .catch(function(error) {
        console.log(error);
    })