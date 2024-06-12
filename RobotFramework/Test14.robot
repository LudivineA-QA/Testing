*** Settings ***

Library    SeleniumLibrary    run_on_failure=None
Library    Collections
Resource    Keywords.robot
Resource    Variables.robot

Suite Teardown    Run Keyword    Delete All Cookies



*** Test Cases ***

Test - IF Connect
    Open url    ${url_cdiscount}
    Treat Cookies with condition    "Refuser"
    Connect user condition get text    ${mail}    ${password}    ${name}
    Go To    ${url_cdiscount}
    Connect user condition get text    ${mail}    ${password}    ${name}













