import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.amazon.fr/');
  await page.getByRole('textbox', { name: 'Search For' }).click();
  await page.getByRole('textbox', { name: 'Search For' }).fill('ordinateur portable');
  await page.getByRole('textbox', { name: 'Search For' }).press('Enter');
  await page.getByRole('button', { name: 'Refuser' }).click();
  await page.getByRole('link', { name: '4 étoiles et plus' }).click();
  await page.getByText('Trier par:Mis en avant').click();
  await page.getByLabel('Prix : Ordre décroissant').getByText('Prix : Ordre décroissant').click();
});