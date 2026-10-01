import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { UserSettingPage } from "../pageObjects/UserSettingPage";
import { CustomWorld } from "../support/customWorld";

When ('the admin user deletes a user with email {string}', async function (this: CustomWorld, email: string) {
  this.userSettingPage = new UserSettingPage(this.page);
  await this.userSettingPage.deleteUser(email)
})

Then ('the deleted user with email {string} should not be in the users list', async function (this: CustomWorld, email: string) {
  const userLocator = this.page.locator(`div[title='${email}']`);
  await expect(userLocator).toBeHidden();
})
