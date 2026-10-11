# Premier lot — conception validée

## Choix validés

- Objectif : retrouver son calendrier et comprendre où l'on se situe, y compris sur téléphone.
- Périmètre : sauvegarde locale, semaine actuelle, légende et lecture mobile, avec les corrections de dates et d'accessibilité nécessaires.
- La date de naissance est mémorisée automatiquement dans ce navigateur. Le champ et le calendrier la retrouvent à la prochaine visite.
- Une indication « Enregistrée sur cet appareil » accompagne la sauvegarde, avec une action « Effacer ma date ».
- En cas d'échec de sauvegarde, le calendrier reste utilisable et un message explicite informe la personne.
- Sur mobile, navigation par décennie de vie ; après saisie, ouverture sur la décennie contenant la semaine actuelle.
- Sur ordinateur, la grille complète reste disponible.
- Les événements personnels, objectifs et périodes personnalisables sont reportés après ce lot.
- Une semaine de vie représente sept jours consécutifs depuis la naissance. Le regroupement par âge suit les anniversaires réels et peut contenir 52 ou 53 débuts de semaine.
- La légende distingue les semaines écoulées, la semaine actuelle et les semaines à venir. Les catégories scolaires et professionnelles sont retirées de ce lot.
- La semaine actuelle possède un contour et un repère textuel ; la couleur seule ne porte pas l'information.
- Les dates de naissance admises vont du 1er janvier 1900 au jour courant inclus, selon la date locale de l'appareil et sans heure de naissance.
- Les dates futures ou invalides sont refusées, y compris si elles proviennent de la sauvegarde.
- Toute l'interface est en français : dates, axes, détails des semaines et compteur.
- Les semaines suivent les jours civils locaux : pour une naissance le 1er janvier, la première couvre le 1er au 7 janvier inclus et la deuxième commence le 8 janvier. Un changement d'heure ne décale pas ces limites.
- Le calendrier s'actualise au changement de jour et au retour sur la page, sans exiger une nouvelle saisie.
- Pour une naissance le 29 février, le repère d'âge change le 1er mars les années non bissextiles.
- L'horizon va de la naissance au 90ᵉ anniversaire. À partir de 90 ans, toutes les cases affichées sont écoulées, aucun repère actuel n'est affiché et le message « Tu as dépassé l'horizon de ce calendrier » apparaît. Sur mobile, la dernière décennie est ouverte.
- Sur mobile, chaque décennie présente ses dix années d'âge. Une seule année est dépliée à la fois ; celle contenant la semaine actuelle s'ouvre automatiquement après saisie ou restauration.
- Les semaines de l'année dépliée sont disposées sur six colonnes avec des cibles tactiles d'au moins 44 pixels.
- Toucher une semaine affiche son numéro, ses dates et son état sous la grille. Ces détails sont accessibles au clavier sur ordinateur.
- Sans date, une invitation à renseigner sa naissance remplace le calendrier personnalisé.
- « Effacer ma date » supprime la sauvegarde, vide le champ et revient à l'état sans date. Une sauvegarde invalide est ignorée, avec une invitation à ressaisir la date.

## Limite de la dernière case — règle confirmée

Le 90ᵉ anniversaire peut couper une semaine. La dernière case représente alors uniquement sa portion dans l'horizon, avec des dates limitées à la veille de cet anniversaire. Cette case peut exceptionnellement couvrir moins de sept jours ; elle devient écoulée au 90ᵉ anniversaire. Le découpage des autres semaines reste inchangé.

Exemple : pour une naissance le 1er janvier 2000, la dernière semaine commence le 31 décembre 2089. La dernière case ne montre que ce jour, sans inclure les jours de janvier 2090.

## Parcours

1. Première visite : invitation et saisie en français, sans calendrier personnalisé.
2. Date valide choisie : affichage du calendrier et de la légende ; repère actuel si la personne a moins de 90 ans ; tentative de sauvegarde automatique.
3. Sauvegarde réussie : indication « Enregistrée sur cet appareil ». Si elle échoue, affichage d'un message explicite et maintien du calendrier utilisable pour cette visite.
4. Nouvelle visite : restauration de la même date dans le champ et le calendrier, puis calcul avec le jour courant.
5. Mobile : ouverture de la décennie et de l'année contenant la semaine actuelle ; navigation entre décennies et ouverture d'une autre année pour consulter ses semaines.
6. Consultation : sélection d'une semaine pour lire son numéro depuis la naissance, ses dates inclusives et son état.
7. Effacement réussi : aucune date conservée ni affichée, y compris après rechargement. Si l'effacement du stockage échoue, un message indique que la suppression n'a pas pu être confirmée.

## Critères d'acceptation

