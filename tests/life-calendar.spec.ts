import { expect, test } from "@playwright/test";

import { chooseDate } from "./support/birth-date";

test("une naissance aujourd’hui affiche une seule semaine actuelle et une légende française", async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date("2026-10-11T12:00:00+02:00"));
  await page.goto("/");
  await page
    .getByRole("button", { name: "Sélectionne ta date de naissance" })
    .click();
  await page
    .getByRole("button", {
      name: "Aujourd'hui, dimanche 11 octobre 2026",
      exact: true,
    })
    .click();
  await page.keyboard.press("Escape");

  const calendar = page.getByRole("region", { name: "Calendrier de vie" });

  await expect(
    calendar.getByRole("button", { name: /Semaine actuelle/ }),
  ).toHaveCount(1);
  await expect(
    calendar.getByRole("button", {
      name: "Semaine 1, du 11 octobre 2026 au 17 octobre 2026 — Semaine actuelle",
      exact: true,
    }),
  ).toBeVisible();
  const legend = page.getByRole("region", { name: "Légende" });

  for (const label of [
    "Semaine écoulée",
    "Semaine actuelle",
    "Semaine à venir",
  ]) {
    await expect(legend.getByText(label, { exact: true })).toBeVisible();
  }
  await expect(
    calendar
      .getByRole("group", { name: "Âge : 0 ans", exact: true })
      .getByRole("button"),
  ).toHaveCount(53);
  await expect(calendar.getByRole("group", { name: /^Âge/ })).toHaveCount(90);
});

test("le calendrier progresse à minuit sans ressaisie", async ({ page }) => {
  const time = new Date("2026-01-07T23:59:59+01:00");

  await page.clock.install({ time });
  await page.clock.pauseAt(time);
  await page.goto("/");
  await chooseDate(page, "2026-01-01", "jeudi 1 janvier 2026");
  const calendar = page.getByRole("region", { name: "Calendrier de vie" });

  await expect(
    calendar.getByRole("button", { name: /^Semaine 1,.*Semaine actuelle$/ }),
  ).toHaveCount(1);
  await page.clock.runFor(1000);
  await expect(
    calendar.getByRole("button", { name: /^Semaine 1,.*Semaine écoulée$/ }),
  ).toHaveCount(1);
  await expect(
    calendar.getByRole("button", { name: /^Semaine 2,.*Semaine actuelle$/ }),
  ).toHaveCount(1);
  await expect(
    calendar.getByRole("button", { name: /Semaine actuelle$/ }),
  ).toHaveCount(1);
  await expect(page.getByText(/^0 ans 0 mois 7 jours/)).toBeVisible();
});

for (const event of ["focus", "visibilitychange", "pageshow"]) {
  test(`le retour via ${event} actualise la semaine et le compteur`, async ({
    page,
  }) => {
    await page.clock.setFixedTime(new Date("2026-01-07T12:00:00+01:00"));
    await page.goto("/");
    await chooseDate(page, "2026-01-01", "jeudi 1 janvier 2026");
    await expect(
      page.getByRole("button", { name: /^Semaine 1,.*Semaine actuelle$/ }),
    ).toHaveCount(1);
    await page.clock.setFixedTime(new Date("2026-01-15T12:00:00+01:00"));
    await page.evaluate((event) => {
      (event === "visibilitychange" ? document : window).dispatchEvent(
        new Event(event),
      );
    }, event);
    await expect(
      page.getByRole("button", { name: /^Semaine 3,.*Semaine actuelle$/ }),
    ).toHaveCount(1);
    await expect(page.getByText(/^0 ans 0 mois 14 jours/)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Semaine actuelle$/ }),
    ).toHaveCount(1);
  });
}

test("une semaine traversant un anniversaire reste dans son année d’âge initiale", async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date("2026-10-11T12:00:00+02:00"));
  await page.goto("/");
  await chooseDate(page, "2016-10-12", "mercredi 12 octobre 2016");
  const ageNine = page.getByRole("group", { name: "Âge : 9 ans", exact: true });
  const current = ageNine.getByRole("button", {
    name: /du 7 octobre 2026 au 13 octobre 2026 — Semaine actuelle$/,
  });

  await expect(current).toHaveCount(1);
  await page.clock.setFixedTime(new Date("2026-10-12T12:00:00+02:00"));
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  await expect(current).toHaveCount(1);
  await expect(page.getByText(/^10 ans 0 mois 0 jours/)).toBeVisible();
  await page.clock.setFixedTime(new Date("2026-10-14T12:00:00+02:00"));
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  await expect(
    page
      .getByRole("group", { name: "Âge : 10 ans", exact: true })
      .getByRole("button", {
        name: /du 14 octobre 2026 au 20 octobre 2026 — Semaine actuelle$/,
      }),
  ).toHaveCount(1);
});

