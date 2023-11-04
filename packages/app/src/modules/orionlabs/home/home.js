import { LightningElement, wire } from 'lwc';
import { getAuthContext } from 'orion/authContextProvider';

export default class Home extends LightningElement {
    user;

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

    get usersPageRef() {
        return {
            type: 'namedPage',
            attributes: {
                pageName: 'users'
            }
        };
    }
}
