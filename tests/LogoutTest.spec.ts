import { expect, test } from "@playwright/test";
import { UserInfo } from "../data_objects/UserInfo";
import { Constant } from "../common/Constant/Constant";
import { HomePage } from "../pages/Railway/HomePage";
import { Tabs } from "../common/Constant/Tabs";
import { LoginPage } from "../pages/Railway/LoginPage";
import { FAQPage } from "../pages/Railway/FAQPage";

test('TC06: User is redirected to Home page after logging out', async ({ page }) => { 
    const userInfo = new UserInfo(
        Constant.USERNAME_VALID,
        Constant.PASSWORD_VALID,
        Constant.PID
    );
    const expectedPageName = 'Home';

    console.log('1. Navigate to QA Railway Website')
    let homePage = new HomePage(page)
    await homePage.open()

    console.log('2. Login with valid Email and Password')
    const loginPage = await homePage.goToPage(Tabs.LOGIN, LoginPage)
    homePage = await loginPage.login(userInfo)

    console.log('3. Click on "FAQ" tab')
    let faqPage = await homePage.goToPage(Tabs.FAQ, FAQPage);
    
    console.log('4. Click on \"Log out\" tab')
    homePage = await faqPage.goToPage(Tabs.LOGOUT, HomePage)

    console.log('VP: Home page displays.')
    const actualPageName = await homePage.getNameCurrentPage()
    expect(actualPageName).toBe(expectedPageName);

    console.log('VP: \"Log out\" tab is disappeared.')
    let isLogoutTabExist = await homePage.isTabExist(Tabs.LOGOUT);
    expect(isLogoutTabExist).toBeFalsy();
 })