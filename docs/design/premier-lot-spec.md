# Premier lot — sauvegarde locale et calendrier lisible

## Problem Statement

Une personne doit ressaisir sa date de naissance à chaque visite et ne peut pas repérer immédiatement sa semaine actuelle. Les couleurs représentent des étapes scolaires et professionnelles qui ne correspondent pas nécessairement à son parcours, sans légende affichée. Sur téléphone, la grille de 52 colonnes ne permet pas une lecture et une consultation confortables.

Le découpage actuel assimile une année à 52 semaines, soit 364 jours, et dérive des anniversaires réels. La grille ne progresse pas lorsque la page reste ouverte. Le champ de date, le calendrier et les informations accessibles doivent rester cohérents lors de la saisie, de la restauration et de l'effacement.

## Solution

Permettre de retrouver automatiquement son calendrier dans le même navigateur, de distinguer les semaines écoulées, la semaine actuelle et les semaines à venir, et de consulter les semaines sur téléphone comme au clavier.

Le calendrier représente les semaines de vie depuis la naissance, regroupées par années d'âge réelles. Sur mobile, il présente une décennie de vie à la fois et une année dépliée à la fois. Sur ordinateur, la grille complète reste disponible. L'interface est entièrement en français et l'horizon demeure fixé au 90ᵉ anniversaire.

La gestion de la dernière case lorsqu'une semaine traverse cet horizon reste une proposition explicitement signalée dans les notes finales ; les autres décisions de conception ont été validées.

## User Stories

