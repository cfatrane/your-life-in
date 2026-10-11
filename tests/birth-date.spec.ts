import { expect, type Page, test } from "@playwright/test";

import { chooseDate } from "./support/birth-date";

async function refuseStorage(page: Page, operation: "setItem" | "removeItem") {
  await page.evaluate((method) => {
    Storage.prototype[method] = () => {
      throw new DOMException("Stockage indisponible", "SecurityError");
    };
  }, operation);
}

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-10-11T12:00:00+02:00"));
  await page.goto("/");
});

test("le jour courant reste sélectionnable après minuit sans rechargement", async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date("2026-10-31T23:59:00+01:00"));
  await page.reload();
  await page
    .getByRole("button", { name: "Sélectionne ta date de naissance" })
    .click();
  await page.keyboard.press("Escape");
  await page.clock.setFixedTime(new Date("2026-11-01T00:01:00+01:00"));
  await page
    .getByRole("button", { name: "Sélectionne ta date de naissance" })
    .click();

  await page.getByRole("combobox", { name: /mois/i }).selectOption("10");

  const today = page.getByRole("button", {
    name: "Aujourd'hui, dimanche 1 novembre 2026",
    exact: true,
  });

  await expect(today).toBeEnabled();
  await expect(
    page.getByRole("button", { name: "lundi 2 novembre 2026", exact: true }),
  ).toBeDisabled();
  await today.focus();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Date de naissance : 1 novembre 2026" }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Date de naissance : 1 novembre 2026" }),
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Calendrier de vie" }),
  ).toBeVisible();
});

test("une erreur de lecture permet une nouvelle saisie et une sauvegarde", async ({
  page,
  context,
}) => {
  await page.addInitScript(() => {
    const original = Storage.prototype.getItem;

    Storage.prototype.getItem = function (key) {
      if (key === "birthDate")
        throw new DOMException("Stockage indisponible", "SecurityError");

      return original.call(this, key);
    };
  });
  await page.reload();
  await expect(
    page.getByRole("status", { name: "Sauvegarde de la date de naissance" }),
  ).toContainText("Impossible de lire");
  await expect(
    page.getByRole("region", { name: "Calendrier de vie" }),
  ).toBeHidden();
  await chooseDate(page, "2000-01-01", "samedi 1 janvier 2000");
  await expect(
    page.getByRole("region", { name: "Calendrier de vie" }),
  ).toBeVisible();
  const nextVisit = await context.newPage();

  await nextVisit.clock.setFixedTime(new Date("2026-10-11T12:00:00+02:00"));
  await nextVisit.goto("/");
  await expect(
    nextVisit.getByRole("button", {
      name: "Date de naissance : 1 janvier 2000",
    }),
  ).toBeVisible();
});

test("saisir, modifier, retrouver puis effacer sa date après rechargement", async ({
  page,
}) => {
  await expect(
    page.getByText(
      "Sélectionne ta date de naissance pour afficher ton calendrier.",
    ),
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Calendrier de vie" }),
  ).toBeHidden();
  await chooseDate(page, "2000-01-01", "samedi 1 janvier 2000");
  await expect(
    page.getByText("Enregistrée sur cet appareil", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Calendrier de vie" }),
  ).toBeVisible();
  await expect(page.getByText(/^26 ans 9 mois 10 jours/)).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Date de naissance : 1 janvier 2000" }),
  ).toBeVisible();
  await chooseDate(page, "2001-02-02", "vendredi 2 février 2001");
  await expect(page.getByText(/^25 ans 8 mois 9 jours/)).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Date de naissance : 2 février 2001" }),
  ).toBeVisible();
  await expect(page.getByText(/^25 ans 8 mois 9 jours/)).toBeVisible();
  await page.getByRole("button", { name: "Effacer ma date" }).focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("region", { name: "Calendrier de vie" }),
  ).toBeHidden();
  await expect(page.getByText(/^25 ans 8 mois 9 jours/)).toBeHidden();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Sélectionne ta date de naissance" }),
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Calendrier de vie" }),
  ).toBeHidden();
});

test("une sauvegarde invalide invite à ressaisir sans calendrier ni compteur", async ({
  page,
}) => {
  for (const value of [
    "",
    "1899-12-31",
    "2026-10-12",
    "2025-02-29",
    "1900-02-29",
    "2000-02-30",
    "2000-04-31",
    "2000-13-01",
    "2000-01-00",
    "2000-1-01",
    "01/01/2000",
    "2000-01-01T00:00:00Z",
    "garbage",
  ]) {
    await page.evaluate(
      (saved) => localStorage.setItem("birthDate", saved),
      value,
    );
    await page.reload();
    await expect(
      page.getByRole("status", { name: "Sauvegarde de la date de naissance" }),
    ).toContainText("La date enregistrée est invalide");
    await expect(
      page.getByRole("button", { name: "Sélectionne ta date de naissance" }),
    ).toBeVisible();
    await expect(
      page.getByRole("region", { name: "Calendrier de vie" }),
    ).toBeHidden();
    await expect(page.getByText(/\d+ ans \d+ mois \d+ jours/)).toBeHidden();
  }
  await chooseDate(page, "2000-02-29", "mardi 29 février 2000");
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Date de naissance : 29 février 2000" }),
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Calendrier de vie" }),
  ).toBeVisible();
});

