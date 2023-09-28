import { createElement } from 'lwc';
import About from 'orionlabs/about';

async function createComponent(prop = {}) {
    const element = createElement('orionlabs-about', {
        is: About
    });

    Object.assign(element, prop);
    document.body.appendChild(element);
    await Promise.resolve();

    return element;
}

describe('About component', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('matches snapshot', async () => {
        const element = await createComponent();
        expect(element).toMatchSnapshot();
    });
});
