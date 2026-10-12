import { expect, test } from "@playwright/test";

import { chooseDate } from "./support/birth-date";

test("cinq étapes, repères personnels et accès direct au calendrier restauré", async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date("2026-10-12T12:00:00+02:00"));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Ta vie,semaine aprèssemaine.",
  );
  await expect(page.locator(".story-kicker")).toHaveCount(5);
  await chooseDate(page, "2000-01-01", "samedi 1 janvier 2000");
  await expect(page.locator(".story-total")).toHaveText(/1\s397/);
  await expect(page.locator(".story-other-views")).toContainText(/9\s781/);
  await expect(page.locator(".story-birthday")).toContainText("81 jours");
  await expect(page.locator(".story-birthday")).toContainText(
    "Le 1 janvier 2027, tu auras 27 ans.",
  );
  await expect(
    page
      .getByRole("list", { name: "Les jours de ta semaine actuelle" })
      .getByRole("listitem"),
  ).toHaveCount(7);
  await page.reload();
  await page.getByRole("link", { name: "Mon calendrier", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Ton temps, en entier." }),
  ).toBeInViewport();
  await expect(
    page.getByRole("combobox", { name: "Explorer une année" }),
  ).toHaveValue("26");
});

test("le calendrier et les repères progressent à minuit sans ressaisie", async ({
  page,
}) => {
  const time = new Date("2026-01-07T23:59:59+01:00");

  await page.clock.install({ time });
  await page.clock.pauseAt(time);
  await page.goto("/");
  await chooseDate(page, "2026-01-01", "jeudi 1 janvier 2026");
  await page.getByRole("button", { name: "Explorer cette année" }).click();
  await expect(
    page.getByRole("button", { name: /^Semaine 1,.*Semaine actuelle$/ }),
  ).toHaveCount(1);
  await page.clock.runFor(1000);
  await expect(
    page.getByRole("button", { name: /^Semaine 1,.*Semaine écoulée$/ }),
  ).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: /^Semaine 2,.*Semaine actuelle$/ }),
  ).toHaveCount(1);
  await expect(page.locator(".story-total")).toHaveText("1");
  await expect(page.getByText(/^0 ans 0 mois 7 jours/)).toBeVisible();
});

for (const event of ["focus", "visibilitychange", "pageshow"]) {
  test(`le retour via ${event} actualise la semaine et le compteur`, async ({
    page,
  }) => {
    await page.clock.setFixedTime(new Date("2026-01-07T12:00:00+01:00"));
    await page.goto("/");
    await chooseDate(page, "2026-01-01", "jeudi 1 janvier 2026");
    await page.getByRole("button", { name: "Explorer cette année" }).click();
    await page.clock.setFixedTime(new Date("2026-01-15T12:00:00+01:00"));
    await page.evaluate(
      (event) =>
        (event === "visibilitychange" ? document : window).dispatchEvent(
          new Event(event),
        ),
      event,
    );
    await expect(
      page.getByRole("button", { name: /^Semaine 3,.*Semaine actuelle$/ }),
    ).toHaveCount(1);
    await expect(page.getByText(/^0 ans 0 mois 14 jours/)).toBeVisible();
    await expect(page.locator(".story-total")).toHaveText("2");
  });
}

test("le 29 février et l’anniversaire du jour utilisent les mêmes repères", async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date("2025-02-28T12:00:00+01:00"));
  await page.goto("/");
  await chooseDate(page, "2024-02-29", "jeudi 29 février 2024");
  await expect(page.locator(".story-birthday")).toContainText("1 jour");
  await page.getByRole("button", { name: "Explorer cette année" }).click();
  const current = page.getByRole("button", {
    name: /du 27 février 2025 au 5 mars 2025 — Semaine actuelle$/,
  });

  await expect(current).toHaveCount(1);
  await page.clock.setFixedTime(new Date("2025-03-01T12:00:00+01:00"));
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  await expect(current).toHaveCount(1);
  await expect(page.locator(".story-birthday")).toContainText(
    "C’est ton anniversaire !",
  );
  await expect(page.getByText(/^1 an 0 mois 0 jours/)).toBeVisible();
});

test("réduire les animations fige le compteur, sa pause manuelle reste disponible par défaut", async ({
  page,
}) => {
  const time = new Date("2026-01-08T12:00:00+01:00");

  await page.clock.install({ time });
  await page.clock.pauseAt(time);
  await page.goto("/");
  await chooseDate(page, "2026-01-01", "jeudi 1 janvier 2026");
  const counter = page.locator(".elapsed-time");

  await page
    .getByRole("button", { name: "Mettre le compteur en pause" })
    .click();
  const paused = await counter.textContent();

  await page.clock.runFor(100);
  await expect(counter).toHaveText(paused!);
  await page.getByRole("button", { name: "Reprendre le compteur" }).click();
  await page.clock.runFor(100);
  await expect(counter).not.toHaveText(paused!);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".elapsed-fraction")).toBeHidden();
  const reduced = await counter.textContent();

  await page.clock.runFor(1000);
  await expect(counter).toHaveText(reduced!);
  await expect(
    page.getByRole("button", { name: "Mettre le compteur en pause" }),
  ).toBeHidden();
});
