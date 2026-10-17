import { expect, test } from "@playwright/test";

import { chooseDate } from "./support/birth-date";

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-10-11T12:00:00+02:00"));
  await page.goto("/");
});

test("retrouver l’horizon et la naissance, modifier la naissance puis revenir durablement à 90 ans", async ({
  page,
}) => {
  const horizon = page.getByRole("spinbutton", {
    name: "Horizon du calendrier (ans)",
  });

  await horizon.fill("75");
  await horizon.press("Enter");
  await chooseDate(page, "2000-01-01", "samedi 1 janvier 2000");
  await page.reload();
  await expect(horizon).toHaveValue("75");
  await expect(
    page.getByRole("img", { name: "Aperçu des 75 années" }),
  ).toBeVisible();
  await chooseDate(page, "2001-02-02", "vendredi 2 février 2001");
  await page.reload();
  await expect(horizon).toHaveValue("75");
  await expect(
    page.getByRole("button", { name: "Date de naissance : 2 février 2001" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Revenir à 90 ans" }).click();
  await page.reload();
  await expect(horizon).toHaveValue("90");
  await expect(
    page.getByRole("img", { name: "Aperçu des 90 années" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Date de naissance : 2 février 2001" }),
  ).toBeVisible();
});

test("une naissance existante est restaurée avec 90 ans si l’horizon manque ou est invalide", async ({
  page,
}) => {
  await page.evaluate(() => localStorage.setItem("birthDate", "2000-01-01"));

  for (const saved of [null, "", "0", "121", "75.5", "garbage", "Infinity"]) {
    await page.evaluate((value) => {
      if (value === null) localStorage.removeItem("calendarHorizon");
      else localStorage.setItem("calendarHorizon", value);
    }, saved);
    await page.reload();
    await expect(
      page.getByRole("spinbutton", { name: "Horizon du calendrier (ans)" }),
    ).toHaveValue("90");
    await expect(
      page.getByRole("button", { name: "Date de naissance : 1 janvier 2000" }),
    ).toBeVisible();
    await expect(
      page.getByRole("img", { name: "Aperçu des 90 années" }),
    ).toBeVisible();
  }
});

for (const refusedKey of ["birthDate", "calendarHorizon"]) {
  test(`la lecture refusée de ${refusedKey} ne perd pas l’autre réglage et permet une nouvelle saisie`, async ({
    page,
  }) => {
    await page.evaluate(() => {
      localStorage.setItem("birthDate", "2000-01-01");
      localStorage.setItem("calendarHorizon", "75");
    });
    await page.addInitScript((keyToRefuse) => {
      const original = Storage.prototype.getItem;

      Storage.prototype.getItem = function (key) {
        if (key === keyToRefuse)
          throw new DOMException("Stockage indisponible", "SecurityError");

        return original.call(this, key);
      };
    }, refusedKey);
    await page.reload();
    const horizon = page.getByRole("spinbutton", {
      name: "Horizon du calendrier (ans)",
    });

    await expect(horizon).toBeEnabled();
    await expect(
      page.getByRole("button", { name: "Appliquer", exact: true }),
    ).toBeEnabled();

    if (refusedKey === "birthDate") {
      await expect(horizon).toHaveValue("75");
      await expect(
        page.getByRole("status", {
          name: "Sauvegarde de la date de naissance",
        }),
      ).toContainText("Impossible de lire");
      await chooseDate(page, "2000-01-01", "samedi 1 janvier 2000");
    } else {
      await expect(horizon).toHaveValue("90");
      await expect(
        page.getByRole("button", {
          name: "Date de naissance : 1 janvier 2000",
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("status", {
          name: "Sauvegarde de l’horizon du calendrier",
        }),
      ).toContainText("Impossible de lire");
      await horizon.fill("75");
      await horizon.press("Enter");
    }
    await expect(
      page.getByRole("img", { name: "Aperçu des 75 années" }),
    ).toBeVisible();
  });
}

test("une écriture refusée conserve l’horizon actif sans annoncer sa sauvegarde", async ({
  page,
}) => {
  await chooseDate(page, "2000-01-01", "samedi 1 janvier 2000");
  const horizon = page.getByRole("spinbutton", {
    name: "Horizon du calendrier (ans)",
  });

  await horizon.fill("75");
  await horizon.press("Enter");
  await page.evaluate(() => {
    const original = Storage.prototype.setItem;

    Storage.prototype.setItem = function (key, value) {
      if (key === "calendarHorizon")
        throw new DOMException("Stockage indisponible", "SecurityError");
      original.call(this, key, value);
    };
  });
  await horizon.fill("60");
  await horizon.press("Enter");
  const status = page.getByRole("status", {
    name: "Sauvegarde de l’horizon du calendrier",
  });

  await expect(status).toContainText("Impossible d’enregistrer");
  await expect(status).not.toContainText("Horizon enregistré sur cet appareil");
  await expect(
    page.getByRole("img", { name: "Aperçu des 60 années" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Revenir à 90 ans" }).click();
  await expect(horizon).toHaveValue("90");
  await expect(status).toContainText("Impossible d’enregistrer");
  await page.reload();
  await expect(horizon).toHaveValue("75");
  await expect(
    page.getByRole("img", { name: "Aperçu des 75 années" }),
  ).toBeVisible();
});

test("effacer un horizon sans naissance remet aussi la saisie invalide à zéro et garde un focus cohérent", async ({
  page,
}) => {
  const horizon = page.getByRole("spinbutton", {
    name: "Horizon du calendrier (ans)",
  });

  await horizon.fill("75");
  await horizon.press("Enter");
  await page.reload();
  await expect(horizon).toHaveValue("75");
  await horizon.fill("121");
  await horizon.press("Enter");
  await expect(
    page
      .getByRole("alert")
      .filter({ hasText: "Choisis un âge entier entre 1 et 120 ans." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Effacer mes données" }).focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", { name: "Sélectionne ta date de naissance" }),
  ).toBeFocused();
  await expect(horizon).toHaveValue("90");
  await expect(
    page
      .getByRole("alert")
      .filter({ hasText: "Choisis un âge entier entre 1 et 120 ans." }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("status", { name: "Effacement des données" }),
  ).toHaveText("Tes données ont été effacées de cet appareil.");
  await page.reload();
  await expect(horizon).toHaveValue("90");
  await expect(
    page.getByRole("region", { name: "Calendrier de vie" }),
  ).toBeHidden();
});

for (const refusedKeys of [
  ["birthDate"],
  ["calendarHorizon"],
  ["birthDate", "calendarHorizon"],
]) {
  test(`l’effacement refusé de ${refusedKeys.join(" et ")} tente l’autre suppression et reste réessayable`, async ({
    page,
  }) => {
    await chooseDate(page, "2000-01-01", "samedi 1 janvier 2000");
    const horizon = page.getByRole("spinbutton", {
      name: "Horizon du calendrier (ans)",
    });

    await horizon.fill("75");
    await horizon.press("Enter");
    await page.evaluate((keys) => {
      const original = Storage.prototype.removeItem;

      Storage.prototype.removeItem = function (key) {
        if (keys.includes(key))
          throw new DOMException("Stockage indisponible", "SecurityError");
        original.call(this, key);
      };
    }, refusedKeys);
    const clear = page.getByRole("button", { name: "Effacer mes données" });

    await clear.click();
    await expect(horizon).toHaveValue("90");
    await expect(
      page.getByRole("region", { name: "Calendrier de vie" }),
    ).toBeHidden();
    await expect(page.locator(".elapsed-time")).toHaveCount(0);
    await expect(
      page.getByRole("status", { name: "Effacement des données" }),
    ).toContainText("Des données peuvent réapparaître après rechargement");
    await expect(
      page.getByText("Tes données ont été effacées de cet appareil.", {
        exact: true,
      }),
    ).toHaveCount(0);
    await expect(clear).toBeEnabled();
    // A second attempt is possible before reloading, even with no visible settings.
    await clear.click();
    await expect(
      page.getByRole("status", { name: "Effacement des données" }),
    ).toContainText("L’effacement n’a pas pu être confirmé");
    await page.reload();
    await expect(horizon).toHaveValue(
      refusedKeys.includes("calendarHorizon") ? "75" : "90",
    );
    await expect(
      page.getByRole("button", {
        name: refusedKeys.includes("birthDate")
          ? "Date de naissance : 1 janvier 2000"
          : "Sélectionne ta date de naissance",
      }),
    ).toBeVisible();
    await clear.click();
    await expect(
      page.getByRole("status", { name: "Effacement des données" }),
    ).toHaveText("Tes données ont été effacées de cet appareil.");
    await page.reload();
    await expect(horizon).toHaveValue("90");
    await expect(
      page.getByRole("button", { name: "Sélectionne ta date de naissance" }),
    ).toBeVisible();
  });
}
