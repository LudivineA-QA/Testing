import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";
export class HomePage {
    readonly page: Page;
constructor(page: Page) {
    this.page = page ;
}

async declineCoockies(){
    const locatorIsPresent = await this.page.locator("//button[@id='sp-cc-rejectall-link']").isVisible();
    if (locatorIsPresent){
        await this.page.locator("//button[@id='sp-cc-rejectall-link']").click();
    }
}

async clickOnSignIn(){
    await this.page.getByRole('link', { name: 'Bonjour, Identifiez-vous' }).click();
}


async identificationButtonisVisible() {
    await this.page.goto('https://www.amazon.fr/');
    await this.declineCoockies(); 
    await this.page.getByRole('link', { name: 'Bonjour, Identifiez-vous' }).hover();
    await this.page.getByRole('link', { name: 'Identifiez-vous', exact: true }).isVisible();
    await expect(this.page.getByRole('link', { name: 'Identifiez-vous', exact: true })).toBeVisible();
}

async searchProduct(product: string) {
    await this.page.goto('https://www.amazon.fr/');
    await this.declineCoockies();  
    await this.page.getByPlaceholder('Rechercher Amazon.fr').isVisible();
    await this.page.getByPlaceholder('Rechercher Amazon.fr').click();
    await this.page.getByPlaceholder('Rechercher Amazon.fr').fill(product);
    await this.page.getByPlaceholder('Rechercher Amazon.fr').press('Enter');    
}

async scrollToElement(locator: string) {
    
    const element = this.page.locator(locator)
    await this.page.goto('https://www.amazon.fr/');
    await this.declineCoockies();
    await element.hover();
    await element.isVisible();    
}



}