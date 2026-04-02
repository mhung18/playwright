import test, { expect } from "@playwright/test";
import { Helper } from "../common/Constant/Helper";
import { HomePage } from "../pages/Railway/HomePage";
import { RegistrationConfirmationPage } from "../pages/Railway/RegistrationConfirmationPage";
import { Tabs } from "../common/Constant/Tabs";
import { LoginPage } from "../pages/Railway/LoginPage";
import { MainPage } from "../pages/GuerrillarMail/MainPage";

test('TC10: Reset password shows error if the new password is same as current', async ({ page }) => { 
    const expectedFormName = "Password Change Form";
	const expectedResetPasswordMsg = "The new password cannot be the same with the current password";

    console.log('Pre-condition: an actived account is existing');
    const { user, newpage } = await Helper.createAndActiveAccount(page)

    console.log('1. Navigate to QA Railway Login page');
    let registrationConfirmationPage = new RegistrationConfirmationPage(newpage)
    let loginPage = await registrationConfirmationPage.goToPage(Tabs.LOGIN, LoginPage)

    console.log('2. Click on \"Forgot Password page\" link');
    let forgotPasswordPage = await loginPage.goToForgotPasswordPage()

    console.log('3. Enter the email address of the activated account');
    console.log('4. Click on \"Send Instructions\" button');
    await forgotPasswordPage.sendInstructions(user.username)

    console.log('5. Login to the mailbox (the same mailbox when creating account)')
    let mailbox = new MainPage(newpage)
    await mailbox.open()

    console.log('6. Open email with subject contaning \"Please reset your password\" and the email of the account at step 3');
    const subject = 'Please reset your password ' + user.username
    await mailbox.openMailWithSubject(subject)
    const expectedResetToken = await mailbox.getResetPasswordToken()


    console.log('7. Click on reset link');
    let resetPasswordPage = await mailbox.clickLinkReset()

    console.log('VP: Redirect to Railways page and Form \"Password Change Form\" is shown with the reset password token');
    const actualFormTitle = await resetPasswordPage.getFormTitle()
    expect(actualFormTitle).toBe(expectedFormName)

    const actualResetToken = await resetPasswordPage.getResetToken()
    expect(actualResetToken).toBe(expectedResetToken)

    console.log('8. Input same password into 2 fields  \"new password\" and \"confirm password\"');
    console.log('9. Click Reset Password');
    await resetPasswordPage.resetPassword(user.password, user.password)

    console.log('VP: Message \"The new password cannot be the same with the current password\" is shown');
    const actualMsg = await resetPasswordPage.getLblResetPasswordMsg()
    expect(actualMsg).toBe(expectedResetPasswordMsg)
 })

test("TC11: Reset password shows error if the new password and confirm password doesn't match", async ({ page }) => { 
    const expectedFormName = "Password Change Form";
	const expectedResetPasswordMsg = "Could not reset password. Please correct the errors and try again.";

    console.log("Pre-condition: an actived account is existing");
    const { user, newpage } = await Helper.createAndActiveAccount(page)

    console.log("1. Navigate to QA Railway Login page");
    let registrationConfirmationPage = new RegistrationConfirmationPage(newpage)
    let loginPage = await registrationConfirmationPage.goToPage(Tabs.LOGIN, LoginPage)

    console.log("2. Click on 'Forgot Password page' link");
    let forgotPasswordPage = await loginPage.goToForgotPasswordPage()

    console.log("3. Enter the email address of the activated account");
    console.log("4. Click on 'Send Instructions' button");
    await forgotPasswordPage.sendInstructions(user.username)

    console.log("5. Login to the mailbox (the same mailbox when creating account)");
    let mailbox = new MainPage(newpage)
    await mailbox.open()

    console.log("6. Open email with subject contaning 'Please reset your password' and the email of the account at step 3");
    const subject = 'Please reset your password ' + user.username
    await mailbox.openMailWithSubject(subject)
    const expectedResetToken = await mailbox.getResetPasswordToken()

    console.log("7. Click on reset link");
    let resetPasswordPage = await mailbox.clickLinkReset()

    console.log("VP: Redirect to Railways page and Form 'Password Change Form' is shown with the reset password token");
    const actualFormTitle = await resetPasswordPage.getFormTitle()
    expect(actualFormTitle).toBe(expectedFormName)

    const actualResetToken = await resetPasswordPage.getResetToken()
    expect(actualResetToken).toBe(expectedResetToken)

    console.log("8. Input different input into 2 fields 'new password' and 'confirm password'");
    console.log("9. Click Reset Password")
    await resetPasswordPage.resetPassword(user.password, user.password + "test")

    console.log("VP: Error message 'Could not reset password. Please correct the errors and try again.' displays above the form.");
    console.log("VP: Error message 'The password confirmation did not match the new password.' displays next to the confirm password field.");
    const actualMsg = await resetPasswordPage.getLblResetPasswordMsg()
    expect(actualMsg).toBe(expectedResetPasswordMsg)
 })