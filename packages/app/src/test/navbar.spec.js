import App from '../../pageObjects/app.js';

const NAV_LINKS = ['About', 'Sign Up', 'Log In'];

describe('LWR Project Navbar', () => {
    let navbar;

    beforeEach(async () => {
        await browser.url('/');
        const appRoot = await utam.load(App);
        expect(appRoot instanceof App).toBe(true);
        const layout = await appRoot.getPageLayout();
        navbar = await layout.getNavbar();
        expect(await navbar.isPresent()).toBe(true);
    });

    it('has a home link', async () => {
        const home = await navbar.getHomeLink();
        expect(await home.isPresent()).toBe(true);
    });

    it('has three nav links', async () => {
        const links = await navbar.getAllNavLinks();
        expect(links.length).toEqual(3);
    });

    it('contains links to pages', async () => {
        const navLinks = await navbar.getAllNavLinks();
        const anchorLinks = await Promise.all(navLinks.map((link) => link.getAnchor()));
        expect(anchorLinks.length).toBe(3);
        for await (const anchor of anchorLinks) {
            const name = await anchor.getText();
            expect(NAV_LINKS).toContain(name);
        }
    });

    it('navigates to about page', async () => {
        const aboutLink = await navbar.getNavLinkByText('About');
        expect(aboutLink.length).toEqual(1);
        const [link] = aboutLink;
        const anchor = await link.getAnchor();
        await anchor.click();
        expect(await browser.getUrl()).toContain('/about');
    });
});
