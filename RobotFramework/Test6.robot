*** Settings ***

Library    SeleniumLibrary    run_on_failure=None
Resource    Keywords.robot
Resource    Variables.robot

Suite Teardown    Run Keyword    Delete All Cookies



*** Test Cases ***

Test - Add article in basket
    Open url    ${url_cdiscount}
    Treat cookies
    Search article    ${produit2}
    Select product    ${product_list}
    ${name_product_from_list}    Get Product name    
    Add product
    Go to Basket    ${name_product_from_list}







