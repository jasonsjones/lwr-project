import { createElement } from 'lwc';
import App from 'orionlabs/app';

describe('App component', () => {
    let element;

    beforeEach(() => {
        element = createElement('orionlabs-app', {
            is: App
        });
        document.body.appendChild(element);
    });

    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders', () => {
        expect(element).toBeTruthy();
    });
});
