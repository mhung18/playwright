import { Page, Locator } from '@playwright/test';
import { Tabs } from '../../common/Constant/Tabs';

export class GeneralPage {
    readonly page: Page;
    readonly currentPage: Locator;
    readonly headerTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.currentPage = this.page.locator('.selected');
        this.headerTitle = this.page.locator('#content h1')
    }

    async goToPage<T extends GeneralPage>(
        tabName: Tabs, 
        PageClass: new (page: Page) => T
    ): Promise<T> {
        await this.page.getByRole('link', { name: tabName, exact: true }).click();
        return new PageClass(this.page);
    }

    async getNameCurrentPage(): Promise<string> {
        return await this.currentPage.innerText();
    }

    async isTabExist(tab: Tabs): Promise<boolean>{
        return await this.page.getByRole('link', { name: tab, exact: true }).isVisible()
    }

    async getHeaderTitle(): Promise<string> {
        return await this.headerTitle.innerText()
    }
}