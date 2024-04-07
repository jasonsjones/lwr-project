import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lwr/navigation';
import { getUser } from 'orionlabs/userApi';

export default class UserDetails extends LightningElement {
    userId;
    _user;

    @wire(getUser, { id: '$userId' })
    fetchUser({ data, error }) {
        if (data?.user) {
            this._user = data.user;
        }
    }

    @wire(CurrentPageReference)
    getPageReference(pageRef) {
        this.userId = pageRef?.attributes.userId;
    }

    get firstName() {
        return this._user?.firstName;
    }

    get lastName() {
        return this._user?.lastName;
    }

    get email() {
        return this._user?.email;
    }

    get roles() {
        return this._user?.roles;
    }
}
