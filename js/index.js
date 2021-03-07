//  Constantes //

const catalogue = document.getElementById("catalogue");


// Function  //

function promiseGet() {
    return new Promise((resolve, reject) => {
        let recupHttp = new XMLHttpRequest();
        recupHttp.open('GET', 'http://localhost:3000/api/cameras');
        recupHttp.send();
        recupHttp.onreadystatechange = function() {
            if(this.readyState === XMLHttpRequest.DONE) {
                if(this.status === 200) {
                    resolve(JSON.parse(this.responseText));
                }else{
                    reject(recupHttp);
                }
            }
        }
    })
}

function (){
    const section = document.getElementById("section");
    const newH2 = document.createElement("h2")
    section.appendChild(newH2);
    newH2.innerHTML = " Orinocam by Orinoco";
    const newH3 = document.createElement("h3");
    section.appendChild(newH3);
    newH3.innerHTML = "Le n°1 des sites de ventes de caméras vintages, complètement customizables"
}

function insertImg(section, image){
    const newFigure = document.createElement("figure");
    section.appendChild(newFigure);
    const newImg = document.createElement("img");
    newFigure.appendChild(newImg);
    newImg.setAttribute("src", image)
}

function insertName(div,name){
    const newH32 = document.createElement("h3")
    div.appendChild(newH32);
    newH3.innerHTML = name;
}

function insertId(div, id){
    const newDiv2 = document.createElement("div");
    div.appendChild(newDiv2);
    const newP1 = document.createElement("p");
    newDiv2.appendChild(newP1);
    const newSpan = document.createElement("span");
    newP1.appendChild(newSpan);
    const newP2 = document.createElement("p");
    newDiv2.appendChild(newP2);
    newP2.innerHTML = id;
}

function insertLentille(div){
    const newP3 = document.createElement('p');
    div.appendChild(newP3);
    const newSpan2 = document.createElement('span');
    newP3.appendChild(newSpan2);
    newSpan2.innerHTML = "Lentille : Personnalisable";
}

function insertDescription(div, description){
    const newP4 = document.createElement("p");
    div.appendChild(newP4);
    newP4.innerHTML = description;
}

function insertPrice(div3, price){
    const newDiv4 = document.createElement("div");
    div3.appendChild(newDiv4);
    const newP5 = document.createElement("p");
    newDiv4.appendChild(newP5);
    newP5.innerHTML = price;
}

function insertLienPerso(div3, idLien){
    const newDiv5 = document.createElement("div");
    div3.appendChild(newDiv5);
    const newP6 = document.createElement("p");
    newDiv5.appendChild(newP6);
    const newA = document.createElement("a");
    newP6.appendChild(newA);
    newA.setAttribute("href", "./product.html?id=" + idLien);
    newA.innerHTML = ;
}
function serverOut() {
    // const myH1 = document.getElementById("my_title");//
    myH1.style.display = "none";
    // const myH2 = document.getElementById("my_second_title');//
    myH2.style.display='none';
    const myFooter = document.getElementById('footer');
    myFooter.style.display ='none';
    const divServerOut = document.createElement('div');
    catalogue.appendChild(divServerOut);
    divServerOut.innerHTML = 'Nous revenons très bientôt';
}