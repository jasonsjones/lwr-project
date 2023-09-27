import { LightningElement, wire } from 'lwc';
import { NavigationContext, navigate } from 'lwr/navigation';

export default class NavBar extends LightningElement {
    @wire(NavigationContext)
    navContext;

    handleHomeClick(event) {
        event.preventDefault();
        if (this.navContext) {
            navigate(this.navContext, { type: 'home' });
        }
    }
}
