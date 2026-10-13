import { expect, test } from "@playwright/test";

import { chooseDate } from "./support/birth-date";

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-01-08T12:00:00+01:00"));
  await page.goto("/");
  await chooseDate(page, "2026-01-01", "jeudi 1 janvier 2026");
  await expect(
    page.getByRole("button", { name: "Date de naissance : 1 janvier 2026" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Explorer cette année" }).click();
});

test("les détails restent lisibles sans survol et suivent la semaine consultée", async ({
  page,
}) => {
  const details = page.getByRole("status", { name: "Détails de la semaine" });

  for (const description of [
    "Semaine 1, du 1 janvier 2026 au 7 janvier 2026 — Semaine écoulée",
    "Semaine 2, du 8 janvier 2026 au 14 janvier 2026 — Semaine actuelle",
    "Semaine 3, du 15 janvier 2026 au 21 janvier 2026 — Semaine à venir",
  ]) {
    const week = page.getByRole("button", { name: description, exact: true });

    await week.click();
    await page.mouse.move(0, 0);
    await expect(details).toHaveText(description);
    await expect(details).toBeInViewport();
    await expect(week).toHaveAttribute("aria-pressed", "true");
    await expect(
      page.getByRole("button", { name: /^Semaine /, pressed: true }),
    ).toHaveCount(1);
  }
  await expect(
    page.getByRole("button", { name: /Semaine actuelle$/ }),
  ).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: "Date de naissance : 1 janvier 2026" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Revenir à toute ma vie" }).click();
  await page
    .getByRole("combobox", { name: "Explorer une année" })
    .selectOption("89");
  await page.getByRole("button", { name: "Explorer cette année" }).click();
  const lastWeek = page.getByRole("button", { name: /^Semaine / }).last();

  await lastWeek.click();
  await expect(details).toHaveText(
    (await lastWeek.getAttribute("aria-label"))!,
  );
  await expect(details).toBeInViewport();
});

test("Tab, Entrée et Espace permettent de consulter les semaines avec un focus visible", async ({
  page,
}) => {
  const details = page.getByRole("status", { name: "Détails de la semaine" });
  const first = page.getByRole("button", { name: /^Semaine 1,/ });
  const second = page.getByRole("button", { name: /^Semaine 2,/ });

  await page.getByRole("heading", { name: "De 0 à 1 an" }).focus();
  await page.keyboard.press("Tab");
  await expect(first).toBeFocused();
  expect(
    await first.evaluate((button) => ({
      visible: button.matches(":focus-visible"),
      shadow: getComputedStyle(button).boxShadow,
    })),
  ).toEqual({ visible: true, shadow: expect.not.stringMatching(/^none$/) });
  await page.keyboard.press("Enter");
  await expect(details).toHaveText(
    "Semaine 1, du 1 janvier 2026 au 7 janvier 2026 — Semaine écoulée",
  );
  await expect(first).toBeFocused();

  await page.keyboard.press("Tab");
  await expect(second).toBeFocused();
  await page.keyboard.press("Space");
  await expect(details).toHaveText(
    "Semaine 2, du 8 janvier 2026 au 14 janvier 2026 — Semaine actuelle",
  );
  await expect(second).toHaveAttribute("aria-pressed", "true");
  await expect(first).toHaveAttribute("aria-pressed", "false");
  await page.keyboard.press("Shift+Tab");
  await expect(first).toBeFocused();
});

test.describe("dans un navigateur anglophone", () => {
  test.use({ locale: "en-US" });

  test("le parcours visible et accessible reste en français", async ({
    page,
  }) => {
    await expect(page.locator("html")).toHaveAttribute("lang", "fr");
    await expect(page).toHaveTitle("Your Life In Weeks");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Ta vie,",
    );
    await expect(
      page.getByRole("link", { name: "Inspiré de Wait But Why" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "De 0 à 1 an" }),
    ).toBeVisible();
    await expect(page.getByText(/^0 ans 0 mois 7 jours/)).toBeVisible();
    await expect(
      page.getByRole("status", { name: "Sauvegarde de la date de naissance" }),
    ).toHaveText("Enregistrée sur cet appareil");
    await page.getByRole("button", { name: /^Semaine 2,/ }).click();
    await expect(
      page.getByRole("status", { name: "Détails de la semaine" }),
    ).toHaveText(
      "Semaine 2, du 8 janvier 2026 au 14 janvier 2026 — Semaine actuelle",
    );
    await page.getByRole("button", { name: /date de naissance/i }).click();
    await expect(
      page.getByRole("button", { name: "Aller au mois précédent" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Aller au mois suivant" }),
    ).toBeVisible();
    await expect(
      page.getByRole("combobox", { name: "Choisir le mois" }),
    ).toBeVisible();
    await expect(
      page.getByRole("combobox", { name: "Choisir l'année" }),
    ).toBeVisible();
  });
});

test("les détails actualisent leur état avec le jour courant et se réinitialisent avec la naissance", async ({
  page,
}) => {
  const details = page.getByRole("status", { name: "Détails de la semaine" });

  await page.getByRole("button", { name: /^Semaine 2,/ }).click();
  await page.clock.setFixedTime(new Date("2026-01-15T12:00:00+01:00"));
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  await expect(details).toHaveText(
    "Semaine 2, du 8 janvier 2026 au 14 janvier 2026 — Semaine écoulée",
  );
  await chooseDate(page, "2026-01-02", "vendredi 2 janvier 2026");
  await expect(details).toBeHidden();
  await page.getByRole("button", { name: "Explorer cette année" }).click();
  await expect(details).toContainText("Sélectionne une semaine");
  await page.getByRole("button", { name: /^Semaine 1,/ }).click();
  await expect(details).toHaveText(
    "Semaine 1, du 2 janvier 2026 au 8 janvier 2026 — Semaine écoulée",
  );
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Date de naissance : 2 janvier 2026" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Explorer cette année" }).click();
  await expect(details).toContainText("Sélectionne une semaine");
  await page.getByRole("button", { name: /^Semaine 1,/ }).click();
  await page.getByRole("button", { name: "Effacer mes données" }).click();
  await expect(details).toBeHidden();
});