1. As a personne visitant le site pour la première fois, I want une invitation à renseigner ma date de naissance sans calendrier personnalisé, so that je comprenne comment commencer.
2. As a personne renseignant sa naissance, I want sélectionner une date du 1er janvier 1900 à aujourd'hui inclus, so that le calendrier représente une date admise.
3. As a personne saisissant une date impossible ou future, I want qu'elle soit refusée avec une information compréhensible, so that aucun calendrier trompeur ne soit calculé.
4. As a personne née aujourd'hui, I want voir ma première semaine comme actuelle, so that le calendrier fonctionne dès le jour de naissance.
5. As a personne utilisant le calendrier, I want que ma date soit enregistrée automatiquement dans ce navigateur, so that je puisse revenir sans la ressaisir.
6. As a personne dont la date a été enregistrée, I want voir « Enregistrée sur cet appareil », so that je sache que la sauvegarde a réussi.
7. As a personne revenant sur le site, I want retrouver la même date dans le champ et le calendrier avec le jour courant actualisé, so that l'affichage soit cohérent et à jour.
8. As a personne corrigeant sa date, I want que le champ, le calendrier et la sauvegarde changent ensemble, so that la prochaine visite retrouve la correction.
9. As a personne dont le navigateur refuse la sauvegarde, I want continuer à utiliser le calendrier avec un message explicite, so that une erreur de stockage ne bloque pas cette visite.
10. As a personne dont la sauvegarde est invalide, I want être invitée à ressaisir ma date, so that aucune donnée invalide ne produise de calendrier.
11. As a personne souhaitant supprimer sa date, I want une action « Effacer ma date » qui supprime la sauvegarde et vide l'affichage, so that la date ne soit plus retrouvée après rechargement.
12. As a personne dont l'effacement échoue, I want savoir que la suppression n'a pas pu être confirmée, so that le site ne me donne pas une fausse assurance.
13. As a personne regardant son calendrier, I want reconnaître immédiatement la semaine actuelle, so that je puisse me situer.
14. As a personne lisant la grille, I want une légende distinguant les semaines écoulées, actuelles et à venir, so that je comprenne les états des cases.
15. As a personne distinguant difficilement les couleurs, I want un contour et un repère textuel pour la semaine actuelle et des descriptions accessibles des états, so that la couleur ne soit pas mon seul moyen de lecture.
16. As a personne dont le parcours diffère des étapes scolaires et professionnelles proposées aujourd'hui, I want des états liés au temps vécu, so that la grille ne suppose pas mon parcours personnel.
17. As a personne consultant une semaine, I want connaître son numéro depuis la naissance, ses dates inclusives et son état, so that je comprenne ce que représente la case.
18. As a personne laissant la page ouverte, I want que la grille s'actualise au changement de jour, so that le repère actuel ne reste pas figé.
19. As a personne revenant sur une page restée en arrière-plan, I want un calendrier recalculé avec le jour courant, so that je n'aie pas à ressaisir ma naissance.
20. As a personne consultant son âge dans la grille, I want des années d'âge fondées sur mes anniversaires, so that les repères ne dérivent pas de mon âge réel.
21. As a personne née le 29 février, I want une convention explicite au 1er mars les années non bissextiles, so that mes repères d'âge restent prévisibles.
22. As a personne consultant le calendrier lors d'un changement d'heure, I want des semaines de sept jours civils, so that le changement d'heure ne décale pas les cases.
23. As a personne ayant au moins 90 ans, I want un message indiquant que j'ai dépassé l'horizon, sans semaine actuelle artificielle, so that la limite de représentation soit explicite.
24. As a personne utilisant un téléphone, I want ouvrir automatiquement la décennie et l'année contenant ma semaine actuelle, so that je me situe sans parcourir toute ma vie.
25. As a personne naviguant sur téléphone, I want passer d'une décennie de vie à une autre, so that je puisse consulter les autres années.
26. As a personne choisissant une année sur téléphone, I want qu'une seule année soit dépliée à la fois, so that la page reste facile à parcourir.
27. As a personne consultant une année sur téléphone, I want six colonnes de semaines et des cibles d'au moins 44 pixels, so that je puisse les toucher sans défilement horizontal de page.
28. As a personne touchant une semaine sur téléphone, I want lire ses détails sous la grille, so that je puisse les consulter sans dépendre d'une infobulle au survol.
29. As a personne utilisant un ordinateur, I want accéder à la grille complète, so that je puisse regarder l'ensemble de l'horizon.
30. As a personne utilisant le clavier, I want consulter les semaines et les commandes avec un focus visible, so that toutes les interactions soient accessibles sans souris.
31. As a personne utilisant un lecteur d'écran, I want des noms, états et détails accessibles pour les semaines et les commandes, so that je comprenne et utilise le calendrier.
32. As a personne francophone, I want les dates, axes, détails, messages et compteur en français, so that l'interface soit cohérente.

## Implementation Decisions

