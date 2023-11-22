import { LightningElement, wire } from 'lwc';
import { NavigationContext, navigate } from 'lwr/navigation';
import { createUser } from 'orionlabs/userApi';
import { login } from 'orionlabs/authApi';
import { EVENTS } from 'orionlabs/common';
import eventEmitter from 'orion/eventEmitter';

export default class Signup extends LightningElement {
    error;

    @wire(NavigationContext)
    navContext;

    async handleSubmit(event) {
        event.preventDefault();

        if (this.validateFormPasswords()) {
            this.error = null;

            const formValues = this.formValues;
            // make POST to register user
            const createResponse = await createUser({
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                email: formValues.email,
                password: formValues.password
            });

            // if we have a success and user in the response, then let's go ahead login
            if (createResponse?.data?.user) {
                this.clearForm();

                const loginResponse = await login({
                    email: formValues.email,
                    password: formValues.password
                });

                eventEmitter.emit(EVENTS.USER_LOGIN, loginResponse.data);
                this.navigateToHome();
            }
        } else {
            // passwords don't match, so focus back on password field
            this.error = 'Oops. Passwords do not match. Please try again.';
            this.refs.password.focus();
        }
    }

    get formValues() {
        return {
            firstName: this.refs.firstName.value,
            lastName: this.refs.lastName.value,
            email: this.refs.email.value,
            password: this.refs.password.value,
            confirmPassword: this.refs.confirmPassword.value
        };
    }

    get hasError() {
        return this.error && this.error.length > 0;
    }

    validateFormPasswords() {
        return this.formValues.password === this.formValues.confirmPassword;
    }

    clearForm() {
        this.refs.firstName.value = '';
        this.refs.lastName.value = '';
        this.refs.email.value = '';
        this.refs.password.value = '';
        this.refs.confirmPassword.value = '';
    }

    navigateToHome() {
        if (this.navContext) {
            navigate(this.navContext, { type: 'home' });
        }
    }
}
