Feature: Manage users
  As an admin
  I want to create update and delete users
  So that I can organize them efficiently

  Background:
    Given the admin user has logged in with the following credentials:
      | email | password |
      | demo  | demo     |
    And the admin user has navigated to users setting page

  Scenario Outline: Create new users
    When the admin user creates a new user with email "<email>", password "<password>", name "<name>" and username "<username>"
    Then the new user with email "<email>" should be added to users list

    Examples:
      | email           | password  | name  | username  |
      | grace@gmail.com | grace@123 | grace | graceUser |
      | jack@gmail.com  | jack@123  | jack  | jackUser  |

