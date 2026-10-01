import {
  IWorldOptions,
  setWorldConstructor,
  World
} from '@cucumber/cucumber';

import {
  Browser,
  BrowserContext,
  Page
} from '@playwright/test';

import { LoginPage } from '../pageObjects/LoginPage';
import { UserSettingPage } from '../pageObjects/UserSettingPage';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  loginPage!: LoginPage;
  userSettingPage!: UserSettingPage;

  users: Record<string, unknown> = {};
  meetings: Record<string, unknown> = {};
  scenarioData: Record<string, unknown> = {};

  createdUserEmails: string[] = [];

  constructor(options: IWorldOptions) {
    super(options);
  }
  //if hooks initialize the page objects here then we don't have to initialize them in every step definition file
  initPages(): void {
    this.loginPage = new LoginPage(this.page);
  }

  setData(key: string, value: unknown): void {
    this.scenarioData[key] = value;
  }

  getData<T>(key: string): T {
    return this.scenarioData[key] as T;
  }
}

//This tells the world constructor to use our customWorld
setWorldConstructor(CustomWorld);
