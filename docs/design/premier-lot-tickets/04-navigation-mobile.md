# Parcourir les décennies de vie et consulter les semaines sur mobile

## Parent

[Spec #74 — sauvegarde locale, semaine actuelle, légende et lecture mobile](https://github.com/cfatrane/your-life-in/issues/74).

## What to build

Sur téléphone, ouvrir la décennie de vie et l'année contenant la semaine actuelle après saisie ou restauration, puis permettre de consulter les autres décennies et années. La personne touche une semaine pour lire ses détails sous la grille, sans défilement horizontal de page. Sur ordinateur, elle conserve la grille complète.

## Acceptance criteria

- [ ] Sur mobile, les décennies vont de 0–9 à 80–89 ans. Chaque décennie donne accès à ses dix années d'âge, avec une seule année dépliée à la fois.
- [ ] Après saisie ou restauration, la décennie et l'année contenant le début de la semaine actuelle sont ouvertes. Si une semaine traverse un anniversaire, l'ouverture suit son groupe de début.
- [ ] Hors horizon, la dernière décennie est ouverte et aucun repère actuel artificiel n'apparaît.
- [ ] La personne peut naviguer entre les décennies et ouvrir une autre année. Ouvrir une année ferme la précédente, sans altérer la date de naissance ni les états des semaines.
- [ ] Les semaines de l'année dépliée sont disposées sur six colonnes. Les cibles tactiles des semaines et commandes de navigation mesurent au moins 44 pixels.
- [ ] Aux largeurs de 320 et 390 pixels, le parcours tient dans l'écran sans défilement horizontal de page, y compris la saisie, les messages, la légende, la navigation et les détails.
- [ ] Toucher une semaine affiche sous la grille son numéro depuis la naissance, ses dates inclusives et son état. La consultation et la navigation restent accessibles au clavier avec des noms accessibles en français.
- [ ] La grille complète reste disponible sur ordinateur ; les vues mobile et ordinateur présentent les mêmes semaines et états.
- [ ] Le parcours complet est vérifié dans le navigateur aux deux largeurs mobiles : date restaurée, navigation entre décennies, changement d'année, consultation d'une semaine, cas hors horizon et effacement de la date.
- [ ] Un contrôle visuel vérifie la lisibilité et les débordements. La vérification sur téléphone est distinguée de l'émulation de viewport ; sans essai sur appareil réel, la validation tactile réelle reste explicitement non réalisée.

## Blocked by

- [#75 — Mémoriser, restaurer et effacer la date de naissance](https://github.com/cfatrane/your-life-in/issues/75). Le parcours mobile final doit ouvrir la bonne vue après restauration et revenir à l'état sans date après effacement.
- [#77 — Consulter les semaines au clavier dans une interface en français](https://github.com/cfatrane/your-life-in/issues/77). La vue mobile utilise les mêmes informations de consultation et exigences d'accessibilité ; le calendrier exact de #76 est une dépendance transitive.

Ces deux dépendances sont enregistrées nativement sur GitHub.
