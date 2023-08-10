// Création d'une nouvelle instance de l'objet SpeechSynthesisUtterance
let speech = new SpeechSynthesisUtterance();

// Création d'un tableau pour stocker les voix disponibles
let voices = [];

// Sélection de l'élément "select" dans le document HTML
let voiceSelect = document.querySelector("select");

// Lorsque les voix disponibles changent (événement onvoiceschanged)
window.speechSynthesis.onvoiceschanged = () => {
  // Récupération des voix disponibles dans l'API de synthèse vocale
  voices = window.speechSynthesis.getVoices();
  
  // Définition de la première voix disponible comme voix par défaut
  speech.voice = voices[0];

  // Pour chaque voix disponible, créer une nouvelle option dans la liste déroulante
  voices.forEach((voice, idx) => (voiceSelect.options[idx] = new Option(voice.name, idx)));
};

// Lorsque l'utilisateur change la sélection de voix dans la liste déroulante
voiceSelect.addEventListener("change", () => {
  // Mettre à jour la voix sélectionnée dans l'objet SpeechSynthesisUtterance
  speech.voice = voices[voiceSelect.value];
});

// Lorsque l'utilisateur clique sur le bouton
document.getElementById('speak').addEventListener("click", () => {
  // Récupérer le texte de la zone de texte
  speech.text = document.getElementById('resultatItalien').value;
  
  // Lancer la synthèse vocale avec le texte spécifié
  window.speechSynthesis.speak(speech);
});
