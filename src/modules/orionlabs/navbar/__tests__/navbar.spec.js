import { createElement } from 'lwc';
import NavBar from 'orionlabs/navbar';

describe('NavBar component', () => {
    let element;

    beforeEach(() => {
        element = createElement('orionlabs-navbar', {
            is: NavBar
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
