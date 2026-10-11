# Consulter les semaines au clavier dans une interface en français

## Parent

[Spec #74 — sauvegarde locale, semaine actuelle, légende et lecture mobile](https://github.com/cfatrane/your-life-in/issues/74).

## What to build

Permettre de consulter les détails d'une semaine dans la grille complète sur ordinateur, à la souris comme au clavier et avec un lecteur d'écran. La personne retrouve son numéro depuis la naissance, ses dates inclusives et son état, sans dépendre uniquement d'une infobulle au survol. Finaliser les textes en français dans l'ensemble du parcours existant.

## Acceptance criteria

- [ ] Consulter une semaine rend disponibles son numéro depuis la naissance, ses dates inclusives et son état réel : écoulée, actuelle ou à venir.
- [ ] La consultation est utilisable au clavier avec un focus visible et des commandes accessibles. La description des semaines permet de les identifier avec un lecteur d'écran.
- [ ] Les détails restent lisibles et consultables sans maintenir un survol à la souris ; la consultation d'une autre semaine actualise les informations affichées.
- [ ] La grille complète reste disponible sur ordinateur et la consultation ne modifie ni la date de naissance ni l'état temporel de la semaine.
- [ ] Les dates, axes, compteur, introduction, légende, détails et messages sont en français, y compris les noms accessibles.
- [ ] Le parcours de consultation est vérifié dans le navigateur à la souris et au clavier, avec vérification du contenu visible, des noms accessibles et du focus. La lisibilité fait l'objet d'un contrôle visuel.

## Blocked by

- [#76 — Situer la semaine actuelle dans un calendrier exact avec légende](https://github.com/cfatrane/your-life-in/issues/76). Les détails doivent porter sur les semaines et états réels, notamment leurs dates et leur appartenance à une année d'âge. Dépendance native enregistrée sur GitHub.
