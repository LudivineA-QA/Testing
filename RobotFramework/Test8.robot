*** Settings ***

Library    SeleniumLibrary    run_on_failure=None
Resource    Keywords.robot
Resource    Variables.robot

Suite Teardown    Run Keyword    Delete All Cookies



*** Test Cases ***

Test - Verify List
    Open url    ${url_search_books}
    Treat cookies
    @{CategoryNames}    Get Category Name
#     @{CategoryName}    Create List    Policier    Litterature francaise    Litterature sentimentale    9 -12 ans    Litterature etrangere
    FOR    ${index}    ${category}    IN ENUMERATE    @{CategoryNames}    start=1
         #Element Text Should Be    (//div[@id="searchBannerLister"]//div[contains(@class,"c-scroller__item")])[${index}]    ${category}        
         Looping Inside the Catagory    ${index}    ${category}        
    END

     # FOR    ${index}    IN RANGE    1    5
     #     Element Text Should Be    (//div[@id="searchBannerLister"]//div[contains(@class,"c-scroller__item")])[${index}]    ${CategoryNames}[${index-1}]        
     # END







