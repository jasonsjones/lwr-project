import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lwr/navigation';

export default class UserDetails extends LightningElement {
    @wire(CurrentPageReference)
    _pageReference;

    get userId() {
        return this._pageReference?.attributes?.userId;
    }
}
