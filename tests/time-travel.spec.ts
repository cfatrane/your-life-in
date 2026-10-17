import { expect, test } from "@playwright/test";

import { chooseDate } from "./support/birth-date";

test("la page propose une comparaison historique sans naissance ni API démographique", async ({
  request,
}) => {
  const response = await request.get("/");

  expect(response.ok()).toBe(true);
  const html = await response.text();

  expect(html).toContain("Voyage dans le temps");
  expect(html).toContain("66,4");
  expect(html).toContain("82,2");
  expect(html).toContain("15,8");
  expect(html).toContain("mortalité infantile");
  expect(html).toContain("WPP 2024");
});

test("les deux sélections sont indépendantes, au clavier, avec écarts positifs, négatifs et nuls", async ({
  page,
}) => {
  await page.goto("/");
  const section = page.getByRole("region", { name: "Voyage dans le temps" });
  const first = section.getByRole("combobox", {
    name: "Première population de référence",
    exact: true,
  });
  const second = section.getByRole("combobox", {
    name: "Seconde population de référence",
    exact: true,
  });
  const result = section.getByRole("status", {
    name: "Résultat de la comparaison",
  });

  await expect(section).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Calendrier de vie" }),
  ).toBeHidden();
  await expect(first).toHaveValue("france-1950");
  await expect(second).toHaveValue("france-2020");
  await expect(result).toContainText("66,4 ans");
  await expect(result).toContainText("82,2 ans");
  await expect(result).toContainText("+15,8 ans (valeur supérieure)");
  await first.focus();
  await page.keyboard.press("ArrowDown");
  await expect(first).toHaveValue("france-1980");
  await expect(second).toHaveValue("france-2020");
  await expect(result).toContainText("+8,0 ans (valeur supérieure)");
  await page.keyboard.press("ArrowDown");
  await expect(first).toHaveValue("france-2020");
  await expect(first).toBeFocused();
  await expect(result).toContainText("0,0 an (valeurs égales)");
  await page.keyboard.press("Tab");
  await expect(second).toBeFocused();
  expect(
    await second.evaluate((element) => getComputedStyle(element).outlineStyle),
  ).not.toBe("none");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await expect(second).toHaveValue("france-1950");
  await expect(second).toBeFocused();
  await expect(result).toContainText("-15,8 ans (valeur inférieure)");
  await expect(
    section.getByRole("link", { name: "Données ONU — WPP 2024" }),
  ).toHaveAttribute("href", /population.un.org\/wpp\/assets/);
  await expect(
    section.getByRole("link", { name: "Définition de l’indicateur" }),
  ).toHaveAttribute("href", /metadataindicators$/);
  await expect(
    section.getByRole("link", { name: "Licence CC BY 3.0 IGO" }),
  ).toHaveAttribute("href", "https://creativecommons.org/licenses/by/3.0/igo/");
  await page.reload();
  await expect(first).toHaveValue("france-1950");
  await expect(second).toHaveValue("france-2020");
});

test("les neuf choix permettent de comparer les pays et les périodes avec les valeurs vérifiées", async ({
  page,
}) => {
  await page.goto("/");
  const section = page.getByRole("region", { name: "Voyage dans le temps" });
  const selects = section.getByRole("combobox");
  const first = selects.nth(0);
  const second = selects.nth(1);
  const result = section.getByRole("status", {
    name: "Résultat de la comparaison",
  });
  // Attentes du relevé éditorial ONU, indépendantes du catalogue applicatif.
  const references = [
    ["france-1950", "France — 1950", "66,4"],
    ["france-1980", "France — 1980", "74,2"],
    ["france-2020", "France — 2020", "82,2"],
    ["royaume-uni-1950", "Royaume-Uni — 1950", "68,6"],
    ["royaume-uni-1980", "Royaume-Uni — 1980", "73,6"],
    ["royaume-uni-2020", "Royaume-Uni — 2020", "80,4"],
    ["japon-1950", "Japon — 1950", "59,3"],
    ["japon-1980", "Japon — 1980", "76,1"],
    ["japon-2020", "Japon — 2020", "84,7"],
  ];

  for (const select of [first, second]) {
    await expect(select.getByRole("option")).toHaveText(
      references.map(([, label]) => label),
    );
    await select.focus();
    for (const [id, label, value] of references) {
      await select.selectOption(id);
      await expect(select).toBeFocused();
      await expect(result).toContainText(`${label} : ${value} ans`);
    }
  }
  // Même pays, deux dates ; deux pays, même date ; pays et dates distincts.
  for (const [firstId, secondId, difference] of [
    ["japon-1950", "japon-2020", "+25,4 ans"],
    ["france-2020", "royaume-uni-2020", "-1,8 ans"],
    ["royaume-uni-1980", "japon-1950", "-14,3 ans"],
    ["japon-1980", "japon-1980", "0,0 an"],
  ]) {
    await first.selectOption(firstId);
    await second.selectOption(secondId);
    await expect(result).toContainText(difference);
    await expect(result).toContainText("Échelle commune : de 0 à");
    await expect(section).toContainText("mortalité infantile comprise");
    await expect(section).toContainText("Grande-Bretagne et Irlande du Nord");
    await expect(
      section.getByRole("link", { name: "Données ONU — WPP 2024" }),
    ).toBeVisible();
  }
  await page.reload();
  await expect(first).toHaveValue("france-1950");
  await expect(second).toHaveValue("france-2020");
});

test("la comparaison reste cadrée sur mobile et conserve le calendrier personnel et son stockage", async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date("2026-10-17T12:00:00+02:00"));
  await page.goto("/");
  await chooseDate(page, "2000-01-01", "samedi 1 janvier 2000");
  const section = page.getByRole("region", { name: "Voyage dans le temps" });
  const horizon = page.getByRole("spinbutton", {
    name: "Horizon du calendrier (ans)",
  });

  // La consultation détaillée est une partie du contexte personnel à conserver.
  await page
    .getByRole("combobox", { name: "Explorer une année" })
    .selectOption("25");
  await page.getByRole("button", { name: "Explorer cette année" }).click();
  const calendar = page.getByRole("region", { name: "Calendrier de vie" });
  const before = await calendar.ariaSnapshot();
  const stored = await page.evaluate(() => ({ ...localStorage }));
  const horizonBefore = await horizon.inputValue();
  const livedBefore = await page.locator(".story-total").textContent();

  for (const width of [320, 1280]) {
    await page.setViewportSize({ width, height: 844 });
    const selects = section.getByRole("combobox");

    await selects.nth(0).selectOption("royaume-uni-2020");
    await selects.nth(1).selectOption("japon-1950");

    for (const control of await selects.all()) {
      const box = (await control.boundingBox())!;

      expect(box.height).toBeGreaterThanOrEqual(44);
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    expect(await calendar.ariaSnapshot()).toBe(before);
    await expect(horizon).toHaveValue(horizonBefore);
    await expect(page.locator(".story-total")).toHaveText(livedBefore!);
    expect(await page.evaluate(() => ({ ...localStorage }))).toEqual(stored);
  }
  await expect(
    page.getByRole("button", { name: "Date de naissance : 1 janvier 2000" }),
  ).toBeVisible();
});
