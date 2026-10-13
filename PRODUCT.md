# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Le produit s’adresse en priorité au grand public francophone. Il accompagne les personnes qui souhaitent prendre du recul sur le temps déjà vécu et rendre plus concrète la durée finie d’une vie.

## Product Purpose

Your Life In Weeks permet à une personne de saisir sa date de naissance, de visualiser les semaines qu’elle a déjà vécues dans une grille dont elle choisit l’horizon entre 1 et 120 ans, avec 90 ans par défaut, et de voir le temps écoulé depuis sa naissance. Cet horizon est un repère personnel, pas une prédiction de durée de vie.

Le produit réussit lorsqu’il transforme une notion abstraite — le temps d’une vie — en une représentation immédiatement compréhensible qui provoque réflexion et intention.

## Positioning

Le mécanisme distinctif est une grille personnelle, finie et dénombrable : chaque ligne représente une année, chaque case une semaine, et les semaines déjà vécues sont calculées à partir de la date de naissance de la personne.

## Operating Context

L’expérience principale se déroule sur une page web. La personne sélectionne sa date de naissance, consulte son temps vécu puis parcourt la grille des semaines de sa vie.

L’interface est destinée à être proposée en français par défaut. Le nom du produit reste « Your Life In Weeks ».

## Capabilities and Constraints

- La grille couvre l’horizon choisi, de la naissance incluse à l’anniversaire correspondant exclu. Les semaines suivent les jours civils ; une année d’âge contient 52 ou 53 débuts de semaine et la dernière case peut être tronquée.
- Le produit fonctionne sans compte et sans stockage serveur de la date de naissance.
- La naissance et l’horizon sont mémorisés uniquement dans ce navigateur et peuvent être effacés ensemble. Si le stockage échoue, le calendrier reste utilisable pour la visite avec un message explicite.
- Le compteur et les repères d’anniversaire représentent le temps réellement vécu, indépendamment de l’horizon choisi.
- Cinq conseils santé généraux pour adultes sont accessibles sans naissance, avec des sources institutionnelles. Ils ne recueillent aucun renseignement de santé et ne calculent aucune durée de vie individuelle.

## Brand Commitments

- Le nom actuel est « Your Life In Weeks ».
- La représentation d’une vie sous la forme d’une grille de semaines doit être préservée, avec 90 ans comme horizon par défaut.
- L’inspiration de « Your Life in Weeks » par Wait But Why doit rester explicitement attribuée.
- L’expérience s’adresse en français au public prioritaire, même si le nom du produit reste en anglais.

## Evidence on Hand

- L’application existante et son parcours principal dans `src/`.
- La description du concept et le lien vers l’article source dans `README.md`.
- L’image de référence `Your Life In Weeks.jpeg`.
- L’article « Your Life in Weeks » de Wait But Why, lié depuis le README et le pied de page.

Aucun témoignage, cas client, benchmark, donnée d’usage ou autre preuve sociale n’est disponible dans le projet. Les futurs travaux ne doivent pas en inventer.

## Product Principles

1. Privilégier la prise de conscience et la réflexion plutôt que l’accumulation de fonctionnalités.
2. Rendre le concept compréhensible dès la première interaction.
3. Demander le minimum d’informations nécessaire pour personnaliser la visualisation.
4. Protéger la vie privée en conservant les réglages uniquement dans le navigateur.
5. Rester fidèle au concept source et maintenir une attribution explicite à Wait But Why.
