import { api, LightningElement, wire } from 'lwc';
import { NavigationContext, generateUrl, navigate } from 'lwr/navigation';

function generatePageReference(type, attributes = {}, state = {}) {
    return {
        type,
        attributes,
        state
    };
}

export default class NavLink extends LightningElement {
    url;

    @wire(NavigationContext)
    navContext;

    @api label;

    get aboutPageReference() {
        return generatePageReference('namedPage', { pageName: 'about' });
    }

    handleClick(event) {
        event.preventDefault();
        if (this.navContext) {
            switch (this.label) {
                case 'About':
                    navigate(this.navContext, this.aboutPageReference);
                    break;
                default:
                    return;
            }
        }
    }

    connectedCallback() {
        if (this.navContext) {
            switch (this.label) {
                case 'About':
                    this.url = generateUrl(this.navContext, this.aboutPageReference);
                    break;
                default:
                    return;
            }
        }
    }
}
