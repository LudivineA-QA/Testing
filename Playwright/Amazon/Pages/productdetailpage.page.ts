import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";
export class ProductDetailPage {
    readonly page: Page;
constructor(page: Page) {
    this.page = page ;
}


async getProductTitle(){

    await this.page.locator('#productTitle').textContent();

}

async addAndBuyButtonVisible(){

    await expect(this.page.locator('#add-to-cart-button')).toBeVisible();
    await expect(this.page.locator('[id="submit\\.buy-now"]')).toBeVisible();
}

async addAndBuyButtonEnabled(){

    await expect(this.page.locator('#add-to-cart-button')).toBeEnabled();
    await expect(this.page.locator('[id="submit\\.buy-now"]')).toBeEnabled();
}

async switchDetailPage(){

    await this.page.goto('https://www.amazon.fr/Console-Nintendo-Switch-Mod%C3%A8le-Manettes/dp/B098BYN3X3/ref=sr_1_5?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=33B9OHDRKQDQY&dib=eyJ2IjoiMSJ9.dYj7rYzd_m9YQeY5k_xKQVsE97rjTZWeJRuP95mOzkF1EtTXiW4hS6yxKOUghFlaMBpeiI1q5edqKA_E1kldGlGG5jUIqfmEFmckiOzmlQ2hqjciMbsyKFJeo9EvacDiBUVwLex9Q67ejdY__MmbwR9gc8jaJ_FvAXEHR-K8YC4H_u0lMkEIukyMP780tGfs_oPn4yYQTI1GBke5ubaX2ieyigcoiJObsd4WAuMUhOGdPsr3W6jnnZhbUxqcvw4ttjQkfMErrI2Iwegj08k2CZY-dNIUU02ScBF-yQ272Yw.pRiJc15-r1a0KUi4VoeqAP2MoEhBvyTok6YOkKNFXDA&dib_tag=se&keywords=switch%2Boled&qid=1715765561&sprefix=switch%2Boled%2Caps%2C109&sr=8-5&th=1');
}

async selectQuantity2(){
    await this.page.locator('#quantityRelocate_feature_div').getByText('Quantité :1').click();
    await this.page.getByLabel('2', { exact: true }).getByText('2').click();
}

async addToCart(){
    await this.page.locator('#add-to-cart-button').click();
    const locatorIsPresent = await this.page.getByRole('button', { name: 'Non, merci.' }).isVisible();
    if (locatorIsPresent){
        await this.page.getByRole('button', { name: 'Non, merci.' }).click();
    }

    await expect(this.page.getByRole('heading', { name: 'Ajouté au panier' })).toBeVisible();

}

async clickOnReviews(){
    await this.page.locator('#averageCustomerReviews_feature_div').getByRole('link', { name: 'évaluations' }).click();
}


}