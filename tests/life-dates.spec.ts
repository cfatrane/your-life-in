import { expect, test } from "@playwright/test";
import { addDays, differenceInCalendarDays, parseISO } from "date-fns";

import { buildWeekList } from "../src/features/life-calendar/lib/build-week-list";
import {
  anniversary,
  lifeSummary,
} from "../src/features/life-calendar/lib/life-dates";

// Ces tests du modèle ne lancent aucun navigateur.
for (const birthDate of ["2000-01-01", "2024-02-29", "1900-01-01"]) {
  test(`90 ans de jours civils sans trou ni doublon : ${birthDate}`, () => {
    const birth = parseISO(birthDate);
    const weeks = buildWeekList(birthDate, "2026-10-12");
    let next = birth;

    for (const [index, week] of weeks.entries()) {
      expect(week.number).toBe(index + 1);
      expect(week.start).toEqual(next);
      const duration = differenceInCalendarDays(week.end, week.start) + 1;

      expect(duration).toBeGreaterThan(0);
      expect(duration).toBeLessThanOrEqual(7);
      if (index < weeks.length - 1) expect(duration).toBe(7);
      next = addDays(week.end, 1);
    }
    expect(next).toEqual(anniversary(birth, 90));

    for (let age = 0; age < 90; age++) {
      expect([52, 53]).toContain(weeks.filter((w) => w.age === age).length);
    }
  });
}

test("repères personnels cohérents sans limiter le temps vécu à 90 ans", () => {
  const summary = lifeSummary(parseISO("2000-01-01"), parseISO("2026-10-12"));

  expect(summary).toMatchObject({
    age: 26,
    elapsedDays: 9781,
    completedWeeks: 1397,
    birthdayToday: false,
    birthdayDays: 81,
  });
  expect(summary.nextBirthday).toEqual(parseISO("2027-01-01"));
  const older = lifeSummary(parseISO("1900-01-01"), parseISO("2026-10-12"));

  expect(older.age).toBe(126);
  expect(older.completedWeeks).toBeGreaterThan(4697);
});

test("anniversaire aujourd’hui et 29 février reporté au 1er mars", () => {
  const birth = parseISO("2024-02-29");

  expect(lifeSummary(birth, parseISO("2025-02-28"))).toMatchObject({
    age: 0,
    birthdayToday: false,
    birthdayDays: 1,
  });
  expect(lifeSummary(birth, new Date(2025, 2, 1, 12))).toMatchObject({
    birthdayToday: true,
    birthdayDays: 0,
  });
  expect(lifeSummary(birth, parseISO("2025-03-01"))).toMatchObject({
    age: 1,
    birthdayToday: true,
    birthdayDays: 0,
  });
  expect(lifeSummary(birth, parseISO("2028-02-28"))).toMatchObject({
    age: 3,
    birthdayToday: false,
    birthdayDays: 1,
  });
  expect(lifeSummary(birth, parseISO("2028-02-29"))).toMatchObject({
    age: 4,
    birthdayToday: true,
  });
  expect(lifeSummary(birth, birth)).toMatchObject({
    age: 0,
    elapsedDays: 0,
    birthdayToday: true,
  });
});

for (const [birth, today] of [
  ["2026-03-22", "2026-03-29"],
  ["2026-10-18", "2026-10-25"],
]) {
  test(`sept jours lors du changement d’heure : ${today}`, () => {
    expect(lifeSummary(parseISO(birth), parseISO(today))).toMatchObject({
      elapsedDays: 7,
      completedWeeks: 1,
    });
    const weeks = buildWeekList(birth, today);

    expect(weeks[0].state).toBe("past");
    expect(weeks[1]).toMatchObject({
      number: 2,
      start: parseISO(today),
      state: "current",
    });
  });
}

test("semaine traversant l’anniversaire et dernière semaine tronquée", () => {
  expect(
    buildWeekList("2024-02-29", "2025-03-01").find(
      (w) => w.state === "current",
    ),
  ).toMatchObject({
    age: 0,
    start: parseISO("2025-02-27"),
    end: parseISO("2025-03-05"),
  });
  expect(buildWeekList("2000-01-01", "2089-12-31").at(-1)).toMatchObject({
    number: 4697,
    start: parseISO("2089-12-31"),
    end: parseISO("2089-12-31"),
    state: "current",
  });
  expect(
    buildWeekList("2000-01-01", "2090-01-01").every((w) => w.state === "past"),
  ).toBe(true);
});