test("une erreur d’écriture conserve le calendrier pour la visite sans annoncer de succès", async ({
  page,
}) => {
  await refuseStorage(page, "setItem");
  await chooseDate(page, "2000-01-01", "samedi 1 janvier 2000");
  await expect(
    page.getByRole("status", { name: "Sauvegarde de la date de naissance" }),
  ).toContainText("Impossible d’enregistrer");
  await expect(
    page.getByText("Enregistrée sur cet appareil", { exact: true }),
  ).toBeHidden();
  await expect(
    page.getByRole("region", { name: "Calendrier de vie" }),
  ).toBeVisible();
  await expect(page.getByText(/^26 ans 9 mois 10 jours/)).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Sélectionne ta date de naissance" }),
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Calendrier de vie" }),
  ).toBeHidden();
  await chooseDate(page, "2000-01-01", "samedi 1 janvier 2000");
  await refuseStorage(page, "setItem");
  await chooseDate(page, "2001-02-02", "vendredi 2 février 2001");
  await expect(
    page.getByRole("status", { name: "Sauvegarde de la date de naissance" }),
  ).toContainText("Impossible d’enregistrer");
  await expect(page.getByText(/^25 ans 8 mois 9 jours/)).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Date de naissance : 1 janvier 2000" }),
  ).toBeVisible();
  await expect(page.getByText(/^26 ans 9 mois 10 jours/)).toBeVisible();
});

test("un effacement refusé avertit que la date peut revenir et reste réessayable", async ({
  page,
}) => {
  await chooseDate(page, "2000-01-01", "samedi 1 janvier 2000");
  await refuseStorage(page, "removeItem");
  await page.getByRole("button", { name: "Effacer ma date" }).click();
  await expect(
    page.getByRole("status", { name: "Sauvegarde de la date de naissance" }),
  ).toContainText("L’effacement n’a pas pu être confirmé");
  await expect(
    page.getByText("Ta date a été effacée de cet appareil.", { exact: true }),
  ).toBeHidden();
  await expect(
    page.getByRole("button", { name: "Sélectionne ta date de naissance" }),
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Calendrier de vie" }),
  ).toBeHidden();
  await expect(page.getByText(/^26 ans 9 mois 10 jours/)).toBeHidden();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Date de naissance : 1 janvier 2000" }),
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Calendrier de vie" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Effacer ma date" }).click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Sélectionne ta date de naissance" }),
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Calendrier de vie" }),
  ).toBeHidden();
});

test.describe("dans un navigateur anglophone", () => {
  test.use({ locale: "en-US" });

  test("le sélecteur reste français et admet les deux bornes au clavier", async ({
    page,
  }) => {
    await page.clock.setFixedTime(new Date("2026-10-11T00:30:00+02:00"));
    await page.reload();
    await page
      .getByRole("button", { name: "Sélectionne ta date de naissance" })
      .focus();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("combobox", { name: "Choisir l'année" }),
    ).toBeVisible();
    await expect(
      page.getByRole("option", { name: "janv.", exact: true }),
    ).toBeAttached();
    await expect(
      page.getByRole("button", { name: "lundi 12 octobre 2026", exact: true }),
    ).toBeDisabled();
    await page
      .getByRole("button", {
        name: "Aujourd'hui, dimanche 11 octobre 2026",
        exact: true,
      })
      .focus();
    await page.keyboard.press("Enter");
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "Date de naissance : 11 octobre 2026" }),
    ).toBeVisible();
    await page.reload();
    await expect(
      page.getByRole("button", { name: "Date de naissance : 11 octobre 2026" }),
    ).toBeVisible();
    await chooseDate(page, "1900-01-01", "lundi 1 janvier 1900");
    await page.reload();
    await expect(
      page.getByRole("button", { name: "Date de naissance : 1 janvier 1900" }),
    ).toBeVisible();
    await expect(
      page.getByRole("region", { name: "Calendrier de vie" }),
    ).toBeVisible();
    await page.getByRole("button", { name: /date de naissance/i }).click();
    await expect(
      page.getByRole("button", { name: "Aller au mois précédent" }),
    ).toBeDisabled();
    await expect(
      page.getByRole("option", { name: "1899", exact: true }),
    ).toHaveCount(0);
  });
});
