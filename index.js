
function lireTexte() {
    const texte = document.getElementById('resultatItalien').value;
    const speech = new SpeechSynthesisUtterance(texte);
    window.speechSynthesis.speak(speech);
}
// ----------------------------------------------Traducteur-----------------------------------------------

function traduire() {
    const texteFrancais = document.getElementById('texteFrancais').value;
    const langueCible = document.getElementById('voiceSelect').value; // Obtenir la valeur de la langue cible

    // Utiliser la valeur de la langue cible dans l'URL de la requête
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texteFrancais)}&langpair=fr|${langueCible}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultat = data.responseData.translatedText;
            document.getElementById('resultatItalien').textContent = resultat;
        })
        .catch(error => console.error('Erreur :', error));
}

function lireTexte() {
    const texte = document.getElementById('resultatItalien').value;
    const lang = document.getElementById('voiceSelect').value;
    const speech = new SpeechSynthesisUtterance(texte);
    speech.lang = lang;
    window.speechSynthesis.speak(speech);
}

function reinitialiser() {
    document.getElementById('texteFrancais').value = '';
    document.getElementById('resultatItalien').value = '';
}

//---------------------Horloge-------------------------------

let heuresAfficher = document.querySelector('.heures')
let date = document.querySelector('.date')

const affichageHeure = function () {
    let today , annee, listeMois, mois, listeJours, jourNumero, jourNom, heures, minutes, secondes, deuxChiffres; 
    today = new Date ();
    annee = today.getFullYear();

    listeMois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]; 
    mois = listeMois [today.getMonth()]; 

    jourNumero = today.getDate(); 

    listeJours =["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]; 
    jourNom = listeJours[today.getDay()]

    deuxChiffres = function(element) {
        if (element < 10){
            return element = "0" + element;
        } else {
            return element;
        }
    }

    heures = deuxChiffres(today.getHours());

    minutes = deuxChiffres(today.getMinutes())
    secondes = deuxChiffres(today.getSeconds())

    heuresAfficher.textContent = heures + ":" + minutes + ":" + secondes; 
    date.textContent = jourNom + "," + jourNumero + " " + mois + " " + annee; 

    setTimeout (affichageHeure, 1000)
}

affichageHeure();

