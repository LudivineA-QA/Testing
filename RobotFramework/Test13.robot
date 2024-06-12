*** Settings ***

Library    SeleniumLibrary    run_on_failure=None
Library    Collections
Resource    Keywords.robot
Resource    Variables.robot

Suite Teardown    Run Keyword    Delete All Cookies



*** Test Cases ***

Test - IF condition
    Open url    ${url_cdiscount}
    Treat Cookies with condition    "Refuser"

# Test - Arguments
#     Open url    ${url_cdiscount}
#     Treat Cookies with Arguments    Continuer sans accepter











