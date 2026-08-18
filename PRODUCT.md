# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Le produit s’adresse en priorité au grand public francophone. Il accompagne les personnes qui souhaitent prendre du recul sur le temps déjà vécu et rendre plus concrète la durée finie d’une vie.

## Product Purpose

Your Life In Weeks permet à une personne de saisir sa date de naissance, de visualiser les semaines qu’elle a déjà vécues dans une grille couvrant 90 ans et de voir le temps écoulé depuis sa naissance.

Le produit réussit lorsqu’il transforme une notion abstraite — le temps d’une vie — en une représentation immédiatement compréhensible qui provoque réflexion et intention.

## Positioning

Le mécanisme distinctif est une grille personnelle, finie et dénombrable : chaque ligne représente une année, chaque case une semaine, et les semaines déjà vécues sont calculées à partir de la date de naissance de la personne.

## Operating Context

L’expérience principale se déroule sur une page web. La personne sélectionne sa date de naissance, consulte son temps vécu puis parcourt la grille des semaines de sa vie.

L’interface est destinée à être proposée en français par défaut. Le nom du produit reste « Your Life In Weeks ».

## Capabilities and Constraints

- La grille couvre 90 années à raison de 52 semaines par année.
- Le produit fonctionne sans compte et sans stockage serveur de la date de naissance.
- La date de naissance doit pouvoir être mémorisée uniquement sur l’appareil afin d’être retrouvée entre les visites. Cette persistance locale est un engagement produit confirmé, mais elle n’est pas encore implémentée.
- L’implémentation actuelle affiche également un compteur détaillé du temps écoulé et des périodes de vie inspirées du parcours scolaire et professionnel français. Ces éléments sont évolutifs et ne constituent pas des invariants produit.

## Brand Commitments

- Le nom actuel est « Your Life In Weeks ».
- La représentation d’une vie sous la forme d’une grille de semaines couvrant 90 ans doit être préservée.
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
4. Protéger la vie privée en conservant la date de naissance uniquement sur l’appareil.
5. Rester fidèle au concept source et maintenir une attribution explicite à Wait But Why.
