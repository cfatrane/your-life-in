"use client";

import { useState } from "react";

import {
  type PopulationReference,
  populationReferences,
  populationSource,
} from "../data/population-references";

const years = new Intl.NumberFormat("fr-FR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function TimeTravel({
  references = populationReferences,
}: {
  references?: readonly PopulationReference[];
}) {
  const [firstId, setFirstId] = useState("france-1950");
  const [secondId, setSecondId] = useState("france-2020");
  const first = references.find(({ id }) => id === firstId);
  const second = references.find(({ id }) => id === secondId);
  const selected = [first, second];
  const available = selected.every(
    (reference) =>
      reference && Number.isFinite(reference.value) && reference.value > 0,
  );
  const tenths = selected.map((reference) =>
    Math.round((reference?.value ?? 0) * 10),
  );
  const difference = (tenths[1] - tenths[0]) / 10;
  const scale = Math.ceil(Math.max(...tenths) / 100) * 10;
  const differenceText = `${difference > 0 ? "+" : ""}${years.format(difference)} ${Math.abs(difference) > 1 ? "ans" : "an"} (${difference > 0 ? "valeur supérieure" : difference < 0 ? "valeur inférieure" : "valeurs égales"}).`;

  return (
    <section
      aria-labelledby="time-travel-title"
      className="story-section"
      id="time-travel"
    >
      <div className="story-shell">
        <h2 id="time-travel-title">Voyage dans le temps</h2>

        <p className="story-copy">
          Compare l’espérance de vie à la naissance de deux populations de
          référence. Ces estimations historiques concernent les sexes réunis.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {[
            {
              label: "Première population de référence",
              id: "first-reference",
              value: firstId,
              change: setFirstId,
            },
            {
              label: "Seconde population de référence",
              id: "second-reference",
              value: secondId,
              change: setSecondId,
            },
          ].map(({ label, id, value, change }) => (
            <div className="min-w-0" key={id}>
              <label className="mb-2 block" htmlFor={id}>
                {label}
              </label>

              <select
                className="story-year-select"
                id={id}
                onChange={(event) => change(event.target.value)}
                value={value}
              >
                {references.map((reference) => (
                  <option key={reference.id} value={reference.id}>
                    {`${reference.country} — ${reference.year}`}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {available ? (
          <div
            aria-label="Résultat de la comparaison"
            aria-live="polite"
            className="mt-8"
            role="status"
          >
            <p className="story-note">Échelle commune : de 0 à {scale} ans.</p>

            <ul className="mt-4 grid gap-6">
              {selected.map((reference, index) => (
                <li key={index}>
                  <p>
                    <strong>
                      {`${index + 1}. ${reference!.country} — ${reference!.year} : ${years.format(tenths[index] / 10)} ans`}
                    </strong>
                  </p>

                  <div
                    aria-hidden="true"
                    className="border-foreground bg-secondary mt-2 h-5 border-l"
                  >
                    <div
                      className="bg-primary h-full"
                      style={{
                        width: `${(tenths[index] / 10 / scale) * 100}%`,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-6 font-medium">
              {`Écart de la seconde référence par rapport à la première : ${differenceText}`}
            </p>
          </div>
        ) : (
          <p className="mt-8" role="status">
            Comparaison indisponible : une donnée est absente ou invalide. Ton
            calendrier reste accessible.
          </p>
        )}

        <div className="mt-8 grid gap-4 border-t pt-6">
          <p className="text-sm">
            Périmètre France : hors territoires ultramarins listés par l’ONU
            dans la source. Périmètre Royaume-Uni : Grande-Bretagne et Irlande
            du Nord, hors dépendances listées par l’ONU dans la source.
          </p>

          <p>
            Cet indicateur décrit une population fictive qui connaîtrait, à
            chaque âge, les conditions de mortalité de la période choisie,
            mortalité infantile comprise. Il ne décrit pas l’âge habituel de
            décès d’un adulte et ne prédit ni la durée de vie d’une personne ni
            celle de la génération née cette année-là.
          </p>

          <p>
            Ces populations ne représentent pas toute une culture. Les écarts
            ont plusieurs causes possibles : cet indicateur seul ne les explique
            pas et ne promet aucune progression continue. Cette exploration ne
            modifie pas ton horizon du calendrier.
          </p>

          <p className="text-muted-foreground text-sm">
            Source : United Nations, Department of Economic and Social Affairs,
            Population Division (2024). World Population Prospects 2024, Online
            Edition. Données vérifiées le 17 octobre 2026 ; valeurs arrondies à
            une décimale, écart calculé à partir des valeurs affichées. Extrait
            traduit et arrondi pour cette comparaison, sans approbation de
            l’ONU.
          </p>

          <div className="flex flex-wrap gap-x-6">
            <a className="story-text-link text-sm" href={populationSource.url}>
              Données ONU — {populationSource.revision}
            </a>

            <a
              className="story-text-link text-sm"
              href={populationSource.definitionUrl}
            >
              Définition de l’indicateur
            </a>

            <a
              className="story-text-link text-sm"
              href={populationSource.licenseUrl}
            >
              Licence {populationSource.license}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
