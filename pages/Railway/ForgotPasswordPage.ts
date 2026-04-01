import { Locator, Page } from "@playwright/test";
import { GeneralPage } from "./GeneralPage";

export class ForgotPasswordPage extends GeneralPage {
    readonly txtEmail: Locator;
    readonly btnSendInstruction: Locator;

    constructor(page: Page) {
        super(page)
        this.txtEmail = page.locator('#email')
        this.btnSendInstruction = page.getByRole('button', {name: 'Send Instructions'})
    }

    async sendInstructions(email: string): Promise<ForgotPasswordPage> {
        await this.txtEmail.fill(email)
        await this.btnSendInstruction.click()
        return this
    }
}