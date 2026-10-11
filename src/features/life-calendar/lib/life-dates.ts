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
