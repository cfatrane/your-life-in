import { expect, test } from "@playwright/test";

import {
  populationReferences,
  populationSource,
} from "../src/features/time-travel/data/population-references";

test("les neuf populations de référence correspondent au relevé officiel WPP 2024", () => {
  expect(populationReferences).toEqual(
    [
      ["france-1950", "France", 1950, 66.382, 250, "AI14970"],
      ["france-1980", "France", 1980, 74.234, 250, "AI15000"],
      ["france-2020", "France", 2020, 82.199, 250, "AI15040"],
      ["royaume-uni-1950", "Royaume-Uni", 1950, 68.631, 826, "AI13342"],
      ["royaume-uni-1980", "Royaume-Uni", 1980, 73.591, 826, "AI13372"],
      ["royaume-uni-2020", "Royaume-Uni", 2020, 80.385, 826, "AI13412"],
      ["japon-1950", "Japon", 1950, 59.255, 392, "AI8162"],
      ["japon-1980", "Japon", 1980, 76.141, 392, "AI8192"],
      ["japon-2020", "Japon", 2020, 84.67, 392, "AI8232"],
    ].map(([id, country, year, value, locationCode, sourceCell]) => ({
      id,
      country,
      year,
      value,
      locationCode,
      sourceCell,
    })),
  );
  expect(
    new Set(populationReferences.map((reference) => reference.id)).size,
  ).toBe(9);

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
      populationReferences.find(({ id }) => id === "france-2020")!,
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
