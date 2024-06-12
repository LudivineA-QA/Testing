*** Settings ***

Library    SeleniumLibrary    run_on_failure=None
Library    XML
Resource    Keywords.robot
Resource    Variables.robot

Suite Teardown    Run Keyword    Delete All Cookies


*** Test Cases ***

Test - Connexion with dictionary
    Open url    ${url_cdiscount}
    Sleep    10
    Treat cookies
    &{user1_connexion_detail}    Create Dictionary    usermail=${mail}    userpassword=${password}    username=${name}
    # Connect user    usermail=    userpassword=    username=    
    Connect user    ${user1_connexion_detail}[usermail]    ${user1_connexion_detail}[password]    ${user1_connexion_detail}[name]       





