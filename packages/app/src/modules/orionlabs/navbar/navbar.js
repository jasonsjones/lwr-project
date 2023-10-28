import { LightningElement, wire } from 'lwc';
import { NavigationContext, navigate } from 'lwr/navigation';

const navLinks = {
    left: [
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
    ],
    right: [
        {
            id: '0',
            label: 'Login',
            pageReference: {
                type: 'namedPage',
                attributes: {
                    pageName: 'login'
                },
                state: {}
            }
        }
    ]
};

export default class NavBar extends LightningElement {
    @wire(NavigationContext)
    navContext;

    get leftNavLinks() {
        return navLinks.left || [];
    }

    get rightNavLinks() {
        return navLinks.right || [];
    }

    handleHomeClick(event) {
        event.preventDefault();
        if (this.navContext) {
            navigate(this.navContext, { type: 'home' });
        }
    }
}
