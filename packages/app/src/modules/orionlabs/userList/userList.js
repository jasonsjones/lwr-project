import { LightningElement, track, wire } from 'lwc';
import { NavigationContext } from 'lwr/navigation';
import { getUsers } from '@lwr-project/wires';

export default class UserList extends LightningElement {
    @track _users;

    @wire(NavigationContext)
    navContext;

    @wire(getUsers)
    getAllUsers({ data, error }) {
        if (error) {
            console.log(error.message);
            return;
        }

        if (data && Array.isArray(data.users)) {
            this._users = data.users;
        }
    }

    get users() {
        return (this._users || []).map((user) => {
            return {
                ...user,
                displayName: `${user.firstName} ${user.lastName}`,
                pageRef: {
                    type: 'user_detail',
                    attributes: {
                        userId: user.id
                    }
                }
            };
        });
    }
}
