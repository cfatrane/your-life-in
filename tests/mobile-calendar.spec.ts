import { expect, test } from "@playwright/test";

import { chooseDate } from "./support/birth-date";

for (const width of [320, 390]) {
  test.describe(`sur mobile à ${width} pixels`, () => {
    test.use({ viewport: { width, height: 844 }, hasTouch: true });

    test("restaurer la semaine traversant un anniversaire, naviguer et effacer", async ({
      page,
    }) => {
      await page.clock.setFixedTime(new Date("2026-10-12T12:00:00+02:00"));
      await page.goto("/");
      await chooseDate(page, "2016-10-12", "mercredi 12 octobre 2016");

      const decade = page.getByRole("combobox", { name: "Décennie de vie" });
      const year = page.getByRole("button", {
        name: "Âge : 9 ans",
        exact: true,
      });
      const current = page.getByRole("button", {
        name: "Semaine 522, du 7 octobre 2026 au 13 octobre 2026 — Semaine actuelle",
        exact: true,
      });

      await expect(decade).toHaveValue("0");
      await expect(year).toHaveAttribute("aria-expanded", "true");
      await expect(current).toBeVisible();
      await page.reload();
      await expect(decade).toHaveValue("0");
      await expect(year).toHaveAttribute("aria-expanded", "true");
      await current.tap();
      const details = page.getByRole("status", {
        name: "Détails de la semaine",
      });

      await expect(details).toHaveText(
        "Semaine 522, du 7 octobre 2026 au 13 octobre 2026 — Semaine actuelle",
      );
      const grid = page.getByRole("group", {
        name: "Âge : 9 ans",
        exact: true,
      });
      const buttons = grid.getByRole("button", { name: /^Semaine / });
      const positions = await buttons.evaluateAll((buttons) =>
        buttons.slice(0, 7).map((button) => {
          const { x, y, width, height } = button.getBoundingClientRect();

          return { x, y, width, height };
        }),
      );

      expect(new Set(positions.slice(0, 6).map(({ y }) => y)).size).toBe(1);
      expect(positions[6].y).toBeGreaterThan(positions[0].y);
      expect(positions[6].x).toBe(positions[0].x);

      for (const position of positions) {
        expect(position.width).toBeGreaterThanOrEqual(44);
        expect(position.height).toBeGreaterThanOrEqual(44);
      }
      expect((await details.boundingBox())!.y).toBeGreaterThan(
        (await buttons.last().boundingBox())!.y,
      );
      await expect(decade.locator("option")).toHaveText([
        "0–9 ans",
        "10–19 ans",
        "20–29 ans",
        "30–39 ans",
        "40–49 ans",
        "50–59 ans",
        "60–69 ans",
        "70–79 ans",
        "80–89 ans",
      ]);
      await decade.selectOption("2");
      await expect(page.getByRole("button", { name: /^Âge :/ })).toHaveCount(
        10,
      );
      const otherYear = page.getByRole("button", {
        name: "Âge : 23 ans",
        exact: true,
      });

      await otherYear.focus();
      await page.keyboard.press("Enter");
      await expect(otherYear).toHaveAttribute("aria-expanded", "true");
      await expect(page.getByRole("button", { expanded: true })).toHaveCount(1);
      await expect(current).toBeHidden();
      const future = page
        .getByRole("button", { name: /^Semaine .*Semaine à venir$/ })
        .first();

      await future.focus();
      await page.keyboard.press("Space");
      await expect(future).toBeFocused();
      await expect(details).toHaveText(
        (await future.getAttribute("aria-label"))!,
      );

      for (const control of [decade, otherYear]) {
        const bounds = await control.boundingBox();

        expect(bounds!.width).toBeGreaterThanOrEqual(44);
        expect(bounds!.height).toBeGreaterThanOrEqual(44);
      }
      await decade.selectOption("0");
      await year.click();
      await expect(current).toHaveAttribute("aria-current", "date");
      await expect(
        page.getByRole("button", {
          name: "Date de naissance : 12 octobre 2016",
        }),
      ).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBe(width);
      await current.tap();
      await page.screenshot({
        animations: "disabled",
        path: `/tmp/life-calendar-${width}.png`,
        fullPage: true,
      });
      const mobileWeeks = await buttons.evaluateAll((buttons) =>
        buttons.map((button) => button.getAttribute("aria-label")),
      );

      await page.setViewportSize({ width: 1280, height: 900 });
      await expect(decade).toBeHidden();
      await expect(page.getByRole("group", { name: /^Âge :/ })).toHaveCount(90);
      await expect(page.getByRole("button", { name: /^Semaine / })).toHaveCount(
        4696,
      );
      expect(
        await buttons.evaluateAll((buttons) =>
          buttons.map((button) => button.getAttribute("aria-label")),
        ),
      ).toEqual(mobileWeeks);
      await page.setViewportSize({ width, height: 844 });
      await page.getByRole("button", { name: "Effacer ma date" }).tap();
      await page.reload();
      await expect(
        page.getByRole("region", { name: "Calendrier de vie" }),
      ).toBeHidden();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBe(width);
    });

    test("restaurer hors horizon puis corriger la naissance ouvre le bon groupe", async ({
      page,
    }) => {
      await page.clock.setFixedTime(new Date("2026-10-11T12:00:00+02:00"));
      await page.goto("/");
      await chooseDate(page, "1900-01-01", "lundi 1 janvier 1900");
      await page.reload();
      const decade = page.getByRole("combobox", { name: "Décennie de vie" });

      await expect(decade).toHaveValue("8");
      await expect(
        page.getByRole("button", { name: "Âge : 89 ans", exact: true }),
      ).toHaveAttribute("aria-expanded", "true");
      await expect(
        page.getByText("Tu as dépassé l'horizon de ce calendrier", {
          exact: true,
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: /Semaine actuelle$/ }),
      ).toHaveCount(0);
      await page
        .getByRole("button", { name: /^Semaine / })
        .first()
        .tap();
      await expect(
        page.getByRole("status", { name: "Détails de la semaine" }),
      ).toContainText("Semaine écoulée");
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBe(width);
      await page.screenshot({
        animations: "disabled",
        path: `/tmp/life-calendar-horizon-${width}.png`,
        fullPage: true,
      });
      await chooseDate(page, "2000-01-01", "samedi 1 janvier 2000");
      await expect(decade).toHaveValue("2");
      await expect(
        page.getByRole("button", { name: "Âge : 26 ans", exact: true }),
      ).toHaveAttribute("aria-expanded", "true");
      await expect(
        page.getByRole("button", { name: /Semaine actuelle$/ }),
      ).toHaveCount(1);
      await expect(
        page.getByRole("status", { name: "Détails de la semaine" }),
      ).toContainText("Sélectionne une semaine");
      await page.reload();
      await expect(decade).toHaveValue("2");
      await page.getByRole("button", { name: /date de naissance/i }).tap();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBe(width);
      await page.screenshot({
        animations: "disabled",
        path: `/tmp/life-calendar-input-${width}.png`,
        fullPage: true,
      });
      await page.keyboard.press("Escape");
      await page.getByRole("button", { name: "Effacer ma date" }).tap();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBe(width);
    });
  });
}
