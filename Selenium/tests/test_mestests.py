import pytest, pytest_bdd, time
from pytest_bdd import parsers

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from pytest_bdd import scenario, given, then, when

@pytest.fixture
def browser():
    # Assurez-vous que le pilote est installé et configuré correctement 
    driver = webdriver.Firefox()
    yield driver
    driver.quit()

global value_index

# 1er scénario, je teste la présence des éléments dans ma page
@scenario('features/contact_form.feature', 'Verify the presence of the input field')

def test_input_field_presence():
    pass # Les étapes réelles du test seront exécutées par les implémentations d'étapes ci-dessous

@given('I am on the contact page')
def open_contact_page(browser):
    # Remplacez cette URL par l'URL réelle de votre page de contact
    browser.get("file:///C:/Users/Administrateur/Desktop/Python/Selenium/contact.html")

# @then('I should see the "nom" input field "text"')
# def see_input_field(browser):
#         assert browser.find_element(By.ID, "nom_user").is_displayed()

@then(parsers.parse('I should see the "{field_name}" input field "{field_type}"'))
def see_input_field(browser, field_name, field_type):
    assert browser.find_element(By.NAME, field_name).is_displayed()
    assert browser.find_element(By.NAME, field_name).get_attribute('type') == field_type

@scenario('features/contact_form.feature', 'Verify input field is disabled')

def test_input_field_disabled():
    pass

@then('I should see the "nom_user" is disabled')
def see_nom_user_disabled(browser):
    assert not browser.find_element(By.NAME, "nom_user").is_enabled()


@then('I should see the "prenom_user" is enabled')
def see_prenom_user_disabled(browser):
    assert browser.find_element(By.NAME, "prenom_user").is_enabled()

@scenario('features/contact_form.feature', 'Verify label text')

def test_label_field():
    pass

@then('I should see the "nom_user" label is equal to "Votre nom :"')
def see_nom_equal_to(browser):
    assert browser.find_element(By.XPATH, "//label[@for='nom_user']").text == "Votre nom :"

@scenario('features/contact_form.feature', 'Write in a field')

def test_write_field():
    pass

@then('I can write "toto" in the field "message"')
def write_message_field(browser):
    inputElement = browser.find_element(By.ID, 'message')
    inputElement.send_keys('toto')
    # brower.find_element(By.ID, 'message').send_keys('toto')
    # time.sleep(10)
    # assert inputElement.get_attribute('value') == "toto"


@scenario('features/contact_form.feature', 'I can change page')

def test_change_page():
    pass

@given('I am on the index page')
def open_index_page(browser):
    browser.get("file:///C:/Users/Administrateur/Desktop/Python/Selenium/index.html")

@when('I click on the contact link')
def click_contact_link(browser): 
    # browser.find_element(By.LINK_TEXT, 'Cliquez ici pour nous contacter').click()
    browser.find_element(By.XPATH, '/html/body/footer/ul/li/a[2]').click()
    

@then('I am redirected on the contact page')
def redirect_page(browser):
    assert browser.find_element(By.ID, 'monformulaire').is_displayed()

@scenario('features/contact_form.feature', 'Compare values on two pages')

def test_compare_two_values():
    pass

@given('I am on the index page with a value to compare')
def open_index_page(browser):
    browser.get("file:///C:/Users/Administrateur/Desktop/Python/Selenium/index.html")
    global value_index
    value_index = browser.find_element(By.TAG_NAME, 'h2').text

@then('the values to compare are equals')
def values_are_equals(browser):
    value_contact = value_index = browser.find_element(By.TAG_NAME, 'h2').text
    assert value_contact == value_index

@scenario('./features/contact_form.feature', "I can select a fruit")
def test_select_fruit():
    pass

@then('I can select mango in the fruits dropdown')
def select_from_dropdown(browser):    
    fruitsSelection = Select(browser.find_element(By.ID, 'fruits'))    
    fruitsSelection.select_by_value('mango')
    time.sleep(10)