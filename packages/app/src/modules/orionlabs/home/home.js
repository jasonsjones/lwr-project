import { LightningElement } from 'lwc';

export default class Home extends LightningElement {
    get usersPageRef() {
        return {
            type: 'namedPage',
            attributes: {
                pageName: 'users'
            }
        };
    }
}
