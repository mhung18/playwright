import { Locator, Page } from "@playwright/test";
import { GeneralPage } from "./GeneralPage";
import { UserInfo } from "../../data_objects/UserInfo";
import { HomePage } from "./HomePage";
import { ForgotPasswordPage } from "./ForgotPasswordPage";

export class LoginPage extends GeneralPage {
    readonly txtUsername: Locator;
    readonly txtPassword: Locator;
    readonly btnLogin: Locator;
    readonly lblErrorMsg: Locator;
    readonly lnkForgotPassword: Locator;

    constructor(page: Page) {
        super(page);
        this.txtUsername = this.page.locator('#username');
        this.txtPassword = this.page.locator('#password');
        this.btnLogin = this.page.getByTitle('Login');
        this.lblErrorMsg = this.page.locator('p.message.error');
        this.lnkForgotPassword = this.page.getByText('Forgot Password page')
    }

    async login(user: UserInfo): Promise<HomePage> {
        await this.txtUsername.fill(user.username);
        await this.txtPassword.fill(user.password);
        await this.btnLogin.click();
        return new HomePage(this.page);
    }

    async getErrorMsg(): Promise<string> {
        return this.lblErrorMsg.innerText();
    }

    async goToForgotPasswordPage() {
        await this.lnkForgotPassword.click()
        return new ForgotPasswordPage(this.page)
    }
}