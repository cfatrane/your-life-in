# Your Life In Weeks

Une application web en français pour prendre du recul sur le temps d’une vie.
Saisis ta date de naissance pour visualiser les semaines déjà vécues dans un
calendrier dont tu choisis l’horizon de 1 à 120 ans (90 ans par défaut), et
consulter le temps écoulé depuis ta naissance. Cet horizon est un repère
personnel, pas une prédiction. Le choix d’horizon reste mémorisé dans ce navigateur.

L’application fonctionne sans compte. Ta date de naissance et ton horizon sont mémorisés
localement dans ton navigateur pour être retrouvés entre les visites.
« Revenir à 90 ans » conserve ta naissance ; « Effacer mes données » supprime
les deux réglages. Si le stockage est refusé, le calendrier reste utilisable
pour la visite et un message signale l’échec.

Essayer : [https://your-life-in.vercel.app/](https://your-life-in.vercel.app/)

Inspiré de [Your Life In Weeks](https://waitbutwhy.com/2014/05/life-weeks.html) par [Wait But Why](https://waitbutwhy.com/).

> Each row of weeks makes up one year. That’s how many weeks it takes to turn a newborn into a 90-year-old.
>
> It kind of feels like our lives are made up of a countless number of weeks. But there they are—fully countable—staring you in the face.
>
> Sometimes life seems really short, and other times it seems impossibly long. But this chart helps to emphasize that it’s most certainly finite. Those are your weeks and they’re all you’ve got.

![alt text](<Your Life In Weeks.jpeg>)

## Tests

```sh
bun install
bunx playwright install chromium
bun run test
bun run typecheck
```

Les tests navigateur lancent le serveur local sur le port 3075. Ils vérifient
la saisie, la restauration et l’effacement de la date et de l’horizon, ainsi que les erreurs
de stockage, avec une date courante contrôlée.
