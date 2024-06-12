import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/homepage.page';
import { ProductListPage } from '../Pages/productlistpage.page';
import { ProductDetailPage } from '../Pages/productdetailpage.page';
import { SignInPage } from '../Pages/signinpage.page';


test('Verify login is present', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.identificationButtonisVisible();
    await page.close();
})

test('Verify Paiement Help is present', async ({ page }) => {    
    const homePage = new HomePage(page);
    await homePage.scrollToElement("//div[contains(@role, 'heading') and contains(text(), 'Moyens de paiement Amazon')]");
    await page.close();
})

test('Product Search Bar is working', async ({ page }) => {
    const homePage = new HomePage(page);
    const productListPage = new ProductListPage(page);
    await homePage.searchProduct('switch oled');
    await productListPage.verifySearchProduct('switch oled');
    await page.close();
})

test('Product is clickable', async ({ page }) => {
    const homePage = new HomePage(page);
    const productListPage = new ProductListPage(page);
    await homePage.searchProduct('switch');
    await productListPage.verifySearchProduct('switch')
    await productListPage.verifyFirstProductIsClickable();
    await page.close();
})


test('Click on first product', async ({ page }) => {
    const homePage = new HomePage(page);
    const productListPage = new ProductListPage(page);
    const productDetailPage = new ProductDetailPage(page);
    await homePage.searchProduct('switch');
    const firstProductName = await productListPage.getTextFromFirstProduct();
    await productListPage.clickOnFirstProduct();
    const productTitle = await productDetailPage.getProductTitle();
    expect(firstProductName).toEqual(productTitle);
    await page.close();
})

test('Verify Buttons to buy', async ({ page }) => {
    const productDetailPage = new ProductDetailPage(page);
    await productDetailPage.switchDetailPage();
    await productDetailPage.addAndBuyButtonVisible();
    await productDetailPage.addAndBuyButtonEnabled();
    await page.close();
})

test('Add Product To Cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productDetailPage = new ProductDetailPage(page);
    await productDetailPage.switchDetailPage();
    await homePage.declineCoockies();
    await productDetailPage.selectQuantity2();
    await productDetailPage.addToCart();
    
})

test('User can add a product in cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productListPage = new ProductListPage(page);
    const productDetailPage = new ProductDetailPage(page);
    await homePage.searchProduct('switch oled');
    await productListPage.verifySearchProduct('switch oled');
    await productListPage.clickOnFirstProduct();
    await productDetailPage.addAndBuyButtonVisible();
    await productDetailPage.addAndBuyButtonEnabled();
    await productDetailPage.selectQuantity2();
    await productDetailPage.addToCart();
    await homePage.clickOnSignIn();
    await page.close();
})

test('User can use filter in search product', async ({ page }) => {
    const homePage = new HomePage(page);
    const productListPage = new ProductListPage(page);
    const productDetailPage = new ProductDetailPage(page);
    await homePage.searchProduct('pc portable');
    await productListPage.verifySearchProduct('pc portable');
    await productListPage.filter();
    await productListPage.clickOnFirstProduct();
    await productDetailPage.clickOnReviews();
    await page.close();
})
