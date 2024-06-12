*** Settings ***

Library    SeleniumLibrary    run_on_failure=None
Library    Collections
Resource    Keywords.robot
Resource    Variables.robot

Suite Teardown    Run Keyword    Delete All Cookies



*** Test Cases ***

Test - Dictionary
    Open url    ${url_search_books}
    Treat cookies
    Select product    ${product_list}
    ${name_product_from_list_1}    Get Product name    
    Add product
    Go To    ${url_search_books}
    Select product    ${product_list2}
    ${name_product_from_list_2}    Get Product name
    @{ProductsName}    Create List    ${name_product_from_list_1}    ${name_product_from_list_2}
    Add product
    Go to Basket    ${ProductsName}








