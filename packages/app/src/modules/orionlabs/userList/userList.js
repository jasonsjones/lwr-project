import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference, NavigationContext } from 'lwr/navigation';
import { getUsers } from 'orionlabs/userApi';

export default class UserList extends LightningElement {
    @track _users;
    isLoading;

    @wire(NavigationContext)
    navContext;

    @wire(CurrentPageReference)
    currentPageRef;

    @wire(getUsers)
    getAllUsers({ data, error }) {
        this.isLoading = !data && !error;

        if (error) {
            if (error.status == 401) {
                console.error('User is unauthorized to make call for the users.');
            } else {
                console.error(error.message);
            }
            return;
        }

        if (data && Array.isArray(data.users)) {
            this._users = data.users;
        }
    }

    get noUsers() {
        return !this.isLoading && (this._users || []).length === 0;
    }

    get hasUsers() {
        return !this.noUsers;
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
