import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";
export class ProductListPage {
    readonly page: Page;
constructor(page: Page) {
    this.page = page ;
}




async verifySearchProduct(product: string) {
    await this.page.locator("//div[@id='search']").isVisible();    
    await expect(this.page.locator("//div[@id='search']")).toBeVisible();    
    await expect(this.page.getByText('Résultats', { exact: true })).toBeVisible();    
    await expect(this.page.locator(`//span[contains(@class, 'a-color-state') and contains(text(),"${product}")]`)).toBeVisible();    
}

async verifyFirstProductIsClickable(){
    const elementToSelect = this.page.locator(".s-product-image-container").first();
    await expect(elementToSelect).toBeEnabled()
}

async getTextFromFirstProduct(){

    await this.page.locator(".s-product-image-container").first().textContent();

}

async clickOnFirstProduct(){

    await this.page.locator(".s-product-image-container").first().click(); 

}

async filter(){

    await this.page.getByRole('link', { name: '4 étoiles et plus' }).click();
    await this.page.getByText('Trier par:Mis en avant').click();
    await this.page.getByLabel('Prix : Ordre décroissant').click();

}


}