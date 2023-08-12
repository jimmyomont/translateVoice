# Détails des fonctionnalilitées et des éléments

## Structure HTML:

``<!DOCTYPE html>``: Indique la version HTML utilisée.
``<html>``: Balise racine du document HTML.
``<head>``: Contient les métadonnées et les liens vers les ressources externes.
``<body>``: Contient le contenu visible de la page.

## Fonctionnalités principales:

#### 1. Horloge:
- La fonction ``affichageHeure`` met à jour l'horloge toutes les secondes en affichant l'heure, les minutes et les secondes actuelles.
- Utilise ``setInterval`` pour appeler la fonction toutes les secondes.

#### 2. Traducteur de texte:
- Lorsqu'une langue de traduction est sélectionnée dans la liste déroulante ``voiceSelect``, la fonction traduire est appelée.
- La fonction récupère le texte en français à traduire et la langue cible sélectionnée.
- Si la langue cible est le français, un message est affiché.
- Si le texte à traduire est vide, un message est affiché.
- L'API ``https://api.mymemory.translated.net/get`` est appelée avec le texte et la langue cible pour obtenir la traduction.
- La traduction est affichée dans la zone de résultat ``resultatTraduit``.

#### 3. Synthèse vocale:
- Lorsque l'utilisateur choisit une voix dans la liste déroulante ``voixNavigateur`` et clique sur le bouton "``Lecture``", la fonction ``lireTexteAvecVoixNavigateur`` est appelée.
- La fonction crée un objet ``SpeechSynthesisUtterance`` et attribue le texte à lire.
- La voix sélectionnée est utilisée pour la synthèse vocale.
- L'API ``window.speechSynthesis`` est utilisée pour lire le texte avec la voix sélectionnée.

## Événements et écoutes:

- ``window.speechSynthesis.onvoiceschanged``: Événement déclenché lorsque les voix de synthèse sont chargées.
- ``voixNavigateur.addEventListener("change")``: Événement déclenché lorsque l'utilisateur change la voix sélectionnée.

## Exemples d'événements:

- Lorsque l'utilisateur choisit une langue de traduction, la fonction ``traduire`` est déclenchée.
- Lorsque l'utilisateur clique sur le bouton "``Lecture``", la fonction ``lireTexteAvecVoixNavigateur`` est déclenchée.

## - Détails techniques:

- Les fonctions traduire, ``lireTexteAvecVoixNavigateur`` et ``affichageHeure`` sont définies en JavaScript.
- L'utilisation de ``fetch`` pour appeler l'API de traduction.
- L'utilisation de ``window.speechSynthesis`` pour la synthèse vocale.