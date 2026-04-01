import { Page } from "@playwright/test";
import { UserInfo } from "../../data_objects/UserInfo";
import { HomePage } from "../../pages/Railway/HomePage";
import { Utilities } from "../Common/Utilities";
import { Constant } from "./Constant";
import { MainPage } from "../../pages/GuerrillarMail/MainPage";

export class Helper {
    public static async createAndActiveAccount(page: Page): Promise<{user: UserInfo, newpage: Page}> {
        const randomEmail = Utilities.getRandomEmail()
        const userInfo = new UserInfo(
            randomEmail,
            Constant.PASSWORD_VALID,
            Constant.PID
        )

        let homePage = new HomePage(page)
        await homePage.open()

        let registerPage = await homePage.clickLinkToCreateAccount()
        await registerPage.register(userInfo)

        let mailbox = new MainPage(page)
        await mailbox.open()
        await mailbox.setEmailName(Utilities.getEmailName(userInfo.username));
        const subject = 'Please confirm your account ' + userInfo.username;
        await mailbox.openMailWithSubject(subject)
        let registrationConfirmationPage = await mailbox.clickLinkConfirm()
        const railwayPage = registrationConfirmationPage.page
        // await mailbox.page.close()
        return {
            user: userInfo,
            newpage: railwayPage
        }
    }
}