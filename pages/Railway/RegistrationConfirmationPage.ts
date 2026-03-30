import { Locator, Page } from "@playwright/test";
import { GeneralPage } from "./GeneralPage";

export class RegistrationConfirmationPage extends GeneralPage {
    readonly lblSuccessConfirmationMsg: Locator;

    constructor(page: Page) {
        super(page);
        this.lblSuccessConfirmationMsg = page.locator('#content p');
    }

    async getLblSuccessConfirmationMsg(): Promise<string> {
        return await this.lblSuccessConfirmationMsg.innerText();
    }
}