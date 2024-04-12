import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference, NavigationContext } from 'lwr/navigation';
import { getAuthContext } from 'orion/authContextProvider';

const DEFAULT_BUTTON_TEXT = 'Log in to view resource';

export default class ProtectedView extends LightningElement {
    _authUser;

    @wire(NavigationContext)
    navContext;

    @wire(CurrentPageReference)
    currentPageRef;

    @wire(getAuthContext)
    ctxUser({ data }) {
        if (data?.value) {
            this._authUser = data?.value?.user;
        }
    }

    @api
    get unAuthenticatedButtonText() {
        return this._unAuthenticatedButtonText ?? DEFAULT_BUTTON_TEXT;
    }
    set unAuthenticatedButtonText(value) {
        this._unAuthenticatedButtonText = value;
    }

    get isAuthenticated() {
        return !!this._authUser;
    }

    get isNotAuthenticated() {
        return !this.isAuthenticated;
    }

    get loginPageRef() {
        return {
            type: 'namedPage',
            attributes: {
                pageName: 'login'
            },
            state: {
                from: JSON.stringify(this.currentPageRef)
            }
        };
    }
}
