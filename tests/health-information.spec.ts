import { expect, test } from "@playwright/test";

import { chooseDate } from "./support/birth-date";

test("les conseils santé pour adultes et leurs sources restent accessibles sans naissance", async ({
  page,
}) => {
  await page.goto("/");
  const health = page.getByRole("region", {
    name: "Des habitudes pour ta santé",
  });

  await expect(health).toBeVisible();
  await expect(health).toContainText("adultes");
  await expect(health).toContainText(
    "sans permettre de prédire une durée de vie individuelle",
  );
  await expect(
    page.getByRole("region", { name: "Calendrier de vie" }),
  ).toBeHidden();

  for (const [theme, source] of [
    [
      "Tabac",
      "https://www.ameli.fr/assure/sante/themes/tabac/astuces-arreter-fumer-sevrage",
    ],
    [
      "Mouvement",
      "https://www.ameli.fr/assure/sante/themes/activite-physique-sante/age-activite-physique",
    ],
    [
      "Alimentation",
      "https://www.ameli.fr/assure/sante/themes/alimentation/alimentation-adulte/alimentation-adulte-equilibre-repas",
    ],
    [
      "Sommeil",
      "https://www.ameli.fr/assure/sante/themes/insomnie-adulte/vivre-insomnie",
    ],
    [
      "Alcool",
      "https://www.santepubliquefrance.fr/alcool/comment-reduire-les-risques-de-la-consommation-dalcool",
    ],
  ]) {
    await expect(
      health.getByRole("heading", { name: theme, exact: true }),
    ).toBeVisible();
    await expect(
      health.getByRole("link", { name: new RegExp(theme, "i") }),
    ).toHaveAttribute("href", source);
  }
  await expect(health.getByRole("link")).toHaveCount(5);
});

test("lire les conseils au clavier et sur téléphone conserve la naissance et le calendrier", async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date("2026-10-13T12:00:00+02:00"));
  await page.goto("/");
  await chooseDate(page, "2000-01-01", "samedi 1 janvier 2000");
  const health = page.getByRole("region", {
    name: "Des habitudes pour ta santé",
  });
  const calendar = page.getByRole("region", { name: "Calendrier de vie" });
  const overview = page.getByRole("img", { name: /Aperçu des/ });
  const calendarBefore = await overview.ariaSnapshot();
  const year = page.getByRole("combobox", { name: "Explorer une année" });
  const yearBefore = await year.inputValue();
  const summaryBefore = await page.locator(".story-total").textContent();

  await expect(health).toBeVisible();
  const calendarBox = (await calendar.boundingBox())!;
  const healthBox = (await health.boundingBox())!;

  expect(healthBox.y).toBeGreaterThanOrEqual(
    calendarBox.y + calendarBox.height,
  );

  const links = health.getByRole("link");

  await links.first().focus();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Shift+Tab");

  for (let i = 0; i < 5; i++) {
    const link = links.nth(i);

    await expect(link).toBeFocused();
    expect(
      await link.evaluate((element) => getComputedStyle(element).outlineStyle),
    ).not.toBe("none");
    if (i < 4) await page.keyboard.press("Tab");
  }

  for (const width of [320, 390, 430, 1280]) {
    await page.setViewportSize({ width, height: 844 });
    await expect(health).toBeVisible();
    const box = (await health.boundingBox())!;

    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(width);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
  }

  expect(await overview.ariaSnapshot()).toBe(calendarBefore);
  await expect(year).toHaveValue(yearBefore);
  await expect(page.locator(".story-total")).toHaveText(summaryBefore!);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Date de naissance : 1 janvier 2000" }),
  ).toBeVisible();
  await expect(health.getByRole("link")).toHaveCount(5);
  expect(await overview.ariaSnapshot()).toBe(calendarBefore);
});