test("le 29 février utilise le 1er mars et conserve le groupe de la semaine traversante", async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date("2025-02-28T12:00:00+01:00"));
  await page.goto("/");
  await chooseDate(page, "2024-02-29", "jeudi 29 février 2024");
  const current = page
    .getByRole("group", { name: "Âge : 0 ans", exact: true })
    .getByRole("button", {
      name: /du 27 février 2025 au 5 mars 2025 — Semaine actuelle$/,
    });

  await expect(current).toHaveCount(1);
  await expect(page.getByText(/^0 ans /)).toBeVisible();
  await page.clock.setFixedTime(new Date("2025-03-01T12:00:00+01:00"));
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  await expect(current).toHaveCount(1);
  await expect(page.getByText(/^1 an 0 mois 0 jours/)).toBeVisible();
  await expect(
    page
      .getByRole("group", { name: "Âge : 1 an", exact: true })
      .getByRole("button")
      .first(),
  ).toHaveAccessibleName(/^Semaine 54, du 6 mars 2025 au 12 mars 2025/);
  await expect(
    page.getByText(
      "Pour une naissance le 29 février, l’anniversaire de référence est le 1er mars les années non bissextiles.",
    ),
  ).toBeVisible();
});

for (const scenario of [
  {
    now: "2026-03-29T12:00:00+02:00",
    birth: "2026-03-22",
    day: "dimanche 22 mars 2026",
    dates: "du 29 mars 2026 au 4 avril 2026",
  },
  {
    now: "2026-10-25T12:00:00+01:00",
    birth: "2026-10-18",
    day: "dimanche 18 octobre 2026",
    dates: "du 25 octobre 2026 au 31 octobre 2026",
  },
]) {
  test(`sept jours civils lors du changement d’heure du ${scenario.birth}`, async ({
    page,
  }) => {
    await page.clock.setFixedTime(new Date(scenario.now));
    await page.goto("/");
    await chooseDate(page, scenario.birth, scenario.day);
    await expect(
      page.getByRole("button", {
        name: `Semaine 2, ${scenario.dates} — Semaine actuelle`,
        exact: true,
      }),
    ).toHaveCount(1);
    await expect(
      page.getByRole("button", { name: /^Semaine 1,.*Semaine écoulée$/ }),
    ).toHaveCount(1);
    await expect(
      page.getByRole("button", { name: /Semaine actuelle$/ }),
    ).toHaveCount(1);
  });
}

test("la dernière case s’arrête à la veille des 90 ans et disparaît comme semaine actuelle à l’horizon", async ({
  page,
}) => {
  const time = new Date("2089-12-31T23:59:59+01:00");

  await page.clock.install({ time });
  await page.clock.pauseAt(time);
  await page.goto("/");
  await chooseDate(page, "2000-01-01", "samedi 1 janvier 2000");
  const calendar = page.getByRole("region", { name: "Calendrier de vie" });

  await expect(
    calendar.getByRole("button", {
      name: "Semaine 4697, du 31 décembre 2089 au 31 décembre 2089 — Semaine actuelle",
      exact: true,
    }),
  ).toHaveCount(1);
  await page.clock.runFor(1000);
  await expect(
    calendar.getByRole("button", { name: /Semaine actuelle$/ }),
  ).toHaveCount(0);
  await expect(
    calendar.getByRole("button", { name: /Semaine à venir$/ }),
  ).toHaveCount(0);
  await expect(
    calendar.getByRole("button", { name: /Semaine écoulée$/ }),
  ).toHaveCount(4697);
  await expect(
    page.getByText("Tu as dépassé l'horizon de ce calendrier", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText(/^90 ans 0 mois 0 jours/)).toBeVisible();
});

test("la grille couvre chaque jour une seule fois avec 52 ou 53 débuts par année d’âge", async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date("2026-10-11T12:00:00+02:00"));
  await page.goto("/");
  await chooseDate(page, "2000-01-01", "samedi 1 janvier 2000");
  const calendar = page.getByRole("region", { name: "Calendrier de vie" });
  const groups = await calendar.getByRole("group").evaluateAll((groups) =>
    groups.map((group) => ({
      age: Number(group.getAttribute("aria-label")?.match(/\d+/)?.[0]),
      labels: Array.from(
        group.querySelectorAll('button[aria-label^="Semaine "]'),
        (button) => button.getAttribute("aria-label") ?? "",
      ),
    })),
  );
  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  function civilDay(day: string, month: string, year: string) {
    return (
      Date.UTC(Number(year), months.indexOf(month), Number(day)) / 86400000
    );
  }
  let expectedStart = civilDay("1", "janvier", "2000");
  let number = 0;

  for (const group of groups) {
    expect([52, 53]).toContain(group.labels.length);

    for (const label of group.labels) {
      const match = label.match(
        /^Semaine (\d+), du (\d+) (\S+) (\d+) au (\d+) (\S+) (\d+) —/,
      );

      expect(match).not.toBeNull();
      const [
        ,
        week,
        startDay,
        startMonth,
        startYear,
        endDay,
        endMonth,
        endYear,
      ] = match!;
      const start = civilDay(startDay, startMonth, startYear);
      const end = civilDay(endDay, endMonth, endYear);

      expect(Number(week)).toBe(++number);
      expect(start).toBe(expectedStart);
      expect(Number(startYear) - 2000).toBe(group.age);
      expect(end - start + 1).toBe(number === 4697 ? 1 : 7);
      expectedStart = end + 1;
    }
  }
  expect(groups).toHaveLength(90);
  expect(number).toBe(4697);
  expect(expectedStart).toBe(civilDay("1", "janvier", "2090"));
  const current = calendar.getByRole("button", { name: /Semaine actuelle$/ });

  await expect(current).toHaveText("A");
  await expect(current).toHaveAttribute("aria-current", "date");
  expect(
    await current.evaluate((button) =>
      parseFloat(getComputedStyle(button).outlineWidth),
    ),
  ).toBeGreaterThan(0);
});
