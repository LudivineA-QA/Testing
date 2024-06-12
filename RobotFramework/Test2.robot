*** Settings ***

Library    SeleniumLibrary    run_on_failure=None
Library    XML

Suite Teardown    Run Keyword    Delete All Cookies

*** Test Cases ***

Test - Utilisation du Input
    Open url cdiscount
    Treat coockies
    Search article    ${produit}



*** Keywords ***

Open url cdiscount
    Open Browser    https://www.cdiscount.com/
    Maximize Browser Window

Treat coockies
    Wait Until Element Is Visible    css:#footer_tc_privacy_button_3    15
    Click Element    css:#footer_tc_privacy_button_3

Search article
    [Arguments]    ${NomProduit}
    Input Text    search    ${NomProduit}
    Click Element    //button[contains(@class, "js-search__icon")]



*** Variables ***

${produit}    ordinateur portable


