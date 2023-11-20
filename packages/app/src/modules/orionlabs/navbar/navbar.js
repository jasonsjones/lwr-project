import { LightningElement, wire } from 'lwc';
import { NavigationContext, navigate } from 'lwr/navigation';
import { getAuthContext } from 'orion/authContextProvider';
import { logout } from 'orionlabs/authApi';
import eventEmitter from 'orion/eventEmitter';
import { EVENTS } from 'orionlabs/common';

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
            label: 'Sign Up',
            pageReference: {
                type: 'namedPage',
                attributes: {
                    pageName: 'signup'
                },
                state: {}
            }
        },
        {
            id: '1',
            label: 'Log In',
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
    user;

    @wire(NavigationContext)
    navContext;

    @wire(getAuthContext)
    ctxUser({ data }) {
        if (data?.value) {
            this.user = data?.value?.user;
        }
    }

    get hasUser() {
        return !!this.user;
    }

    get userDisplayName() {
        if (this.user) {
            const { firstName, lastName } = this.user;
            return `${firstName} ${lastName}`;
        }
    }

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

    handleLogout() {
        eventEmitter.emit(EVENTS.USER_LOGOUT);
        logout({ logout: true /* just to make luvio happy */ });
    }
}
