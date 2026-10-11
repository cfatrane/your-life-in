# Mémoriser, restaurer et effacer la date de naissance

## Parent

[Spec #74 — sauvegarde locale, semaine actuelle, légende et lecture mobile](https://github.com/cfatrane/your-life-in/issues/74).

## What to build

Permettre de sélectionner une date de naissance valide, de la retrouver dans le champ et le calendrier après rechargement, de la modifier et de l'effacer. La sauvegarde est automatique dans ce navigateur. Les erreurs de stockage et les dates invalides n'empêchent pas une nouvelle saisie et ne produisent aucune indication de succès trompeuse.

Cette tranche fonctionne avec la représentation actuelle du calendrier ; sa précision et sa nouvelle légende sont livrées séparément.

## Acceptance criteria

- [ ] Sans date valide, une invitation en français est affichée, sans calendrier personnalisé ni compteur.
- [ ] Une date civile réelle du 1er janvier 1900 au jour courant local inclus est admise. Les dates antérieures, futures, impossibles et mal formées sont refusées à la saisie comme à la restauration.
- [ ] Choisir une date affiche le calendrier. La sauvegarde automatique réussie affiche « Enregistrée sur cet appareil » ; cette indication n'apparaît pas en cas d'échec.
- [ ] Après rechargement, le champ et le calendrier retrouvent la même date. Modifier la date actualise les deux et la date sauvegardée, sans état de date indépendant qui pourrait diverger.
- [ ] Une sauvegarde invalide est ignorée et invite à ressaisir la date. Une erreur de lecture ou d'écriture est explicitement signalée et laisse le calendrier utilisable pour la visite après saisie valide.
- [ ] « Effacer ma date » supprime la sauvegarde, vide le champ et retire calendrier et compteur. Après suppression réussie, recharger ne restaure aucune date.
- [ ] Un échec de suppression indique que l'effacement n'a pas pu être confirmé ; il n'est pas présenté comme une suppression réussie.
- [ ] La saisie, les messages et l'effacement sont utilisables au clavier avec des libellés accessibles en français.
- [ ] Le parcours est vérifié dans le navigateur : première saisie, modification, rechargement, effacement, sauvegarde invalide et erreurs de lecture, d'écriture et de suppression. Les assertions portent sur l'affichage et le résultat de la nouvelle visite.

## Blocked by

None (can start immediately).
