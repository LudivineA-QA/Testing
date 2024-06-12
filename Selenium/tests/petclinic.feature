Feature: Create and Edit User
    As a visitor
    I want to ensure that I can create a profil and edit it

Scenario: I can add a new owner
    Given I am on the find owner page
    When I add a new user
    Then The new user details are displayed on the users list
    And The new user details are displayed on the users details