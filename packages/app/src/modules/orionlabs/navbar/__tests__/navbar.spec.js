import { createElement } from 'lwc';
import Navbar from 'orionlabs/navbar';

async function createComponent(prop = {}) {
    const element = createElement('orionlabs-navbar', {
        is: Navbar
    });

    Object.assign(element, prop);
    document.body.appendChild(element);
    await Promise.resolve();

    return element;
}

describe('NavBar component', () => {
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
