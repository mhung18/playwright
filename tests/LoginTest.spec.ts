import { Constant } from "../common/Constant/Constant"
import { UserInfo } from "../data_objects/UserInfo"
import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/Railway/HomePage";
import { Tabs } from "../common/Constant/Tabs";
import { LoginPage } from "../pages/Railway/LoginPage";
import { RegisterPage } from "../pages/Railway/RegisterPage";
import { Utilities } from "../common/Common/Utilities";

test('TC01: User can log into Railway with valid username and password', async ({ page }) => { 
    const userInfo = new UserInfo(
        Constant.USERNAME_VALID,
        Constant.PASSWORD_VALID,
        Constant.PID
    );
    const expectedMsg = `Welcome ${Constant.USERNAME_VALID}`;

    console.log('1. Navigate to QA Railway Website');
    const homePage = new HomePage(page);
    await homePage.open();

    console.log('2. Click on \"Login\" tab');
    const loginPage = await homePage.goToPage(Tabs.LOGIN, LoginPage)

    console.log('3. Enter valid Email and Password');
    console.log('4. Click on \"Login\" button');
    await loginPage.login(userInfo);

    console.log('VP: User is logged into Railway. Welcome user message is displayed.');
    const actualMsg = await homePage.getWelcomeMsg();
    expect(actualMsg.trim()).toBe(expectedMsg);
})

test('TC02: User cannot login with blank \"Username\" textbox', async ({ page }) => { 
    const userInfo = new UserInfo(
        Constant.BLANK_FIELD,
        Constant.PASSWORD_VALID,
        Constant.PID
    );
    const expectedMsg = `There was a problem with your login and/or errors exist in your form.`;
    console.log('1. Navigate to QA Railway Website');
    const homePage = new HomePage(page);
    await homePage.open();
    
    console.log('2. Click on \"Login\" tab');
    const loginPage = await homePage.goToPage(Tabs.LOGIN, LoginPage);

    console.log('3. User does not type any words into \"Username\" textbox but enter valid information into \"Password\" textbox');
    console.log('4. Click on \"Login\" button');
    await loginPage.login(userInfo);

    console.log('VP: User cannot login and message \"There was a problem with your login and/or errors exist in your form. \" appears.');
    const actualMsg = await loginPage.getErrorMsg();
    expect(actualMsg.trim()).toBe(expectedMsg);
})

test('TC03: User cannot log into Railway with invalid password', async ({page}) => { 
    const userInfo = new UserInfo(
        Constant.USERNAME_VALID,
        Constant.INFOMATION_INVALID,
        Constant.PID
    );
    const expectedMsg = 'There was a problem with your login and/or errors exist in your form.';

    console.log('1. Navigate to QA Railway Website');
    const homePage = new HomePage(page);
    await homePage.open();

    console.log('2. Click on \"Login\" tab');
    const loginPage = await homePage.goToPage(Tabs.LOGIN, LoginPage);

    console.log('3. Enter valid Email and invalid Password');
    console.log('4. Click on \"Login\" button');
    await loginPage.login(userInfo);

    console.log('VP: Error message \"There was a problem with your login and/or errors exist in your form.\" is displayed');
    const actualMsg = await loginPage.getErrorMsg();
    expect(actualMsg.trim()).toBe(expectedMsg);
 })

test('TC04: System shows message when user enters wrong password many times', async ({page}) => { 
    const userInfo = new UserInfo(
        Constant.USERNAME_VALID,
        Constant.INFOMATION_INVALID,
        Constant.PID
    );
    const expectedMsg = 'You have used 4 out of 5 login attempts. After all 5 have been used, you will be unable to login for 15 minutes.';

    console.log('1. Navigate to QA Railway Website');
    const homePage = new HomePage(page);
    await homePage.open();

    console.log('2. Click on \"Login\" tab');
    const loginPage = await homePage.goToPage(Tabs.LOGIN, LoginPage);

    console.log('3. Enter valid information into \"Username\" textbox except \"Password\" textbox.');
    console.log('4. Click on \"Login\" button');
    await loginPage.login(userInfo);

    console.log('5. Repeat step 3 and 4 three more times.');
    for (let index = 0; index < 3; index++) {
        console.log(`Lan chay thu ${index+1}`);
        await loginPage.login(userInfo);
    }
    console.log('VP: User cannot login and message \"You have used 4 out of 5 login attempts. After all 5 have been used, you will be unable to login for 15 minutes.\" appears.');
    const actualMsg = await loginPage.getErrorMsg();
    expect(actualMsg).toBe(expectedMsg);
 })
	
 test('TC05: User cannot login with an account has not been activated', async ({ page }) => {
    const randomEmail = Utilities.getRandomEmail();
    const userInfo = new UserInfo(
        randomEmail,
        Constant.PASSWORD_VALID,
        Constant.PID
    );
    const expectedMsg = 'Invalid username or password. Please try again.';

    console.log('Pre-condition: a not-active account is existing');
    const homePage = new HomePage(page);
    await homePage.open();

    const registerPage = await homePage.goToPage(Tabs.REGISTER, RegisterPage);
    await registerPage.register(userInfo)

    console.log('1. Navigate to QA Railway Website');
    console.log('2. Click on \"Login\" tab');
    const loginPage = await registerPage.goToPage(Tabs.LOGIN, LoginPage);

    console.log('3. Enter username and password of account has not been activated.');
    console.log('4. Click on \"Login\" button');
    await loginPage.login(userInfo);

    console.log('VP: User cannot login and message \"Invalid username or password. Please try again.\" appears.');
    const actualMsg = await loginPage.getErrorMsg();
    expect(actualMsg).toBe(expectedMsg);
  })