import { Locator, Page } from "@playwright/test";
import { GeneralPage } from "./GeneralPage";

export class ThanksPage extends GeneralPage{
    readonly lblSuccessfulMsg: Locator

    constructor(page: Page){
        super(page);
        this.lblSuccessfulMsg = page.getByText('Thank you for registering your account')
    }

    async getSuccessfulMsg(): Promise<string> {
        return await this.lblSuccessfulMsg.innerText()
    }
}