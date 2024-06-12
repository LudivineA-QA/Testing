*** Settings ***

Library    SeleniumLibrary    run_on_failure=None
Library    Collections

*** Keywords ***

Open url
    [Arguments]    ${openURL}
    Open Browser    ${openURL}    service_log_path=${{os.path.devnull}}
    Maximize Browser Window

Clean Browser
    Close All Browsers
    Delete All Cookies

Treat Cookies
    Wait Until Element Is Visible    css:#footer_tc_privacy_button_3    15
    Click Element    css:#footer_tc_privacy_button_3
Treat Cookies with condition
    [Arguments]    ${ActionCookies}
    IF    ${ActionCookies} == "Accepter"
        Wait Until Element Is Visible    //button[@id="footer_tc_privacy_button_2"]
        Click Element    footer_tc_privacy_button_2
    ELSE IF    ${ActionCookies} == "Refuser"
        Wait Until Element Is Visible    //button[@id="footer_tc_privacy_button_3"]
        Click Element    footer_tc_privacy_button_3
    END

Treat Cookies with Arguments
    [Arguments]    ${ActionCookies}
    Wait Until Element Is Visible    //button[@title="${ActionCookies}"]
    Click Element    //button[@title="${ActionCookies}"]
        
Search article
    [Arguments]    ${nom_produit}
    Input Text    search    ${nom_produit}
    ${product_search_url}    Get Location
    Click Element    //button[contains(@class, "js-search__icon")]
    RETURN    ${product_search_url}

Connect user
    [Arguments]    ${User_Mail}    ${User_Password}    ${User_Name}

    ${connexion_statut}    Run Keyword And Return Status    Element Should Be Visible    //span[contains(text(),"Connectez-vous")]    
    IF    "${connexion_statut}" == "True"         
        Click Element    //a[contains(@class, "btn-access__compte")]
        Input Text    //input[@type="email"]    ${User_Mail}
        Input Password    //input[@type="password"]    ${User_Password}
        Press Keys    //input[@value="Se connecter"]     	ENTER
        # Click Element    //input[@value="Se connecter"]    
    ELSE
        Click Element    //div[@class="c-access__compte js-access__compte"]
    END

    Wait Until Element Is Visible    //span[@class="welcomeclientFont welcomeclientBold"]
    Element Should Contain    //span[@class="welcomeclientFont welcomeclientBold"]    ${User_Name}
Connect user condition get text
    [Arguments]    ${User_Mail}    ${User_Password}    ${User_Name}

    ${connexion_button}    Get Text    //div[@class="c-access__compte js-access__compte"]//span[@class="btn-access__label"]    
    IF    "${connexion_button}" == "Connectez-vous"         
        Click Element    //a[contains(@class, "btn-access__compte")]
        Input Text    //input[@type="email"]    ${User_Mail}
        Input Password    //input[@type="password"]    ${User_Password}
        Press Keys    //input[@value="Se connecter"]     	ENTER
        # Click Element    //input[@value="Se connecter"]    
    ELSE
        Click Element    //div[@class="c-access__compte js-access__compte"]
    END

    Wait Until Element Is Visible    //span[@class="welcomeclientFont welcomeclientBold"]
    Element Should Contain    //span[@class="welcomeclientFont welcomeclientBold"]    ${User_Name}

Select product
    [Arguments]    ${list}
    Click Element    //ul[@id="lpBloc"]//li[${list}]//a//h2

Get Product name
    ${name_product}    Get Text    //div[@class="c-fp-heading__title u-mb-xs"]
    RETURN    ${name_product}
    
Select Quantity
    [Arguments]    ${quantityvalue}
    Select From List By Label    id=ProductFormData_ProductPostedForm_QuantitySelected    ${quantityvalue}
    Element Should Contain    id=ProductFormData_ProductPostedForm_QuantitySelected    ${quantityvalue}

Go to the reviews
    Click Element    //a/span[@class="c-stars-result c-stars-result--small"]
    # Run Keyword And Ignore Error    Scroll Element Into View    id=ProductSheetAccordion-header-3
    # Click Element    id=ProductSheetAccordion-header-3
Sort reviews by
    [Arguments]    ${reviews_list}
    # Click Element    id=review-sort
    Select From List By Label    id=review-sort    ${reviews_list}
    Element Text Should Be    //option[@selected="selected"]    ${reviews_list}

Add product
    # ${basket_quantity}    Get Text    itemCart
    # Convert To Integer    ${basket_quantity}
    Wait Until Element Is Visible    fpAddBsk
    Click Element    fpAddBsk
    # Click Element    //input[contains(@type, "submit") and contains(@value, "Ajouter au panier")]
    Wait Until Element Is Visible    //div[@class="raAddMsgWithCheck"]
    Element Text Should Be    //div[@class="raAddMsgWithCheck"]    Ajouté au panier
    # Element Should Contain    itemCart    ${basket_quantity+1}

Go to Basket
    [Arguments]    ${product}
    Click Element    //div[@class="c-access__basket"]

Get Category Name
    @{Category_Names}    Create List
    FOR    ${index}    IN RANGE    1    6
        ${category_name}    Get Text    (//div[@id="searchBannerLister"]//div[contains(@class,"c-scroller__item")])[${index}]
        Append To List    ${Category_Names}    ${category_name}        
    END
    RETURN    @{Category_Names}

Get First Category Name
        ${category_name}    Get Text    (//div[@id="searchBannerLister"]//div[contains(@class,"c-scroller__item")])[1]
Looping Inside the Catagory
    [Arguments]    ${indexlocator}    ${categoryname}    
    Element Text Should Be    (//div[@id="searchBannerLister"]//div[contains(@class,"c-scroller__item")])[${indexlocator}]    ${categoryname}

Get Product Name in a list
    @{ProductNames}    Create List
    # ${product_count}    Get Element Count    //ul[@id="lpBloc"]//h2
    FOR    ${index}    IN RANGE    10
    # FOR    ${index}    IN RANGE    ${product_count}
    ${product_name}    Get Text    (//ul[@id="lpBloc"]//h2)[${index+1}]
    Append To List    ${ProductNames}    ${product_name}        
    END
    RETURN    @{ProductNames}
    