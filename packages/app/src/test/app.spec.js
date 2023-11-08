import App from '../../pageObjects/app.js';

describe('LWR Project App', () => {
    let appRoot;

    beforeEach(async () => {
        await browser.url('/');
        appRoot = await utam.load(App);
        expect(appRoot instanceof App).toBe(true);
    });

    it('has top level app custom element', async () => {
        const app = await appRoot.getApp();
        expect(await app.isPresent()).toBe(true);
    });

    it('includes an LWR router container', async () => {
        const rc = await appRoot.getRouterContainer();
        expect(await rc.isPresent()).toBe(true);
    });

    it('includes a page layout', async () => {
        const layout = await appRoot.getPageLayout();
        expect(await layout.isPresent()).toBe(true);
    });
});
