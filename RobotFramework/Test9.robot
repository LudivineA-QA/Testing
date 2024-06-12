*** Settings ***

Library    SeleniumLibrary    run_on_failure=None
Library    Collections
Resource    Keywords.robot
Resource    Variables.robot

Suite Teardown    Run Keyword    Delete All Cookies



*** Test Cases ***

Test - List Manipulation
    Open url    ${url_search_books}
    Treat cookies
    @{ProductNames}    Get Product Name in a list
    # ${count}    Get Length    ${ProductNames}
    # Length Should Be    ${ProductNames}    ${count}
    Length Should Be    ${ProductNames}    10 








