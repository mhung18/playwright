import { Locator, Page } from "@playwright/test";
import { GeneralPage } from "./GeneralPage";
import { UserInfo } from "../../data_objects/UserInfo";
import { Constant } from "../../common/Constant/Constant";
import { HomePage } from "./HomePage";
import { ThanksPage } from "./ThanksPage";

export class RegisterPage extends GeneralPage {
    readonly _txtEmail: Locator;
    readonly _txtPassword: Locator;
    readonly _txtConfirmPassword: Locator;
    readonly _txtPID: Locator;
    readonly _btnRegister: Locator;
    readonly _lblErrorMsg: Locator;
    readonly _lblPasswordErrorMsg: Locator;
    readonly _lblPIDErrorMsg: Locator

    constructor(page: Page){
        super(page);
        this._txtEmail = this.page.locator('#email');
        this._txtPassword = this.page.locator('#password');
        this._txtConfirmPassword = this.page.locator('#confirmPassword');
        this._txtPID = this.page.locator('#pid');
        this._btnRegister = this.page.getByTitle('Register');
        this._lblErrorMsg = this.page.locator('p.message.error');
        this._lblPasswordErrorMsg = this.page.locator('.password label.validation-error');
        this._lblPIDErrorMsg = this.page.locator('.pid-number label.validation-error')
    }

    async register(userInfo: UserInfo): Promise<ThanksPage> {
        await this._txtEmail.fill(userInfo.username);
        await this._txtPassword.fill(userInfo.password);
        await this._txtConfirmPassword.fill(userInfo.password);
        await this._txtPID.fill(userInfo.pid);
        await this._btnRegister.click();
        return new ThanksPage(this.page)
    }

    async getErrorMsg(): Promise<string> {
        return await this._lblErrorMsg.innerText();
    }

    async getPasswordErrorMsg(): Promise<string> {
        return await this._lblPasswordErrorMsg.innerText();
    }

    async getPIDErrorMsg(): Promise<string> {
        return await this._lblPIDErrorMsg.innerText();
    }
}