- La date de naissance est une date civile sans heure. Sa validation est commune à la saisie et à la restauration : date réelle, format attendu, limite basse au 1er janvier 1900, limite haute au jour courant local.
- La gestion de la date possède l'état partagé utilisé par le champ et le calendrier, ainsi que les opérations de restauration, sauvegarde et effacement. Le champ ne conserve pas une seconde date indépendante qui pourrait diverger.
- La persistance utilise le stockage local du navigateur, sans compte ni synchronisation distante. Les erreurs de lecture, d'écriture et de suppression sont traitées explicitement ; un état de succès n'est affiché qu'après l'opération réussie.
- Le calendrier reste utilisable pendant la visite si la sauvegarde est indisponible. Une sauvegarde invalide est ignorée et donne lieu à une invitation à ressaisir la date.
- Une semaine de vie commence à la date de naissance, puis tous les sept jours civils. Ses dates sont présentées avec un début et une fin inclusifs. La progression ne repose pas sur des durées fixes de 168 heures lors d'un changement d'heure.
- Les semaines sont regroupées par l'âge atteint à leur date de début. Une année d'âge peut avoir 52 ou 53 débuts de semaine. Une semaine traversant un anniversaire reste dans le groupe correspondant à son début.
- Pour une naissance le 29 février, l'anniversaire de référence est le 1er mars les années non bissextiles.
- Le jour courant local pilote les états : semaine terminée, semaine contenant ce jour, semaine dont le début est ultérieur. Le calendrier et le compteur ne doivent pas présenter des références temporelles contradictoires.
- Le calcul s'actualise au changement de jour et au retour de la page au premier plan. Le calcul des semaines reste indépendant de la fréquence de rafraîchissement visuel du compteur.
- La représentation distingue trois états, avec une légende affichée : semaine écoulée, semaine actuelle, semaine à venir. Les catégories scolaires et professionnelles actuelles sont retirées. La semaine actuelle possède un contour et un repère textuel.
- L'horizon va de la naissance incluse au 90ᵉ anniversaire exclu. À partir de cet anniversaire, toutes les cases affichées sont écoulées, aucun repère actuel n'apparaît et le message « Tu as dépassé l'horizon de ce calendrier » est affiché.
- Sur mobile, les décennies vont de 0–9 à 80–89 ans. Après saisie ou restauration, la décennie et l'année contenant le début de la semaine actuelle sont ouvertes. Hors horizon, la dernière décennie est ouverte.
- Une seule année mobile est dépliée à la fois. Les semaines sont disposées sur six colonnes ; les cibles tactiles des semaines et des commandes de navigation mesurent au moins 44 pixels.
- La sélection d'une semaine affiche son numéro depuis la naissance, ses dates et son état sous la grille mobile. La consultation reste accessible au clavier sur ordinateur, avec un focus visible et des descriptions accessibles.
- La grille complète reste disponible sur ordinateur. Les composants d'interface existants sont réutilisés lorsqu'ils conviennent ; aucune dépendance supplémentaire n'est requise pour le modèle métier ou la persistance.
- Sans date valide, le calendrier personnalisé et le compteur ne sont pas affichés. Un effacement réussi ramène à cet état et persiste après rechargement.
- L'ensemble des contenus visibles et accessibles est en français. Le choix final des couleurs et du style sera évalué visuellement sans modifier les règles métier.

## Testing Decisions

- Point de vérification principal validé par l'utilisateur : le parcours observable dans le navigateur, depuis la saisie jusqu'à la restauration après rechargement, l'effacement et la consultation des semaines, avec une date courante contrôlée pour les cas limites.
- Les assertions portent sur des comportements visibles et accessibles, pas sur l'organisation des composants, les fonctions appelées ou le format interne des états.
- La date courante et le stockage sont contrôlables dans les scénarios de test pour reproduire les limites sans attendre le passage réel du temps ni dépendre du navigateur personnel de l'utilisateur.
- Les fonctionnalités vérifiées sont la saisie et la persistance de la date, le découpage et les états du calendrier, la légende, la navigation par décennie et année, la consultation des détails et l'accès au clavier.
- Aucun fichier de test, configuration de runner ou script de test n'a été trouvé dans le dépôt actuel. Il n'existe donc pas de précédent local à recopier. L'implémentation choisira le minimum d'outillage nécessaire pour vérifier ces comportements.
- Des contrôles ciblés des règles de dates peuvent compléter le parcours navigateur pour les anniversaires, les changements d'heure et l'horizon ; ils ne remplacent pas les vérifications de restauration et d'interaction.

### Scénarios d'acceptation

