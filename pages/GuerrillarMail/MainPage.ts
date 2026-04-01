import { Locator, Page } from "@playwright/test";
import { Constant } from "../../common/Constant/Constant";
import { RegistrationConfirmationPage } from "../Railway/RegistrationConfirmationPage";
import { PasswordResetPage } from "../Railway/PasswordResetPage";

export class MainPage {
    readonly page: Page;
    readonly lblEmailName: Locator
    readonly txtEmailName: Locator
    readonly btnSetEmailName: Locator
    readonly lnkCofirm: Locator
    // readonly lblEmailConfirm: Locator

    constructor(page: Page){
        this.page = page;
        this.lblEmailName = page.locator('#inbox-id')
        this.txtEmailName = page.locator('#inbox-id input')
        this.btnSetEmailName = page.locator('#inbox-id button.save')
        this.lnkCofirm = page.locator('.email_body a')
    }

    async open(){
        await this.page.goto(Constant.GUERRILLAMAIL_URL)
    }

    async setEmailName(name: string){
        await this.lblEmailName.click()
        await this.txtEmailName.fill(name)
        await this.btnSetEmailName.click()
    }

    async openMailWithSubject(subject: string){
        await this.page.getByText(subject, { exact: false }).click({ timeout: 20000 })
    }

    async clickLinkConfirm(): Promise<RegistrationConfirmationPage> {
        const pagePromise = this.page.waitForEvent('popup')
        await this.lnkCofirm.click();
        const newPage = await pagePromise;
        await newPage.waitForLoadState();
        return new RegistrationConfirmationPage(newPage);
    }

    async clickLinkReset(): Promise<PasswordResetPage>{
        const pagePromise = this.page.waitForEvent('popup')
        await this.lnkCofirm.click();
        const newPage = await pagePromise
        await newPage.waitForLoadState()
        return new PasswordResetPage(newPage)
    }
}