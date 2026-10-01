import { When, Then, DataTable, Given } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/customWorld";
import { UserSettingPage } from "../pageObjects/UserSettingPage";

Given ('the admin has created a new user with email {string}, password {string}, name {string} and username {string}',
  async function (this: CustomWorld, email: string, password: string, name: string, username: string) {
    this.userSettingPage = new UserSettingPage(this.page);
    await this.userSettingPage.addUserButton.click();
    await this.userSettingPage.addUser(email, password, name, username);
})

When('the admin user updates a user with email {string} with following data:',
  async function (this: CustomWorld, oldEmail: string, updatedDataTable: DataTable) {
    const newData = updatedDataTable.hashes()[0];
    await this.userSettingPage.updateName(oldEmail, newData.new_name);
    await this.userSettingPage.updateUserName(oldEmail, newData.new_username);
    await this.userSettingPage.updateUserPassword(oldEmail, newData.new_password);
    await this.userSettingPage.updateUserEmail(oldEmail, newData.new_email);
})

Then('the updated user with new email {string} should be visible in the users list',
  async function (this: CustomWorld, newEmail: string) {
    const userLocator = this.page.locator(`div[title='${newEmail}']`);
    await expect(userLocator).toBeVisible();
})
