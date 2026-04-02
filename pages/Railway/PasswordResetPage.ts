import { Locator, Page } from "@playwright/test";

export class PasswordResetPage {
    readonly txtNewPassword: Locator;
    readonly txtConfirmPassword: Locator;
    readonly btnResetPassword: Locator;
    readonly lblResetPasswordMsg: Locator;
    readonly lblFormTitle: Locator;
    readonly lblResetToken: Locator;

    constructor(page: Page){
        this.txtNewPassword = page.locator('#newPassword')
        this.txtConfirmPassword = page.locator('#confirmPassword')
        this.btnResetPassword = page.getByRole('button', {name: 'Reset Password'})
        this.lblResetPasswordMsg = page.locator('#content p.message')
        this.lblFormTitle = page.locator('legend')
        this.lblResetToken = page.locator('#resetToken')
    }

    async resetPassword(newPass: string, confirmPass: string): Promise<PasswordResetPage>{
        await this.txtNewPassword.fill(newPass)
        await this.txtConfirmPassword.fill(confirmPass)
        await this.btnResetPassword.click()
        return this
    }

    async getLblResetPasswordMsg(): Promise<string> {
        return await this.lblResetPasswordMsg.innerText()
    }

    async getFormTitle(): Promise<string> {
        return await this.lblFormTitle.innerText()
    }

    async getResetToken(): Promise<string> {
        return await this.lblResetToken.inputValue()
    }
}