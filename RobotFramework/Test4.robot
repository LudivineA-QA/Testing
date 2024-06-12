*** Settings ***

Library    SeleniumLibrary    run_on_failure=None
Resource    Keywords.robot
Resource    Variables.robot

Suite Teardown    Run Keyword    Delete All Cookies


*** Test Cases ***

Test - Select in a list
    Open url    ${url_cdiscount}
    Treat cookies
    Search article    ${produit1}
    Select product    ${product_list}
    Select Quantity    ${quantity1}  





