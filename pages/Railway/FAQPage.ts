import { Page } from "@playwright/test";
import { GeneralPage } from "./GeneralPage";

export class FAQPage extends GeneralPage {
    constructor(page: Page){
        super(page);
    }
}