Feature: TP Selenium Sauce Demo
    As a visitor
    I want to connect and buy articles

Scenario: Connect with a standard account
    Given I am on the login page
    When I enter the standard username and password
    And  I click on login
    Then I should connect

Scenario: Disconnect
    Given I am connected
    When I click on logout
    Then I should be disconnected

Scenario: Connect with locked_out account
    Given I am on the login page
    When I enter the locked_out username and password
    And  I click on login
    Then I should not connect and have an error message

Scenario: Add two products in the basket
    Given I am connected
    Given I have sorted my items by price (high to low)
    When I add the two first products of the page in the basket
    And I go to my cart page
    Then the products should be inside my basket

Scenario: Finalize order
    Given I am connected
    And I am on my cart page
    And I have two products in cart
    When I click on checkout
    And I put my informations
    Then I should order my cart
    And Verify it
    