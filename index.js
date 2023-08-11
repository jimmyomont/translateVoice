

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
            document.getElementById('resultatTraduit').textContent = resultat;
        })
        .catch(error => console.error('Erreur :', error));
}

function reinitialiser() {
    document.getElementById('texteFrancais').value = '';
    document.getElementById('resultatTraduit').value = '';
}
//-----------------------Voix navigateur-------------------

let speech = new SpeechSynthesisUtterance();
let voix = [];
let voixNavigateur = document.getElementById("voixNavigateur");

window.speechSynthesis.onvoiceschanged = () => {
    voix = window.speechSynthesis.getVoices();
    speech.voix = voix[0];
    voix.forEach((voix, idx) => (voixNavigateur.options[idx + 1] = new Option(voix.name, idx)));
};

voixNavigateur.addEventListener("change", () => {
    speech.voix = voix[voixNavigateur.value];
});

function lireTexteAvecVoixNavigateur() {
    const texte = document.getElementById('resultatTraduit').value;
    speech.text = texte;
    window.speechSynthesis.speak(speech);
}

// ... Vos fonctions existantes ...

function lireTexteAvecVoixNavigateur() {
    const texte = document.getElementById('resultatTraduit').value;
    speech.text = texte;

    const lang = document.getElementById('voixNavigateur').value;

    if (speech.voix) {
        speech.lang = speech.voix.lang;
    } else if (lang) {
        speech.lang = lang;
    } else {
        alert("Veuillez sélectionner une voix du navigateur ou une langue cible.");
        return;
    }

    window.speechSynthesis.speak(speech);
}

// ... Le reste de votre code ...


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

