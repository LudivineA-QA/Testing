*** Settings ***

Library    SeleniumLibrary    run_on_failure=None
Resource    Keywords.robot
Resource    Variables.robot

Suite Teardown    Run Keyword    Clean Browser



*** Test Cases ***

Test - Sort by reviews
    Open url    ${url_cdiscount}
    Treat cookies
    Search article    ${produit1}
    Select product    ${product_list}
    Go to the reviews
    Sort reviews by    ${useful} 





