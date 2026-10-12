import { differenceInCalendarDays } from "date-fns";

export function anniversary(birthDate: Date, age: number): Date {
  // Le constructeur reporte le 29 février au 1er mars hors année bissextile.
  return new Date(
    birthDate.getFullYear() + age,
    birthDate.getMonth(),
    birthDate.getDate(),
  );
}

export function ageAtDate(birthDate: Date, date: Date): number {
  const age = date.getFullYear() - birthDate.getFullYear();

  return date < anniversary(birthDate, age) ? age - 1 : age;
}

export function lifeSummary(birthDate: Date, today: Date) {
  const age = ageAtDate(birthDate, today);
  const elapsedDays = differenceInCalendarDays(today, birthDate);
  const birthdayToday =
    differenceInCalendarDays(anniversary(birthDate, age), today) === 0;
  const nextBirthday = anniversary(birthDate, birthdayToday ? age : age + 1);

  return {
    age,
    elapsedDays,
    completedWeeks: Math.floor(elapsedDays / 7),
    birthdayToday,
    nextBirthday,
    birthdayDays: differenceInCalendarDays(nextBirthday, today),
  };
}