1. Choisir une date admise affiche le calendrier correspondant. Après rechargement, le champ et la grille retrouvent cette même date et le calcul utilise le jour courant.
2. Corriger la date actualise immédiatement le champ et la grille ; le prochain rechargement retrouve la date corrigée.
3. Les dates avant le 1er janvier 1900, futures, impossibles ou mal formées sont refusées. Une naissance aujourd'hui est acceptée et sa première semaine est actuelle.
4. Une sauvegarde invalide ne produit pas de calendrier personnalisé et invite à ressaisir. Une impossibilité de sauvegarder laisse le calendrier utilisable et affiche une erreur, sans indication mensongère d'enregistrement.
5. Effacer la date avec succès vide le champ, retire le calendrier et le compteur et reste effectif après rechargement. Une suppression qui échoue ne se présente pas comme réussie.
6. Pour une naissance le 1er janvier 2026, le 7 janvier la première semaine est actuelle ; le 8 janvier elle est écoulée et la deuxième est actuelle. Le passage est vérifié page ouverte et au retour au premier plan.
7. Les semaines ne se chevauchent pas et ne laissent aucun jour vide dans l'horizon. Chaque début de semaine appartient à une seule année d'âge et à une seule décennie.
8. Pour une naissance le 12 octobre 2016, la semaine du 7 au 13 octobre 2026 reste rattachée à l'âge de 9 ans, y compris le 12 octobre. La navigation initiale suit le groupe contenant cette semaine.
9. Pour une naissance le 29 février, le repère d'âge suit la convention du 1er mars les années non bissextiles. Un changement d'heure ne modifie pas le nombre de jours civils d'une semaine.
10. Avant 90 ans, une seule semaine de l'ensemble du calendrier est actuelle. À partir du 90ᵉ anniversaire, aucune case n'est actuelle, toutes les cases affichées sont écoulées et le message hors horizon est visible.
11. Aux largeurs de 320 et 390 pixels, la vue mobile tient dans l'écran sans défilement horizontal de page. Les cibles des semaines et commandes mesurent au moins 44 pixels.
12. Sur mobile, changer de décennie rend ses années consultables ; ouvrir une année ferme la précédente. Toucher une semaine affiche ses détails sous la grille.
13. Sur ordinateur, la grille complète est disponible et la consultation d'une semaine est possible au clavier, avec focus visible et numéro, dates et état accessibles.
14. La légende explique les trois états. La semaine actuelle est reconnaissable sans distinguer les couleurs. Les contenus visibles et accessibles sont en français.
15. Après confirmation de la règle proposée pour la dernière case, son détail respecte la veille du 90ᵉ anniversaire ; le calendrier ne montre aucun jour au-delà de l'horizon.

- Une vérification visuelle complète les assertions pour la lisibilité et l'absence de débordement. Une vérification sur téléphone est nécessaire avant d'affirmer que l'ergonomie tactile est validée sur appareil réel ; une émulation de viewport ne suffit pas à cette affirmation.

## Out of Scope

- Événements et souvenirs personnels, objectifs datés et bilans hebdomadaires.
- Personnalisation des périodes de vie et de l'horizon.
- Export d'image ou de PDF, impression et partage de calendrier.
- Comptes utilisateurs, stockage côté serveur et synchronisation entre appareils.
- Nouvelles langues autres que le français.
- Refonte générale, changement de framework et nettoyage technique sans lien avec les quatre améliorations.

## Further Notes

- La demande porte sur une spec ; aucune implémentation de production n'est autorisée par sa publication.
- **Décision restant à confirmer avant l'implémentation de la limite des 90 ans :** si la dernière semaine dépasse l'horizon, afficher uniquement sa portion avant le 90ᵉ anniversaire. Cette dernière case représenterait exceptionnellement moins de sept jours et deviendrait écoulée à cet anniversaire. Le découpage des autres semaines resterait inchangé.
- Exemple de cette proposition : pour une naissance le 1er janvier 2000, la dernière case montrerait uniquement le 31 décembre 2089, sans les jours de janvier 2090 de la même semaine de vie. Cette exception concerne la portion représentée dans l'horizon, pas la définition générale d'une semaine de vie.
- Cette proposition a été présentée mais n'a pas reçu de confirmation explicite. Elle ne doit pas être assimilée à une décision déjà validée lors du découpage des tickets.
- Le choix des teintes et du style graphique reste à éprouver visuellement. Il ne doit pas modifier les états, la lisibilité sans couleur ni les exigences d'accessibilité.
