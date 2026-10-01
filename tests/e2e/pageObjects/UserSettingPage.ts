import { Locator, Page } from "@playwright/test";

export class UserSettingPage {

  public readonly page: Page;
  public readonly baseUrl: string;
  public readonly userSettingsUrl: string;
  public readonly profileAndSettingButton: Locator;
  public readonly usersButton: Locator;
  public readonly dashboardTitle: Locator;
  public readonly addUserButton: Locator;
  public readonly email: Locator;
  public readonly password: Locator;
  public readonly name: Locator;
  public readonly userName: Locator;
  public readonly addButton: Locator;
  public readonly editUserButton: Locator;
  public readonly editEmailButton: Locator;
  public readonly newEmailField: Locator;
  public readonly saveButton: Locator;
  public readonly editPasswordButton: Locator;
  public readonly editUserNameButton: Locator;
  public readonly newPasswordField: Locator;
  public readonly deleteButton: Locator;
  public readonly newUserNameField: Locator;
  public readonly editInformationButton: Locator;
  public readonly nameField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = 'http://localhost:3000';
    this.userSettingsUrl = `${this.baseUrl}/settings/users`;
    this.profileAndSettingButton = this.page.locator("button[title='Profile and Settings']");
    this.usersButton = this.page.locator("button[title='Users']");
    this.dashboardTitle = this.page.locator("div[title='Settings: Users']");
    this.addUserButton = this.page.locator("button[title='Add User']").nth(0);
    this.email = this.page.locator("input[name='email']")
    this.password = this.page.locator("input[name='password']")
    this.name = this.page.locator("input[name='name']")
    this.userName = this.page.locator("input[name='username']")
    this.addButton = this.page.locator("button[title='Add User']").nth(1);
    this.deleteButton = this.page.locator("button[title='Delete user']");
    this.editUserButton = this.page.locator("button[title='Edit User']");
    this.editEmailButton = this.page.locator("button[title='Edit Email']");
    this.newEmailField = this.page.locator("input[name='email']");
    this.newPasswordField = this.page.locator("input[name='password']");
    this.saveButton = this.page.locator("button[title='Save']");
    this.editPasswordButton = this.page.locator("button[title='Edit Password']");
    this.editUserNameButton = this.page.locator("button[title='Edit Username']");
    this.newUserNameField = this.page.locator("input[name='username']");
    this.editInformationButton = this.page.locator("button[title='Edit Information']")
    this.nameField = this.page.locator("input[name='name']")
  }

  public async addUser(email: string, password: string, name: string, username: string):Promise<void> {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.name.fill(name);
    await this.userName.fill(username);
    await this.addButton.click();
  }

  public async clickEditUser(email:string): Promise<void> {
    const userRow = this.page.locator('tr').filter({ hasText: email });
    await userRow.locator(this.editUserButton).click();
  }

  public async updateName(oldEmail:string, newName: string) {
    await this.clickEditUser(oldEmail);
    await this.editInformationButton.click();
    await this.nameField.fill(newName);
    await this.saveButton.click();
  }

  public async updateUserName(oldEmail: string, newUsername: string) {
    await this.clickEditUser(oldEmail);
    await this.editUserNameButton.click();
    await this.newUserNameField.fill(newUsername);
    await this.saveButton.click();
  }

  public async updateUserPassword(oldEmail: string, newPassword:string): Promise<void> {
    await this.clickEditUser(oldEmail);
    await this.editPasswordButton.click();
    await this.newPasswordField.fill(newPassword);
    await this.saveButton.click();
  }

  public async updateUserEmail(oldEmail: string, newEmail: string):Promise<void> {
    await this.clickEditUser(oldEmail);
    await this.editEmailButton.click();
    await this.newEmailField.fill(newEmail);
    await this.saveButton.click();
  }

  public async deleteUser(email: string): Promise<void> {
    await this.clickEditUser(email);
    await this.deleteButton.click();
    await this.deleteButton.click();
  }

}
