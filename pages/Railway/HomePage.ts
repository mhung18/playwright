import { Constant } from "../../common/Constant/Constant";
import { GeneralPage } from "./GeneralPage";
import { Page, Locator } from '@playwright/test';
import { RegisterPage } from "./RegisterPage";

export class HomePage extends GeneralPage {
    readonly welcomeMsg: Locator;
    readonly lnkCreateAccount: Locator;

    constructor(page: Page) {
        super(page);
        this.welcomeMsg = page.locator('.account strong');
        this.lnkCreateAccount = page.getByText('create an account');
    }

    async open() {
        await this.page.goto(Constant.RAILWAY_URL)
    }

    async getWelcomeMsg(): Promise<string> {
        return this.welcomeMsg.innerText();
    }

    async getLinkToCreateAccountText() {
        return this.lnkCreateAccount.innerText()
    }

    async getLinkToCreateAccount(): Promise<string | null> {
        return await this.lnkCreateAccount.getAttribute('href');
    }

    async clickLinkToCreateAccount(): Promise<RegisterPage> {
        await this.lnkCreateAccount.click()
        return new RegisterPage(this.page)
    }
}