- Une date valide est retrouvée dans le champ et le calendrier après rechargement. Modifier la date met à jour les deux et la sauvegarde.
- Une date antérieure au 1er janvier 1900, future, impossible ou mal formée ne produit pas de calendrier personnalisé. Une naissance aujourd'hui est admise et affiche la première semaine actuelle.
- Une sauvegarde invalide ou un stockage indisponible ne bloque pas la saisie. L'indication d'enregistrement n'apparaît qu'après une sauvegarde réussie.
- Un effacement réussi reste effectif après rechargement ; un échec n'est pas présenté comme une suppression réussie.
- Pour une naissance le 1er janvier 2026 : le 7 janvier, la première case est actuelle ; le 8 janvier, elle est écoulée et la deuxième est actuelle.
- Les semaines ne se chevauchent pas et ne laissent aucun jour vide dans l'horizon. Chaque début de semaine appartient à une seule année d'âge et une seule décennie.
- Une semaine traversant un anniversaire reste rattachée à l'âge à son début. Exemple : naissance le 12 octobre 2016, semaine du 7 au 13 octobre 2026 rattachée à l'âge de 9 ans, même le jour du 10ᵉ anniversaire.
- Le cas d'une naissance le 29 février suit la convention du 1er mars, et les changements d'heure ne raccourcissent ni n'allongent une semaine en jours civils.
- Avant 90 ans, exactement une case est actuelle. À partir du 90ᵉ anniversaire, aucune ne l'est, toutes les cases affichées sont écoulées et le message hors horizon est visible. Le détail de la dernière case suit la règle confirmée ci-dessus.
- Sans date, et après effacement réussi, aucun calendrier personnalisé ni compteur n'est affiché.
- Aux largeurs de 320 et 390 pixels, la vue mobile tient dans l'écran sans défilement horizontal de page ; les semaines et commandes de navigation ont des cibles d'au moins 44 pixels.
- Changer de décennie permet de consulter ses années ; ouvrir une année ferme la précédente. Sélectionner une semaine affiche ses détails sous la grille.
- Sur ordinateur, la grille complète est disponible. Une semaine peut être consultée au clavier avec un focus visible et une description accessible de son numéro, de ses dates et de son état.
- La légende et le repère actuel restent compréhensibles sans distinguer les couleurs. L'ensemble des textes visibles et accessibles est en français.

## Preuve attendue lors de l'implémentation

- Contrôles des règles de dates avec un jour courant fixé : passage de semaine, anniversaire, 29 février, changement d'heure et horizon.
- Contrôles du parcours complet dans le navigateur : saisie, modification, restauration après rechargement, effacement, stockage invalide et erreurs de stockage.
- Contrôles visuels et interactifs aux deux largeurs mobiles et sur ordinateur : navigation, détails, absence de débordement, focus clavier et restitution accessible des informations.

Les tests internes seuls ne valideront pas l'ergonomie tactile. Une vérification sur téléphone sera nécessaire pour affirmer qu'elle fonctionne sur appareil réel.

## Portée et statut

L'utilisateur a validé le découpage en quatre tickets et confirmé la règle de la dernière case à l'étape `$to-tickets`. Les couleurs exactes et le style graphique seront à éprouver visuellement ; aucune nouvelle fonctionnalité n'est ajoutée au premier lot.

La conception seule n'autorise aucune implémentation. La demande `$to-spec` a autorisé la publication de la spec sur GitHub ; le parcours de test dans le navigateur a été confirmé à cette étape. La demande `$to-tickets` et la validation du découpage autorisent la publication des quatre sous-issues et de leurs dépendances.

## Spec publiée

La spec du premier lot est publiée dans [l'issue GitHub #74](https://github.com/cfatrane/your-life-in/issues/74), avec le label `ready-for-agent`. Sa version publiée précède la confirmation de la dernière case ; cette confirmation est intégrée au ticket du calendrier sans modifier le corps de la spec parent.

## Tickets publiés

Les quatre tickets sont des sous-issues de #74, avec le label `ready-for-agent` et des dépendances natives sur GitHub.

| Ticket                                                    | Comportement livré                             | Bloqué par |
| --------------------------------------------------------- | ---------------------------------------------- | ---------- |
| [#75](https://github.com/cfatrane/your-life-in/issues/75) | Sauvegarder, restaurer et effacer la date      | Aucun      |
| [#76](https://github.com/cfatrane/your-life-in/issues/76) | Calendrier exact, semaine actuelle et légende  | Aucun      |
| [#77](https://github.com/cfatrane/your-life-in/issues/77) | Consultation accessible et interface française | #76        |
| [#78](https://github.com/cfatrane/your-life-in/issues/78) | Navigation et consultation mobile              | #75 et #77 |

#75 et #76 peuvent être pris en charge immédiatement. La publication des tickets ne constitue pas une demande d'implémentation.
