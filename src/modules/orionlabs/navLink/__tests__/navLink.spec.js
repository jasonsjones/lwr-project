import { createElement } from 'lwc';
import { CurrentPageReference } from 'lwr/navigation';
import NavLink from 'orionlabs/navLink';

const pages = {
    home: {
        type: 'home',
        attributes: {},
        state: {}
    },
    about: {
        type: 'namedPage',
        attributes: {
            pageName: 'about'
        },
        state: {}
    }
};

jest.mock('lwr/navigation', () => {
    return {
        NavigationContext: require('@salesforce/wire-service-jest-util').createTestWireAdapter(),
        CurrentPageReference: require('@salesforce/wire-service-jest-util').createTestWireAdapter(),
        navigate: jest.fn(),
        generateUrl: jest.fn()
    };
});

async function createComponent(prop = {}) {
    const element = createElement('orionlabs-nav-link', {
        is: NavLink
    });

    Object.assign(element, prop);
    document.body.appendChild(element);
    await Promise.resolve();

    return element;
}

describe('NavLink component', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders home link with active styles', async () => {
        const element = await createComponent({ label: 'Home', pageReference: pages.home });
        CurrentPageReference.emit(pages.home);
        await Promise.resolve();
        const anchorEl = element.shadowRoot.querySelector('a');

        expect(anchorEl.classList).toContain('border-b-2');
        expect(element).toMatchSnapshot();
    });

    it('renders about link without active styles', async () => {
        const element = await createComponent({ label: 'About', pageReference: pages.about });
        CurrentPageReference.emit(pages.home);
        await Promise.resolve();
        const anchorEl = element.shadowRoot.querySelector('a');

        expect(anchorEl.classList).not.toContain('border-b-2');
        expect(element).toMatchSnapshot();
    });
});
