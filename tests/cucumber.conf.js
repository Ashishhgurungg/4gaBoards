const { Before, BeforeAll, AfterAll, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium } = require("playwright");

setDefaultTimeout(30000)

let browser;

BeforeAll(async function () {
  browser = await chromium.launch({
      headless: false,
      slowMo: 1000,
  });
});

AfterAll(async function () {
   await browser.close();
});
//if we want to use the initPages method, we need to uncomment the below code and also add the initPages method in the CustomWorld class
// Before(async function (this: CustomWorld) {
//   // create browser/context/page...
//   this.initPages();
// });

Before(async function () {
  if (!this.createdUserEmails) this.createdUserEmails = [];
  this.browser = browser;
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  console.log("AFTER HOOK IS RUNNING");
     if (!this.createdUserEmails) this.createdUserEmails = [];

   if (this.createdUserEmails.length > 0) {
      console.log(`Cleaning up ${this.createdUserEmails.length} user(s) via API...`);

      const baseUrl = new URL(this.page.url()).origin;

      // Get token from cookies
      const cookies = await this.page.context().cookies();
      const tokenCookie = cookies.find(c => c.name === 'accessToken');
      const token = tokenCookie ? tokenCookie.value : null;

      if (!token) {
         console.log('No accessToken cookie found');
      } else {
         const headers = { Authorization: `Bearer ${token}` };

         for (const email of this.createdUserEmails) {
            try {
               // 1. Get all users
               const usersResponse = await this.page.request.get(`${baseUrl}/api/users`, { headers });
               const responseData = await usersResponse.json();

               // 2. Handle if response is wrapped in an object
               let usersArray;
               if (Array.isArray(responseData)) {
                  usersArray = responseData;
                  console.log("is array");
               } else if (responseData.data) {
                  usersArray = responseData.data;
                  console.log("is data");
               } else if (responseData.users) {
                  usersArray = responseData.users;
                  console.log("is users");
               } else if (responseData.items) {
                  usersArray = responseData.items;
                  console.log("is items");
               } else {
                  usersArray = [responseData];
                  console.log("is single object");
               }

               // 3. Find user by email
               const user = usersArray.find(u => u.email === email);

               if (user && user.id) {
                  // 4. Delete user
                  const deleteResponse = await this.page.request.delete(`${baseUrl}/api/users/${user.id}`, { headers });
                  if (deleteResponse.ok()) {
                     console.log(`Deleted: ${email} (ID: ${user.id})`);
                  } else {
                     console.log(`Delete failed (status ${deleteResponse.status()}) for ${email}`);
                  }
               } else {
                  console.log(`User ${email} not found in list`);
               }
            } catch (error) {
               console.log(`Error with ${email}: ${error.message}`);
            }
         }
      }
   }
  await this.page.close();
  await this.context.close();
});
