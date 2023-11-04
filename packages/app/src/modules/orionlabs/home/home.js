import { LightningElement, wire } from 'lwc';
import { getAuthContext } from 'orion/authContextProvider';

export default class Home extends LightningElement {
    @wire(getAuthContext)
    ctxUser({ data }) {
        if (data?.value) {
            console.log('Home has updated user context');
            console.log(data.value);
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
