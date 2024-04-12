import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference, NavigationContext } from 'lwr/navigation';
import { getAuthContext } from 'orion/authContextProvider';
import { getUsers } from 'orionlabs/userApi';

export default class UserList extends LightningElement {
    @track _users;
    _authUser;
    _isLoading;

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

    @wire(getUsers)
    getAllUsers({ data, error }) {
        this._isLoading = null;
        setTimeout(() => (this._isLoading = !data && !error), 300);

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

    get isLoading() {
        return this._isLoading ?? true;
    }

    get users() {
        return (this._users || []).map((user) => {
            return {
                ...user,
                displayName: `${user.firstName} ${user.lastName}`,
                pageRef: {
                    type: 'userDetails',
                    attributes: {
                        userId: user.id
                    }
                }
            };
        });
    }
}
