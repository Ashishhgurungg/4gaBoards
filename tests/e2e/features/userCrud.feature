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

  Scenario Outline: Update existing user
    Given the admin has created a new user with email "<email>", password "<password>", name "<name>" and username "<username>"
    When the admin user updates a user with email "<email>" with following data:
      | email   | new_email   | new_password   | new_name   | new_username   |
      | <email> | <new_email> | <new_password> | <new_name> | <new_username> |
    Then the updated user with new email "<new_email>" should be visible in the users list
    Examples:
      | email             | password     | name   | username  |  new_email             | new_password  | new_name      | new_username |
      | ashish@gmail.com  | Ashish@12345 | Ashish | Ashish    | newashishgrg@gmail.com | newAshish@123 | Gurung Ashish | newAshish    |
      | bipin@gmail.com   | Bipin@12345  | Bipin  | Bipinnnnn | newbipingrg@gmail.com  | newBipin@123  | Gurung Bipin  | newBipin     |

  Scenario Outline: Delete users
    Given the admin has created a new user with email "<email>", password "<password>", name "<name>" and username "<username>"
    When the admin user deletes a user with email "<email>"
    Then the deleted user with email "<email>" should not be in the users list
    Examples:
      | email            | password     | name          | username     |
      | krish@gmail.com  | Ashish@12345 | Poon krish    | krishpoon    |
      | saurav@gmail.com | Bipin@12345  | Gurung saurav | sauravgurung |
