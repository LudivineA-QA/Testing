import pytest, pytest_bdd, time
from pytest_bdd import parsers

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from pytest_bdd import scenario, given, then, when

@pytest.fixture
def browser():
    driver = webdriver.Firefox()
    driver.maximize_window()
    yield driver
    driver.quit()

global standard
global locked_out
global password
global first_name
global last_name
global code_postal

@scenario('tp.feature','Connect with a standard account')

def test_connect_standard_user():
    pass

@given('I am on the login page')
def open_login_page(browser):
    browser.get('https://www.saucedemo.com/')
    assert browser.current_url == 'https://www.saucedemo.com/'
    global standard
    global locked_out
    global password
    standard = "standard_user"
    locked_out = "locked_out_user"
    password = "secret_sauce"

@when('I enter the standard username and password')
def enter_logs(browser):
    browser.find_element(By.ID, 'user-name').send_keys(standard)
    browser.find_element(By.ID, 'password').send_keys(password)
@when('I click on login')
def click_on_login(browser):
    browser.find_element(By.ID, 'login-button').click()

@then('I should connect')
def verify_connexion(browser):
    assert browser.current_url == 'https://www.saucedemo.com/inventory.html'
    browser.find_element(By.ID, 'react-burger-menu-btn').click()
    assert browser.find_element(By.ID, 'logout_sidebar_link').is_displayed()

@scenario('tp.feature','Disconnect')

def test_disconnect():
    pass

@given('I am connected')
def connexion(browser):
    browser.get('https://www.saucedemo.com/')
    assert browser.current_url == 'https://www.saucedemo.com/'
    global standard
    global password
    standard = "standard_user"
    password = "secret_sauce"
    browser.find_element(By.ID, 'user-name').send_keys(standard)
    browser.find_element(By.ID, 'password').send_keys(password)
    browser.find_element(By.ID, 'login-button').click()

@when('I click on logout')
def click_on_logout(browser):
    assert browser.current_url == 'https://www.saucedemo.com/inventory.html'
    browser.find_element(By.ID, 'react-burger-menu-btn').click()
    browser.find_element(By.ID, 'logout_sidebar_link').click()
    
@then('I should be disconnected')
def verify_user_disconnected(browser):    
    assert browser.current_url == 'https://www.saucedemo.com/'
    assert browser.find_element(By.ID, 'login-button').is_displayed()

@scenario('tp.feature','Connect with locked_out account')

def test_locked_out():
    pass

@when('I enter the locked_out username and password')
def enter_error_logs(browser):
        browser.find_element(By.ID, 'user-name').send_keys(locked_out)
        browser.find_element(By.ID, 'password').send_keys(password)

@then('I should not connect and have an error message')
def verify_error(browser):
    assert browser.current_url == 'https://www.saucedemo.com/'
    assert browser.find_element(By.CLASS_NAME, "error-message-container").is_displayed()


@scenario('tp.feature','Add two products in the basket')

def test_add_products():
     pass

@given("I have sorted my items by price (high to low)")
def sort_by_price(browser):
    sort_value = Select(browser.find_element(By.CLASS_NAME, 'product_sort_container'))    
    sort_value.select_by_value('hilo')

@when("I add the two first products of the page in the basket")
def add_products(browser):
     browser.find_element(By.ID, "add-to-cart-sauce-labs-fleece-jacket").click()
     browser.find_element(By.ID, "add-to-cart-sauce-labs-backpack").click()

@when('I go to my cart page')
def change_to_cart_page(browser):
    browser.find_element(By.ID, "shopping_cart_container").click()
    assert browser.current_url == "https://www.saucedemo.com/cart.html"

@then("the products should be inside my basket")
def verify_product_in_cart(browser):
    assert browser.find_element(By.ID, "item_5_title_link").is_displayed()
    assert browser.find_element(By.ID, "item_4_title_link").is_displayed()

@scenario('tp.feature', 'Finalize order')

def test_finalize_order():
    pass

@given('I am on my cart page')
def cart_page(browser):
    browser.find_element(By.ID, "add-to-cart-sauce-labs-fleece-jacket").click()
    browser.find_element(By.ID, "add-to-cart-sauce-labs-backpack").click()
    browser.find_element(By.ID, "shopping_cart_container").click()
    assert browser.current_url == "https://www.saucedemo.com/cart.html"
    global first_name
    global last_name
    global code_postal
    first_name = "toto"
    last_name = "dada"
    code_postal = "15000"

@given("I have two products in cart")
def verify_items_in_cart(browser):
        assert browser.find_element(By.ID, "item_5_title_link").is_displayed()
        assert browser.find_element(By.ID, "item_4_title_link").is_displayed()

@when("I click on checkout")
def click_on_checkout(browser):
     browser.find_element(By.ID, "checkout").click()
     assert browser.current_url == "https://www.saucedemo.com/checkout-step-one.html"

@when("I put my informations")
def enter_informations(browser):
    browser.find_element(By.ID, 'first-name').send_keys(first_name)
    browser.find_element(By.ID, 'last-name').send_keys(last_name)
    browser.find_element(By.ID, 'postal-code').send_keys(code_postal)
    browser.find_element(By.ID, 'continue').click()

@then("I should order my cart")
def order_cart(browser):
    assert browser.current_url == "https://www.saucedemo.com/checkout-step-two.html"
    assert browser.find_element(By.ID, "item_5_title_link").is_displayed()
    assert browser.find_element(By.ID, "item_4_title_link").is_displayed()
    price_item_1 = browser.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div/div[1]/div[3]/div[2]/div[2]/div").text
    assert price_item_1 == "$49.99" 
    price_item_2 = browser.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div/div[1]/div[4]/div[2]/div[2]/div").text
    assert price_item_2 == "$29.99" 
    subtotal_price = browser.find_element(By.CLASS_NAME, "summary_subtotal_label").text
    # subtotal_price_translate = int(subtotal_price.encode('ascii'))
    # assert subtotal_price_translate == 79.98 
    # print(subtotal_price_translate)
    tax = browser.find_element(By.CLASS_NAME, "summary_tax_label").text
    total = browser.find_element(By.CLASS_NAME, "summary_total_label").text
    assert subtotal_price == "Item total: $79.98"
    assert tax == "Tax: $6.40"
    assert total == "Total: $86.38"
    browser.find_element(By.ID, "finish").click()

@then("Verify it")
def verify_order_complete(browser):
    assert browser.current_url == "https://www.saucedemo.com/checkout-complete.html"
    assert browser.find_element(By.ID, "checkout_complete_container").is_displayed()


