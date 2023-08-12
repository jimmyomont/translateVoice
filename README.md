# TRANSLATE VOICE

[Lien vers l'app](https://translate-voice.vercel.app/)

 Une application interactive permettant de traduire le texte en différentes langues, avec la possibilité de lire le texte traduit à haute voix, le tout dans une interface agréablement stylisée. Responsive cette app met l'accent sur la facilité et la performance d'utilisation, quel que soit le dispositif utilisé.

### Horloge en temps réel : 
- La page affiche en temps réel l'heure actuelle, les minutes et les secondes, ainsi que la date du jour.

### Traducteur de texte : 
L'application permet de traduire un texte du français vers d'autres langues sélectionnables. Voici comment fonctionne cette partie :

- L'utilisateur peut saisir le texte en français dans une zone de texte indiquée.
- Un menu déroulant permet à l'utilisateur de choisir la langue cible pour la traduction parmi plusieurs langues, telles que l'italien, l'allemand, l'anglais, l'espagnol, etc.
- En cliquant sur le bouton de traduction, le texte saisi est envoyé à l'API "MyMemory Translated" pour être traduit dans la langue sélectionnée.
- Le texte traduit est affiché dans une autre zone de texte réservée à cet effet.

### Lecture du texte traduit : 
L'application offre la possibilité de lire à voix haute le texte traduit à l'aide de la synthèse vocale du navigateur. 

Voici comment cela fonctionne :

- Un menu déroulant permet à l'utilisateur de sélectionner une voix de synthèse parmi celles disponibles dans le navigateur.
- En cliquant sur le bouton "Conférence", le texte traduit est lu à voix haute en utilisant la voix choisie.

### Réinitialisation : 
L'application permet également de réinitialiser les champs de texte à tout moment en cliquant sur le bouton "Réinitialiser".

----

## TECHNO :

### HTML et CSS :
L'application utilise HTML pour structurer le contenu de la page.

### JavaScript : 
- JavaScript gère le processus de traduction de texte en voyant des requêtes à l'API "MyMemory Translated" via la fonction traduire().
- L'horloge en temps réel est affichée et mise à jour grâce à la fonction affichageHeure()qui utilise la classe Datede JavaScript.
- La fonctionnalité de lecture à voix haute utilise l'API de synthèse vocale du navigateur ( SpeechSynthesisUtterance) pour lire le texte traduit avec différentes voix disponibles.

### API "MyMemory Translated" : 
L'application utilise cette API pour la traduction du texte en utilisant les langues sélectionnées par l'utilisateur. Les données sont récupérées via des requêtes HTTP (fetch) et affichées à l'utilisateur.
[Lien vers MyMemory Translated](https://mymemory.translated.net/doc/spec.php)

