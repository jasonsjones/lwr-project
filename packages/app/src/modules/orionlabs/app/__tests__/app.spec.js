import { createElement } from 'lwc';
import App from 'orionlabs/app';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => jest.fn()
    })
);

async function createComponent(prop = {}) {
    const element = createElement('orionlabs-app', {
        is: App
    });

    Object.assign(element, prop);
    document.body.appendChild(element);
    await Promise.resolve();

    return element;
}

describe('App component', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders', async () => {
        const app = await createComponent();
        expect(app).toBeTruthy();
    });
});
