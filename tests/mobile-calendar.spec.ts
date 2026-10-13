import { expect, test } from "@playwright/test";

import { chooseDate } from "./support/birth-date";

test.use({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});

test("toute la vie reste cadrée sur mobile, puis une année se consulte et le retour conserve le contexte", async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date("2026-01-08T12:00:00+01:00"));
  await page.goto("/");
  await chooseDate(page, "2000-01-01", "samedi 1 janvier 2000");
  const overview = page.getByRole("img", { name: "Aperçu des 90 années" });
  const explore = page.getByRole("button", { name: "Explorer cette année" });
  const year = page.getByRole("combobox", { name: "Explorer une année" });

  await expect(year).toHaveValue("26");
  await expect(year.locator("option")).toHaveCount(90);

  for (const width of [320, 390, 430]) {
    await page.setViewportSize({ width, height: 844 });
    await expect(overview).toBeVisible();
    const box = (await overview.boundingBox())!;

    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(width);
    expect(box.height).toBe(736);
    await expect(overview.locator("g[data-age]")).toHaveCount(90);
    await expect(overview.locator("circle[data-week]")).toHaveCount(4697);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
  }
  await year.selectOption("0");
  await explore.scrollIntoViewIfNeeded();
  const before = await page.evaluate(() => window.scrollY);

  await explore.click();
  await expect(overview).toBeHidden();
  await expect(
    page.getByRole("heading", { name: "De 0 à 1 an" }),
  ).toBeFocused();
  await expect(
    page.getByText("Du 1 janvier 2000 au 31 décembre 2000", { exact: true }),
  ).toBeVisible();
  const first = page.getByRole("button", {
    name: "Semaine 1, du 1 janvier 2000 au 7 janvier 2000 — Semaine écoulée",
    exact: true,
  });
  const box = (await first.boundingBox())!;

  expect(box.width).toBeGreaterThanOrEqual(48);
  expect(box.height).toBeGreaterThanOrEqual(48);
  await first.tap();
  await expect(
    page.getByRole("status", { name: "Détails de la semaine" }),
  ).toHaveText((await first.getAttribute("aria-label")) as string);
  await page.getByRole("button", { name: "Revenir à toute ma vie" }).click();
  await expect(overview).toBeVisible();
  await expect(explore).toBeFocused();
  await expect(year).toHaveValue("0");
  expect(await page.evaluate(() => window.scrollY)).toBeCloseTo(before, 0);
  await year.selectOption("89");
  await explore.click();
  await expect(
    page.getByRole("heading", { name: "De 89 à 90 ans" }),
  ).toBeVisible();
});

test("la date restaurée ouvre l’année actuelle et son changement réinitialise le détail", async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date("2026-01-08T12:00:00+01:00"));
  await page.goto("/");
  await chooseDate(page, "2026-01-01", "jeudi 1 janvier 2026");
  await page.reload();
  const overview = page.getByRole("img", { name: "Aperçu des 90 années" });
  const explore = page.getByRole("button", { name: "Explorer cette année" });

  await expect(overview).toBeVisible();
  await expect(
    page.getByRole("combobox", { name: "Explorer une année" }),
  ).toHaveValue("0");
  await explore.click();
  const current = page.getByRole("button", {
    name: /^Semaine 2,.*Semaine actuelle$/,
  });

  await expect(current).toHaveAttribute("aria-current", "date");
  await current.click();
  await page.clock.setFixedTime(new Date("2026-01-15T12:00:00+01:00"));
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  await expect(
    page.getByRole("status", { name: "Détails de la semaine" }),
  ).toContainText("Semaine écoulée");
  await expect(page.getByText(/^0 ans 0 mois 14 jours/)).toBeVisible();
  await chooseDate(page, "2026-01-02", "vendredi 2 janvier 2026");
  await expect(overview).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Revenir à toute ma vie" }),
  ).toBeHidden();
  await page.getByRole("combobox", { name: "Explorer une année" }).focus();
  await page.keyboard.press("Tab");
  await expect(explore).toBeFocused();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  const first = page.getByRole("button", { name: /^Semaine 1,/ });

  await expect(first).toBeFocused();
  await page.keyboard.press("Space");
  await expect(first).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("button", { name: "Revenir à toute ma vie" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(explore).toBeFocused();
  await page.getByRole("button", { name: "Effacer ma date" }).click();
  await expect(overview).toBeHidden();
  await expect(
    page.getByRole("button", { name: "Sélectionne ta date de naissance" }),
  ).toBeFocused();
  await expect(
    page.getByText(
      "Sélectionne ta date de naissance pour afficher ton calendrier.",
    ),
  ).toBeVisible();
});

test("le compteur animé continue dans l’aperçu et dans le détail sans annonce live", async ({
  page,
}) => {
  const time = new Date("2026-01-08T12:00:00+01:00");

  await page.clock.install({ time });
  await page.clock.pauseAt(time);
  await page.goto("/");
  await chooseDate(page, "2026-01-01", "jeudi 1 janvier 2026");
  const counter = page.getByText(/^0 ans 0 mois 7 jours/);

  for (const detail of [false, true]) {
    if (detail)
      await page.getByRole("button", { name: "Explorer cette année" }).click();
    const before = await counter.textContent();

    await page.clock.runFor(100);
    await expect(counter).not.toHaveText(before!);
    expect(
      await counter.evaluate((element) =>
        element.closest('[aria-live], [role="status"], [role="alert"]'),
      ),
    ).toBeNull();
  }
});

for (const scenario of [
  {
    birth: "2026-01-08",
    day: "Aujourd'hui, jeudi 8 janvier 2026",
    age: "0",
    current: 1,
  },
  { birth: "1900-01-01", day: "lundi 1 janvier 1900", age: "89", current: 0 },
]) {
  test(`l’aperçu et le détail restent cohérents pour une naissance le ${scenario.birth}`, async ({
    page,
  }) => {
    await page.clock.setFixedTime(new Date("2026-01-08T12:00:00+01:00"));
    await page.goto("/");
    await chooseDate(page, scenario.birth, scenario.day);
    await expect(
      page.getByRole("img", { name: "Aperçu des 90 années" }),
    ).toBeVisible();
    await expect(
      page.getByRole("combobox", { name: "Explorer une année" }),
    ).toHaveValue(scenario.age);
    await page.getByRole("button", { name: "Explorer cette année" }).click();
    await expect(
      page.getByRole("button", { name: /Semaine actuelle$/ }),
    ).toHaveCount(scenario.current);
    await expect(page.getByRole("button", { name: /^Semaine / })).toHaveCount(
      scenario.current ? 53 : 52,
    );
    if (!scenario.current)
      await expect(
        page.getByText("Tu as dépassé l'horizon choisi", {
          exact: true,
        }),
      ).toBeVisible();
  });
}
