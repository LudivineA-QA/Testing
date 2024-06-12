*** Settings ***

Library    SeleniumLibrary    run_on_failure=None
Library    Collections
Resource    Keywords.robot
Resource    Variables.robot

Suite Teardown    Run Keyword    Delete All Cookies



*** Test Cases ***

Test - Search with Dictionary
    Open url    ${url_cdiscount}
    Treat cookies
    &{dic_1_name_and_category}    Create Dictionary    researched_product=${produit2}    category=${cat2}
    &{dic_2_name_and_category}    Create Dictionary    researched_product=${produit3}    category=${cat3}
    @{list_research}    Create List    ${dic_1_name_and_category}    ${dic_2_name_and_category}    
    # Input Text    search    ${dic_1_name_and_category}[researched_product]
    # Click Element    //button[contains(@class, "js-search__icon")]
    # Element Should Contain    (//div[@id="searchBannerLister"]//div[contains(@class,"c-scroller__item")])[1]    ${dic_1_name_and_category}[category]
    # Input Text    search    ${dic_2_name_and_category}[researched_product]
    # Click Element    //button[contains(@class, "js-search__icon")]
    # Element Should Contain    (//div[@id="searchBannerLister"]//div[contains(@class,"c-scroller__item")])[1]    ${dic_2_name_and_category}[category]

    FOR    ${cat_research}    IN    @{list_research}
        Search article    ${cat_research}[researched_product]
        Element Should Contain    //div[@id="searchBannerLister"]    ${cat_research}[category]        
    END










