const healthTips = [
  {
    theme: "Tabac",
    advice:
      "Pour arrêter de fumer, fais-toi accompagner par un professionnel de santé.",
    source: "Tabac : se faire accompagner — Assurance Maladie",
    url: "https://www.ameli.fr/assure/sante/themes/tabac/astuces-arreter-fumer-sevrage",
  },
  {
    theme: "Mouvement",
    advice:
      "Bouge régulièrement au quotidien, avec des activités adaptées à tes capacités.",
    source: "Mouvement : l’activité physique des adultes — Assurance Maladie",
    url: "https://www.ameli.fr/assure/sante/themes/activite-physique-sante/age-activite-physique",
  },
  {
    theme: "Alimentation",
    advice:
      "Privilégie une alimentation variée et des repas équilibrés au fil de la semaine.",
    source: "Alimentation : varier et équilibrer ses repas — Assurance Maladie",
    url: "https://www.ameli.fr/assure/sante/themes/alimentation/alimentation-adulte/alimentation-adulte-equilibre-repas",
  },
  {
    theme: "Sommeil",
    advice: "Essaie de garder des horaires de coucher et de lever réguliers.",
    source: "Sommeil : mieux dormir à l’âge adulte — Assurance Maladie",
    url: "https://www.ameli.fr/assure/sante/themes/insomnie-adulte/vivre-insomnie",
  },
  {
    theme: "Alcool",
    advice:
      "Réduis ta consommation d’alcool : toute consommation comporte des risques pour la santé.",
    source: "Alcool : réduire les risques — Santé publique France",
    url: "https://www.santepubliquefrance.fr/alcool/comment-reduire-les-risques-de-la-consommation-dalcool",
  },
];

export function HealthInformation() {
  return (
    <section
      aria-labelledby="health-title"
      className="story-section story-soft"
    >
      <div className="story-shell">
        <h2 id="health-title">Des habitudes pour ta santé</h2>

        <p className="story-copy">
          Ces conseils généraux concernent les adultes. Les habitudes de vie
          influencent la santé, sans permettre de prédire une durée de vie
          individuelle.
        </p>

        <ul className="mt-8 grid gap-8 sm:grid-cols-2">
          {healthTips.map(({ theme, advice, source, url }) => (
            <li className="border-t pt-6" key={theme}>
              <h3 className="text-xl font-medium">{theme}</h3>

              <p className="mt-3">{advice}</p>

              <a className="story-text-link mt-3 text-sm" href={url}>
                {source}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
