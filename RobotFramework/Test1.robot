*** Settings ***

Library    SeleniumLibrary

Suite Teardown    Run Keyword    Delete All Cookies

*** Test Cases ***

Test - Utilisation du click
    Open Browser    https://demo.nopcommerce.com/
    Maximize Browser Window
    # Wait Until Element Is Visible    //a[contains(@class, "ico-register") and contains(@href, "/register?returnUrl\=%2F")]
    # Click Element    //a[@class="ico-register"]
    # Click Element    //a[contains(.,"Register")]
    Click Link    /register?returnUrl=%2F


*** Keywords ***

