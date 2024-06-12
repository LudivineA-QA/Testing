*** Settings ***

Library    SeleniumLibrary    run_on_failure=None
Library    Collections



Resource    Keywords.robot

*** Test Cases ***

Test Bonus facture
    Open Browser    ${urlFacture}       service_log_path=${{os.path.devnull}}
    Maximize Browser Window
    Click Element    //a[@href="#/addInvoice"]
    Wait Until Element Is Visible    //div[@id="invoiceNo_add"]
    Input Text    //input[@name="invoice"]    0123456789
    Input Text    //input[@name="company"]    PURE Flight
    Input Text    //input[@name="type"]    Plane Creation
    Input Text    //input[@name="price"]    15 000 000$
    Select From List By Label    //select[@id="selectStatus"]    Paid
    Input Text    //input[@name="dueDate"]    2024-05-13
    Input Text    //input[@name="comment"]    I bought the best plane in the world !
    Click Element    //button[@id="createButton"]



    











*** Variables ***

${urlFacture}    http://inv.beaufortfairmont.com/#/













