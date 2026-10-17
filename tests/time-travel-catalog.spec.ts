import { expect, test } from "@playwright/test";

import {
  populationReferences,
  populationSource,
} from "../src/features/time-travel/data/population-references";

test("les références France correspondent au relevé officiel WPP 2024", () => {
  expect(populationReferences).toEqual([
    expect.objectContaining({
      id: "france-1950",
      country: "France",
      year: 1950,
      value: 66.382,
      sourceCell: "AI14970",
      locationCode: 250,
    }),
    expect.objectContaining({
      id: "france-2020",
      country: "France",
      year: 2020,
      value: 82.199,
      sourceCell: "AI15040",
      locationCode: 250,
    }),
  ]);
  expect(
    new Set(populationReferences.map((reference) => reference.id)).size,
  ).toBe(2);

  for (const reference of populationReferences) {
    expect(Number.isFinite(reference.value)).toBe(true);
    expect(reference.value).toBeGreaterThan(0);
    expect(reference.year).toBeLessThan(2024);
    expect(reference.sourceCell).toMatch(/^AI\d+$/);
  }
  expect(populationSource).toMatchObject({
    revision: "WPP 2024",
    sheet: "Estimates",
    verifiedOn: "2026-10-17",
    sex: "sexes réunis",
    license: "CC BY 3.0 IGO",
  });
});

test("une donnée invalide ou absente affiche une indisponibilité sans résultat trompeur", async () => {
  const { createElement } = await import("react");
  const { renderToStaticMarkup } = await import("react-dom/server");
  const { TimeTravel } =
    await import("../src/features/time-travel/components/time-travel");

  for (const references of [
    [],
    populationReferences.slice(0, 1),
    ...[NaN, Infinity, 0, -1].map((value) => [
      { ...populationReferences[0], value },
      populationReferences[1],
    ]),
  ]) {
    const html = renderToStaticMarkup(
      createElement(TimeTravel, { references }),
    );

    expect(html).toContain("Comparaison indisponible");
    expect(html).not.toContain("Résultat de la comparaison");
    expect(html).not.toContain("NaN");
  }
});
