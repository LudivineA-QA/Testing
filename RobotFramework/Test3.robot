*** Settings ***

Library    SeleniumLibrary    run_on_failure=None
Library    XML
Resource    Keywords.robot
Resource    Variables.robot

Suite Teardown    Run Keyword    Delete All Cookies


*** Test Cases ***

Test - Connexion
    Open url    ${url_cdiscount}
    Treat cookies
    Connect user    ${mail}    ${password}    ${name}    





