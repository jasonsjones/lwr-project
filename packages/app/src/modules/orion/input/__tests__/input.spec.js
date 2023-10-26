import { createElement } from '@lwc/engine-dom';
// @ts-ignore
import Input from 'orion/input';

async function createComponent(prop = {}) {
    const element = createElement('orion-input', {
        is: Input
    });

    Object.assign(element, prop);
    document.body.appendChild(element);
    await Promise.resolve();

    return element;
}

describe('orion-input', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders an input and label', async () => {
        const element = await createComponent({ label: 'Test Input', inputId: 'test' });
        expect(element).toMatchSnapshot();
    });

    it('exposes value from html input', async () => {
        const expectedText = 'orion labs';

        const element = await createComponent();
        const baseInput = element.shadowRoot?.querySelector('input');
        if (baseInput) {
            baseInput.value = expectedText;
            baseInput.dispatchEvent(new CustomEvent('input', { composed: true, bubbles: true }));
            expect(element.value).toBe(expectedText);
        }
    });
});
