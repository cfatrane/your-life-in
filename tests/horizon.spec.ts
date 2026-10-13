import { expect, test } from "@playwright/test";

import { chooseDate } from "./support/birth-date";

test("l’horizon est appliqué sur demande, les erreurs gardent la grille et le compteur indépendant", async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date("2026-01-08T12:00:00+01:00"));
  await page.goto("/");
  const input = page.getByRole("spinbutton", {
    name: "Horizon du calendrier (ans)",
  });
  const apply = page.getByRole("button", { name: "Appliquer", exact: true });

  await expect(input).toHaveValue("90");
  await expect(
    page.getByText("Cet horizon est un repère personnel, pas une prédiction."),
  ).toBeVisible();
  await input.fill("75");
  await apply.click();
  await expect(
    page.getByRole("img", { name: "Aperçu des 75 années" }),
  ).toHaveCount(0);
  await chooseDate(page, "2000-01-01", "samedi 1 janvier 2000");
  const overview = page.getByRole("img", { name: "Aperçu des 75 années" });

  await expect(overview).toBeVisible();
  const lived = await page.locator(".story-total").textContent();
  const birthday = await page.locator(".story-birthday").textContent();

  await input.fill("1");
  await expect(overview).toBeVisible();
  await input.press("Enter");
  await expect(input).toBeFocused();
  await expect(
    page.getByRole("img", { name: "Aperçu de 1 année" }),
  ).toBeVisible();
  await expect(
    page.getByText("Tu as dépassé l'horizon choisi", { exact: true }),
  ).toBeVisible();
  await expect(
    page.locator(".life-points circle[data-state=current]"),
  ).toHaveCount(0);
  await expect(
    page.locator(".life-points circle[data-state=future]"),
  ).toHaveCount(0);
  await expect(page.locator(".story-total")).toHaveText(lived!);
  await expect(page.locator(".story-birthday")).toHaveText(birthday!);
  await expect(page.getByText(/^26 ans 0 mois 7 jours/)).toBeVisible();

  for (const value of ["", "1.5", "0", "121"]) {
    await input.fill(value);
    await apply.click();
    await expect(
      page
        .getByRole("alert")
        .filter({ hasText: "Choisis un âge entier entre 1 et 120 ans." }),
    ).toHaveText("Choisis un âge entier entre 1 et 120 ans.");
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAccessibleDescription(
      /Choisis un âge entier entre 1 et 120 ans/,
    );
    await expect(
      page.getByRole("img", { name: "Aperçu de 1 année" }),
    ).toBeVisible();
  }
  await page.getByRole("button", { name: "Revenir à 90 ans" }).click();
  await expect(input).toHaveValue("90");
  await expect(
    page
      .getByRole("alert")
      .filter({ hasText: "Choisis un âge entier entre 1 et 120 ans." }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("img", { name: "Aperçu des 90 années" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Date de naissance : 1 janvier 2000" }),
  ).toBeVisible();
});

test("les horizons extrêmes restent cadrés, la modification ferme le détail et conserve la naissance", async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date("2026-01-08T12:00:00+01:00"));
  await page.goto("/");
  await chooseDate(page, "2000-01-01", "samedi 1 janvier 2000");
  const input = page.getByRole("spinbutton", {
    name: "Horizon du calendrier (ans)",
  });
  const apply = page.getByRole("button", { name: "Appliquer", exact: true });
  const year = page.getByRole("combobox", { name: "Explorer une année" });
  const explore = page.getByRole("button", { name: "Explorer cette année" });

  await explore.click();
  await page.getByRole("button", { name: /^Semaine 1358,/ }).click();
  await input.fill("90");
  await apply.click();
  await expect(
    page.getByRole("status", { name: "Détails de la semaine" }),
  ).toContainText("Semaine 1358");

  for (const horizon of [1, 120]) {
    await input.fill(String(horizon));
    await input.press("Enter");
    await expect(input).toBeFocused();
    const overview = page.getByRole("img", {
      name: horizon === 1 ? "Aperçu de 1 année" : "Aperçu des 120 années",
    });

    await expect(overview).toBeVisible();
    await expect(
      page.getByRole("status", { name: "Détails de la semaine" }),
    ).toHaveCount(0);
    await expect(year.locator("option")).toHaveCount(horizon);
    await expect(overview).toHaveAccessibleDescription(
      new RegExp(`De 0 à ${horizon - 1} ans`),
    );

    for (const width of [1280, 320, 390, 430]) {
      await page.setViewportSize({ width, height: 844 });
      await expect(overview.locator("g[data-age]")).toHaveCount(horizon);
      const box = (await overview.boundingBox())!;

      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
      const lastPoint = overview.locator("circle[data-week]").last();
      const lastBox = (await lastPoint.boundingBox())!;

      expect(lastBox.y + lastBox.height).toBeLessThanOrEqual(
        box.y + box.height,
      );

      for (const control of [
        input,
        apply,
        page.getByRole("button", { name: "Revenir à 90 ans" }),
      ]) {
        const target = (await control.boundingBox())!;

        expect(target.height).toBeGreaterThanOrEqual(44);
        expect(target.width).toBeGreaterThanOrEqual(44);
      }
    }
    await year.selectOption(String(horizon - 1));
    await year.focus();
    await page.keyboard.press("Tab");
    await expect(explore).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("heading", {
        name: horizon === 1 ? "De 0 à 1 an" : "De 119 à 120 ans",
      }),
    ).toBeFocused();
    await page
      .getByRole("button", { name: /^Semaine / })
      .last()
      .click();
    await expect(
      page.getByRole("status", { name: "Détails de la semaine" }),
    ).toContainText(horizon === 1 ? "31 décembre 2000" : "31 décembre 2119");
  }
  await chooseDate(page, "2000-01-02", "dimanche 2 janvier 2000");
  await expect(input).toHaveValue("120");
  await expect(
    page.getByRole("img", { name: "Aperçu des 120 années" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Revenir à 90 ans" }).click();
  await expect(
    page.getByRole("button", { name: "Revenir à 90 ans" }),
  ).toBeFocused();
  await expect(
    page.getByRole("img", { name: "Aperçu des 90 années" }),
  ).toBeVisible();
});

test("le compteur continue quand l’horizon est écoulé et le jour limite supprime la semaine actuelle", async ({
  page,
}) => {
  const time = new Date("2025-02-28T23:59:59+01:00");

  await page.clock.install({ time });
  await page.clock.pauseAt(time);
  await page.goto("/");
  await chooseDate(page, "2024-02-29", "jeudi 29 février 2024");
  const input = page.getByRole("spinbutton", {
    name: "Horizon du calendrier (ans)",
  });

  await input.fill("1");
  await input.press("Enter");
  const overview = page.getByRole("img", { name: "Aperçu de 1 année" });

  await expect(overview.locator("circle[data-state=current]")).toHaveCount(1);
  await page.getByRole("button", { name: "Explorer cette année" }).click();
  const last = page.getByRole("button", { name: /^Semaine 53,/ });

  await expect(last).toHaveAccessibleName(
    "Semaine 53, du 27 février 2025 au 28 février 2025 — Semaine actuelle",
  );
  await page.clock.runFor(1000);
  await expect(last).toHaveAccessibleName(
    "Semaine 53, du 27 février 2025 au 28 février 2025 — Semaine écoulée",
  );
  await expect(
    page.getByText("Tu as dépassé l'horizon choisi", { exact: true }),
  ).toBeVisible();
  await expect(page.locator(".story-birthday")).toContainText(
    "C’est ton anniversaire !",
  );
  const counter = page.locator(".elapsed-time");
  const before = await counter.textContent();

  await page.clock.runFor(100);
  await expect(counter).not.toHaveText(before!);
});
