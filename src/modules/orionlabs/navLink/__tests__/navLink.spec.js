import { createElement } from 'lwc';
import NavLink from 'orionlabs/navLink';

jest.mock('lwr/navigation', () => {
    return {
        NavigationContext: require('@salesforce/wire-service-jest-util').createTestWireAdapter(),
        navigate: jest.fn(),
        generateUrl: jest.fn()
    };
});

describe('NavLink component', () => {
    let element;

    beforeEach(() => {
        element = createElement('orionlabs-nav-link', {
            is: NavLink
        });
        document.body.appendChild(element);
    });

    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders', () => {
        expect(element).toMatchSnapshot();
    });
});
