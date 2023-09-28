import { createElement } from 'lwc';
import NavLink from 'orionlabs/navLink';

jest.mock('lwr/navigation', () => {
    return {
        NavigationContext: require('@salesforce/wire-service-jest-util').createTestWireAdapter(),
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

    it('renders', async () => {
        const element = await createComponent();
        expect(element).toMatchSnapshot();
    });
});
