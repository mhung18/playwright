import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/Railway/HomePage";
import { Tabs } from "../common/Constant/Tabs";
import { RegisterPage } from "../pages/Railway/RegisterPage";
import { UserInfo } from "../data_objects/UserInfo";
import { Constant } from "../common/Constant/Constant";
import { HeaderTitle } from "../common/Constant/HeaderTitle";
import { Utilities } from "../common/Common/Utilities";
import { MainPage } from "../pages/GuerrillarMail/MainPage";

test('TC07: User cannot create account with an already in-use email', async ({ page }) => { 
    const userInfo = new UserInfo(
        Constant.USERNAME_VALID,
        Constant.PASSWORD_VALID,
        Constant.PID
    )
    const expectedMsg = 'This email address is already in use.'

    console.log('Pre-condition: an actived account is existing');
    console.log('1. Navigate to QA Railway Website')
    let homePage = new HomePage(page)
    await homePage.open()

    console.log('2. Click on \"Register\" tab')
    let registerPage = await homePage.goToPage(Tabs.REGISTER, RegisterPage)

    console.log('3. Enter information of the created account in Pre-condition')
    console.log('4. Click on \"Register\" button')
    await registerPage.register(userInfo)

    console.log('VP: Error message \"This email address is already in use.\" displays above the form.')
    const actualMsg = await registerPage.getErrorMsg()
    expect(actualMsg).toBe(expectedMsg)
 })

test('TC08: User cannot create account while password and PID fields are empty', async ({ page }) => { 
    const userInfo = new UserInfo(
        Constant.USERNAME_VALID,
        Constant.BLANK_FIELD,
        Constant.BLANK_FIELD
    )
    const expectedMsg = "There're errors in the form. Please correct the errors and try again.";
	const expectedPasswordErrorMsg = "Invalid password length";
	const expectedPassportIdErrorMsg = "Invalid ID length";

    console.log('1. Navigate to QA Railway Website');
    let homePage = new HomePage(page)
    await homePage.open()

    console.log('2. Click on \"Register\" tab');
    let registerPage = await homePage.goToPage(Tabs.REGISTER, RegisterPage)

    console.log('3. Enter valid email address and leave other fields empty');
    console.log('4. Click on \"Register\" button');
    await registerPage.register(userInfo)

    console.log('VP: Message \"There are errors in the form. Please correct the errors and try again.\" appears above the form.');
    const actualMsg = await registerPage.getErrorMsg()
    expect(actualMsg).toBe(expectedMsg)

    console.log('VP: Next to password fields, error message \"Invalid password length\" displays');
    const actualPasswordErrorMsg = await registerPage.getPasswordErrorMsg()
    expect(actualPasswordErrorMsg).toBe(expectedPasswordErrorMsg)

    console.log('VP: Next to PID field, error message \"Invalid ID length\" displays');
    const actualPIDErrorMsg = await registerPage.getPIDErrorMsg()
    expect(actualPIDErrorMsg).toBe(expectedPassportIdErrorMsg)
 })

test('TC09: User create and activate account', async ({ page }) => { 
    const randomEmail = Utilities.getRandomEmail();
    const userInfo = new UserInfo(
        randomEmail,
        Constant.PASSWORD_VALID,
        Constant.PID
    );
    
    const expectedHref = "/Account/Register.cshtml";
    const expectedMsg = HeaderTitle.THANK;
    const expectedRegisterConfirmStringMsg = "Registration Confirmed! You can now log in to the site.";
    const expectedLinkText = "create an account";
    const expectedHeaderTitle = HeaderTitle.REGISTER;

    console.log('1. Navigate to QA Railway Website');
    let homePage = new HomePage(page)
    await homePage.open()

    console.log('VP: Home page is shown with guide containing href \"create an account\" to \"Register\" page');
    const actualHref = await homePage.getLinkToCreateAccount()
    expect(actualHref).toBe(expectedHref)

    const actualLinkText = await homePage.getLinkToCreateAccountText()
    expect(actualLinkText).toBe(expectedLinkText)

    console.log('2. Click on \"Create an account\"');
    let registerPage = await homePage.clickLinkToCreateAccount()

    console.log('VP: Register page is shown');
    const actualHeader = await registerPage.getHeaderTitle()
    expect(actualHeader).toBe(expectedHeaderTitle)

    console.log('3. Enter valid information into all fields')
    console.log('4. Click on \"Register\" button');
    let thanksPage = await registerPage.register(userInfo)
    console.log(userInfo.username);

    console.log('VP: \"Thank you for registering your account\" is shown');
    const actualHeader2 = await thanksPage.getSuccessfulMsg()
    expect(actualHeader2).toBe(expectedMsg)

    console.log('5. Get email information (webmail address, mailbox and password) and navigate to that webmail');
    let mailbox = new MainPage(page)
    await mailbox.open()

    console.log('6. Login to the mailbox');
    await mailbox.setEmailName(Utilities.getEmailName(userInfo.username));

    console.log('7. Open email with subject containing \"Please confirm your account\"  and the email of the new account at step 3');
    const subject = 'Please confirm your account ' + userInfo.username;
    console.log(subject);
    
    await mailbox.openMailWithSubject(subject)

    console.log('8. Click on the activate link');
    let registrationConfirmationPage = await mailbox.clickLinkConfirm()

    console.log('VP: Redirect to Railways page and message \"Registration Confirmed! You can now log in to the site\" is shown');
    const actualRegisterConfirmStringMsg = await registrationConfirmationPage.getLblSuccessConfirmationMsg()
    expect(actualRegisterConfirmStringMsg).toBe(expectedRegisterConfirmStringMsg)
 })

 