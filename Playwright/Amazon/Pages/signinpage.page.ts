import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";
export class SignInPage {
    readonly page: Page;
constructor(page: Page) {
    this.page = page ;
}

async signInPage(){

    await expect(this.page).toHaveURL('https://www.amazon.fr/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.fr%2F%3Fref_%3Dnav_custrec_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=frflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0');
    await expect(this.page.getByRole('heading', { name: 'S\'identifier' })).toBeVisible();
}


}