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

global first_name
global last_name
global address
global city
global tel

@scenario('petclinic.feature','I can add a new owner')

def test_add_new_user():
    pass

@given('I am on the find owner page')
def open_find_owner_page(browser):
    browser.get('https://spring-framework-petclinic-qctjpkmzuq-od.a.run.app/owners/find')
    global first_name
    global last_name
    global address
    global city
    global tel
    global full_name
    last_name = 'dada'
    first_name = 'toto'
    address = '54 rue des Artistes'
    city = 'Lille'
    tel = '0712345678'
    full_name = first_name +' '+ last_name

@when('I add a new user')
def add_a_new_owner(browser):
    browser.find_element(By.XPATH, "//a[contains(@href,'owners/new')]").click()
    assert browser.current_url == 'https://spring-framework-petclinic-qctjpkmzuq-od.a.run.app/owners/new'
    browser.find_element(By.ID, 'firstName').send_keys(first_name)
    browser.find_element(By.ID, 'lastName').send_keys(last_name)
    browser.find_element(By.ID, 'address').send_keys(address)
    browser.find_element(By.ID, 'city').send_keys(city)
    browser.find_element(By.ID, 'telephone').send_keys(tel)
    browser.find_element(By.XPATH, "//button[contains(@type,'submit')]").click()

@then('The new user details are displayed on the users list')
def display_new_owner_detail_are_on_the_users_list(browser):
    browser.find_element(By.XPATH, "//a[contains(@href,'owners/find')]").click()
    assert browser.current_url == 'https://spring-framework-petclinic-qctjpkmzuq-od.a.run.app/owners/find'
    browser.find_element(By.NAME, 'lastName').send_keys(last_name)
    browser.find_element(By.XPATH, "//button[contains(@type,'submit')]").click()
    value = browser.find_elements(By.CSS_SELECTOR, "#ownersTable > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > a")
    assert full_name == value[0].text


@then('The new user details are displayed on the users details')
def display_user_detail(browser):
    browser.find_element(By.XPATH, "//a[contains(@href,'owners/327')]").click()
    value_owner = browser.find_element(By.TAG_NAME, 'strong').text
    assert full_name == value_owner


    