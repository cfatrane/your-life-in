import { expect, type Page } from "@playwright/test";

export async function chooseDate(page: Page, date: string, day: string) {
  const [year, month] = date.split("-");

  await page.getByRole("button", { name: /date de naissance/i }).click();
  await page
    .getByRole("combobox", { name: "Choisir l'année", exact: true })
    .selectOption(year);
  await page
    .getByRole("combobox", { name: "Choisir le mois", exact: true })
    .selectOption(String(Number(month) - 1));
  await page.getByRole("button", { name: day, exact: true }).click();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("combobox", { name: "Choisir l'année", exact: true }),
  ).toBeHidden();
}
