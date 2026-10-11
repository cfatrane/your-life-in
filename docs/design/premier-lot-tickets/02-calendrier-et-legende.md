# Situer la semaine actuelle dans un calendrier exact avec légende

## Parent

[Spec #74 — sauvegarde locale, semaine actuelle, légende et lecture mobile](https://github.com/cfatrane/your-life-in/issues/74).

## What to build

À partir d'une date de naissance saisie, afficher les semaines de vie regroupées par années d'âge réelles, avec une seule semaine actuelle, une légende des trois états et un horizon au 90ᵉ anniversaire. Le calendrier progresse lorsque le jour change ou lorsque la personne revient sur la page.

Cette tranche est démontrable avec la saisie existante, sans dépendre de la persistance. Elle remplace la grille schématique de 52 semaines par année et les couleurs des étapes scolaires et professionnelles.

## Acceptance criteria

- [ ] Une semaine représente sept jours civils depuis la naissance, indépendamment des changements d'heure. La première commence le jour de naissance ; la suivante commence sept jours plus tard.
- [ ] Les semaines sont regroupées par l'âge à leur date de début. Une année d'âge peut contenir 52 ou 53 débuts de semaine. Les semaines ne se chevauchent pas, ne laissent aucun jour vide dans l'horizon et appartiennent chacune à un seul groupe.
- [ ] Pour une naissance le 12 octobre 2016, la semaine du 7 au 13 octobre 2026 reste rattachée à l'âge de 9 ans, y compris le 12 octobre.
- [ ] Pour une naissance le 29 février, l'anniversaire de référence est le 1er mars les années non bissextiles.
- [ ] Avant 90 ans, une seule case de l'ensemble du calendrier est actuelle. Une naissance aujourd'hui place la première case dans cet état.
- [ ] La grille distingue semaines écoulées, actuelle et à venir. La légende explique ces états en français et remplace les catégories scolaires et professionnelles.
- [ ] La semaine actuelle a un contour et un repère textuel ; les états possèdent des descriptions accessibles et ne reposent pas uniquement sur les couleurs.
- [ ] Pour une naissance le 1er janvier 2026, le 7 janvier la première case est actuelle ; le 8 janvier elle est écoulée et la deuxième est actuelle. L'affichage progresse au changement de jour et au retour au premier plan, sans ressaisie.
- [ ] Le calendrier et le compteur utilisent des références temporelles cohérentes. Le rafraîchissement des semaines ne dépend pas de la fréquence visuelle du compteur.
- [ ] À partir du 90ᵉ anniversaire, toutes les cases affichées sont écoulées, aucune n'est actuelle et le message « Tu as dépassé l'horizon de ce calendrier » est affiché.
- [ ] La dernière case ne représente que la portion de semaine précédant le 90ᵉ anniversaire, éventuellement moins de sept jours. Pour une naissance le 1er janvier 2000, elle ne montre que le 31 décembre 2089 et devient écoulée le 1er janvier 2090. Cette règle a été confirmée par l'utilisateur lors du découpage des tickets, après publication de la spec parent.
- [ ] La grille complète est disponible sur ordinateur, avec des repères d'âge et des états en français.
- [ ] Les comportements sont vérifiés depuis le calendrier affiché avec un jour courant contrôlé : naissance aujourd'hui, passage de semaine, anniversaire traversé, 29 février, changement d'heure, retour sur la page et horizon. Des contrôles ciblés des invariants complètent ces scénarios si nécessaire.

## Blocked by

None (can start immediately).
