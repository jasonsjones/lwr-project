import { LightningElement, wire } from 'lwc';
import { NavigationContext, navigate } from 'lwr/navigation';

const navLinks = [
    {
        id: '0',
        label: 'About',
        pageReference: {
            type: 'namedPage',
            attributes: {
                pageName: 'about'
            },
            state: {}
        }
    }
];

export default class NavBar extends LightningElement {
    @wire(NavigationContext)
    navContext;

    get navLinks() {
        return navLinks || [];
    }

    handleHomeClick(event) {
        event.preventDefault();
        if (this.navContext) {
            navigate(this.navContext, { type: 'home' });
        }
    }
}
