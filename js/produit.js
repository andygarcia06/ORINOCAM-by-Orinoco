////////////////////// PARAMETRE DE REQUETE URL //////////////////////

const str = window.location;
const url = new URL(str);
const idUrl = url.searchParams.get("id");
const urlGet = "http://localhost:3000/api/cameras/"



////////////////////// FUNCTIONS //////////////////////

function promiseGet() {
    return new Promise((resolve, reject) => {
        let recoverHttp = new XMLHttpRequest();
        recoverHttp.open('GET', urlGet + idUrl);
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
    const newFigure = document.createElement("figure");
    section.appendChild(newFigure);
    const newPic = document.createElement("img");
    newFigure.appendChild(newPic);
    newPic.setAttribute("src", camera.imageUrl);
}
function insertName(description, camera) {
    const nameTeddy = document.createElement("h3");
    description.appendChild(nameTeddy);
    nameTeddy.innerHTML = camera.name;
}
function insertId(description, camera) {
    const divId = document.createElement("div");
    description.appendChild(divId);
    const paragraphNumId = document.createElement("p");
    divId.appendChild(paragraphNumId);
    const newSpan = document.createElement("span");
    paragraphNumId.appendChild(newSpan);
    newSpan.innerHTML = " Numéro d'Id : ";
    const paragraphId = document.createElement("p");
    divId.appendChild(paragraphId);
    paragraphId.innerHTML = camera._id;
}
function insertLentille(description, cameraLentille) {
    const divLentille = document.createElement("div");
    description.appendChild(divLentille);
    const labelLentille = document.createElement("label");
    divColor.appendChild(labelLentille);
    labelColor.innerHTML = "Sélectionner une lentille : ";
    const selectLentille = document.createElement("select");
    labelColor.appendChild(selectColor);

    
    for(let i = 0; i < cameraLentille.length; i +=1){
        const secondOption = document.createElement("option");
        selectLentille.appendChild(secondOption);
        secondOption.setAttribute("value", cameraLentille[i]);
        secondOption.setAttribute("required", "");
        secondOption.innerHTML = cameraLentille[i];
    }
}

function insertDescription(description, camera) {
    const paragraphDescription = document.createElement("p");
    description.appendChild(paragraphDescription);
    paragraphDescription.innerHTML = camera.description;
}

function insertButtonCart(section, camera) {
    const divRate = document.createElement("div");
    section.appendChild(divRate);
    const divPrice = document.createElement("div");
    divRate.appendChild(divPrice);
    const paragraphPrice = document.createElement("p");
    divPrice.appendChild(paragraphPrice);
    paragraphPrice.innerHTML = [camera.price].map(price => price / 100) + ' ' + '€';
    const buttonValid = document.createElement("button")
    divRate.appendChild(buttonValid);
    buttonValid.setAttribute("type", "submit");
    buttonValid.innerHTML = "Ajouter au Panier";
}


////////////////////// APPEL DES FONCTIONS //////////////////////

promiseGet()
    .then(function(response) {
        const pageProduct = document.getElementById("page_product");
        const mainSection = document.createElement("section");
        pageProduct.appendChild(mainSection);
        insertPicture(mainSection, response);
        const cameraDescription = document.createElement("div");
        mainSection.appendChild(cameraDescription);
        insertName(cameraDescription, response);
        insertId(cameraDescription, response);
        insertLentille(cameraDescription,response.colors);
        const chooseLentille = document.querySelector("select");
        chooseLentille.addEventListener('change', function(e) { //evenement pour voir la couloir choisi
            console.log(chooseLentille.value);
        })
        insertDescription(cameraDescription, response);
        insertButtonCart(mainSection, response);

        
        /////////// EVENEMENTS ///////////
        const addCart = document.querySelector("button");
        addCart.addEventListener("click", function(e) { //evenement 'click' pour l'envoi au local storage
            let cameraChoosen = {
                picture: response.imageUrl,
                firstName: response.name,
                theId: response._id,
                color: chooseLentille.value,
                price: response.price,
            }
            const camerasAdded = localStorage.getItem("product");
            if(camerasAdded) {
                camerasInCArt = JSON.parse(teddiesAdded);
                camerasInCArt.push(cameraChoosen);
                localStorage.setItem('product', JSON.stringify(teddiesInCArt));
                alert('Ajouté au panier !');
            } else {
                camerasInCArt = [];
                camerasInCArt.push(cameraChoosen);
                localStorage.setItem('product', JSON.stringify(teddiesInCArt));
                alert('Ajouté au panier !');
            }
        })
    })
    .catch(function(error) {
        console.log(error);
    })