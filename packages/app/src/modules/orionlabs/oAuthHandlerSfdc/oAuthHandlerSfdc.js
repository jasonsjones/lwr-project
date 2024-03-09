import { LightningElement, wire } from 'lwc';
import { CurrentPageReference, NavigationContext, navigate } from 'lwr/navigation';
import { EVENTS } from 'orionlabs/common';
import eventEmitter from 'orion/eventEmitter';

export default class OAuthHandlerSfdc extends LightningElement {
    @wire(NavigationContext)
    navContext;

    @wire(CurrentPageReference)
    currentPageRef;

    connectedCallback() {
        const apiEndpoint = window.location.href.replace('4200', '3000');

        fetch(apiEndpoint, { credentials: 'include' })
            .then((res) => res.json())
            .then((data) => {
                eventEmitter.emit(EVENTS.USER_LOGIN, data?.results);
                if (this.navContext) {
                    navigate(this.navContext, { type: 'home' });
                }
            });
    }
}
