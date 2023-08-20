

// ----------------------------------------------Traducteur-----------------------------------------------

function traduire() {
    // Récupère le texte entré par l'utilisateur
    const texteFrancais = document.getElementById('texteFrancais').value;
    // Récupère la langue de traduction sélectionnée par l'utilisateur
    const langueCible = document.getElementById('voiceSelect').value;

    // Vérifie si la langue cible est le français
    if (langueCible === 'fr-FR') {
        // Affiche un message d'erreur dans le champ de résultat
        document.getElementById('resultatTraduit').textContent = 'Veuillez choisir une langue de traduction.';
        return; // Sort de la fonction
    }

    // Vérifie si le champ de texte est vide
    if (texteFrancais === '') {
        // Affiche un message d'erreur dans le champ de résultat
        document.getElementById('resultatTraduit').textContent = 'Veuillez entrer un texte à traduire.';
        return; // Sort de la fonction
    }

    // Construit l'URL pour appeler l'API de traduction
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texteFrancais)}&langpair=fr|${langueCible}`;

    // Fait appel à l'API de traduction en utilisant la fonction fetch
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Récupère le texte traduit depuis la réponse JSON
            const resultat = data.responseData.translatedText;
            // Affiche le texte traduit dans le champ de résultat
            document.getElementById('resultatTraduit').textContent = resultat;
        })
        .catch(error => console.error('Erreur :', error));
}

// Fonction de réinitialisation des champs
function reinitialiser() {
    // Réinitialise les champs de texte
    document.getElementById('texteFrancais').value = '';
    document.getElementById('resultatTraduit').textContent = '';
}

//-----------------------Voix navigateur-------------------

// Crée une instance de l'objet SpeechSynthesisUtterance pour synthèse vocale
let speech = new SpeechSynthesisUtterance();
let voix = [];
let voixNavigateur = document.getElementById("voixNavigateur");

// Événement déclenché lorsque les voix sont chargées
window.speechSynthesis.onvoiceschanged = () => {
    // Obtient la liste des voix disponibles
    voix = window.speechSynthesis.getVoices();
    speech.voix = voix[0];
    // Crée des options pour le menu déroulant des voix
    voix.forEach((voix, idx) => (voixNavigateur.options[idx + 1] = new Option(voix.name, idx)));
};

// Événement déclenché lorsqu'une voix est sélectionnée dans le menu déroulant
voixNavigateur.addEventListener("change", () => {
    // Associe la voix sélectionnée à l'objet SpeechSynthesisUtterance
    speech.voix = voix[voixNavigateur.value];
});

// Fonction pour lire le texte à l'aide de la synthèse vocale du navigateur
function lireTexteAvecVoixNavigateur() {
    // Récupère le texte à lire depuis le champ de résultat
    const texte = document.getElementById('resultatTraduit').value;
        // Associe le texte à l'objet SpeechSynthesisUtterance
    speech.text = texte;

    const lang = document.getElementById('voixNavigateur').value;

    if (speech.voix) {
        speech.lang = speech.voix.lang;
    } else if (lang) {
        speech.lang = lang;
    }
    window.speechSynthesis.speak(speech);
}

//---------------------Horloge-------------------------------

// Sélectionne les éléments pour afficher l'heure et la date
let heuresAfficher = document.querySelector('.heures')
let date = document.querySelector('.date')

// Fonction pour afficher l'heure et la date actuelles
const affichageHeure = function () {
    let today, annee, listeMois, mois, listeJours, jourNumero, jourNom, heures, minutes, secondes, deuxChiffres;
    today = new Date();
    annee = today.getFullYear();

    listeMois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    mois = listeMois[today.getMonth()];

    jourNumero = today.getDate();

    listeJours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    jourNom = listeJours[today.getDay()]

    deuxChiffres = function (element) {
        if (element < 10) {
            return element = "0" + element;
        } else {
            return element;
        }
    }

    heures = deuxChiffres(today.getHours());

    minutes = deuxChiffres(today.getMinutes())
    secondes = deuxChiffres(today.getSeconds())

    // Met à jour l'affichage de l'heure et de la date
    heuresAfficher.textContent = heures + ":" + minutes + ":" + secondes;
    date.textContent = jourNom + "," + jourNumero + " " + mois + " " + annee;

    // Appelle récursivement la fonction après une seconde
    setTimeout(affichageHeure, 1000)
}

affichageHeure();


//-----------------------------------reconnaissance vocale---------------------------- 

// Déclare une variable pour la reconnaissance vocale
let reconnaissanceVocale;
// Sélectionne l'élément pour l'indicateur d'enregistrement
const enregistrementIndicator = document.getElementById('enregistrementIndicator');
// Sélectionne les boutons de démarrage et d'arrêt
const boutonDemarrer = document.querySelector('button[onclick="startReconnaissance()"]');
const boutonArreter = document.querySelector('button[onclick="stopReconnaissance()"]');

// Fonction pour démarrer la reconnaissance vocale
function startReconnaissance() {
    // Crée une instance de webkitSpeechRecognition
    reconnaissanceVocale = new webkitSpeechRecognition();
    reconnaissanceVocale.lang = 'fr-FR';

    // Événement déclenché lorsque la reconnaissance débute
    reconnaissanceVocale.onstart = () => {
        boutonDemarrer.disabled = true;
        boutonArreter.disabled = false;
        enregistrementIndicator.style.display = 'block'; // Affiche l'indicateur d'enregistrement
    };

    // Événement déclenché lorsqu'un résultat est obtenu
    reconnaissanceVocale.onresult = (event) => {
        // Obtient le texte reconnu
        const texteParle = event.results[0][0].transcript;
        // Remplit le champ de texte avec le texte reconnu
        document.getElementById('texteFrancais').value = texteParle;
        traduire(); // Appelle la fonction de traduction
    };

    // Événement déclenché lorsque la reconnaissance se termine
    reconnaissanceVocale.onend = () => {
        boutonDemarrer.disabled = false;
        boutonArreter.disabled = true;
        enregistrementIndicator.style.display = 'none'; // Masque l'indicateur d'enregistrement
    };

    // Démarre la reconnaissance vocale
    reconnaissanceVocale.start();
}

// Fonction pour arrêter la reconnaissance vocale
function stopReconnaissance() {
    reconnaissanceVocale.stop();
    enregistrementIndicator.style.display = 'none'; // Masque l'indicateur d'enregistrement
}


