import { LightningElement, track, wire } from 'lwc';
import { NavigationContext, navigate } from 'lwr/navigation';
import { login } from 'orionlabs/authApi';
import eventEmitter from 'orion/eventEmitter';

export default class Login extends LightningElement {
    @track error;

    @wire(NavigationContext)
    navContext;

    async handleLogin(event) {
        event.preventDefault();
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        if (email.length > 0 && password.length > 0) {
            try {
                const _response = await login({ email, password });
                this.error = '';
                eventEmitter.emit('user-login', _response.data);
                this.navigateToHome();
            } catch (err) {
                console.error(err);
                this.error = 'Login credentials invalid. Please try again.';
                this.refs.email.focus();
            }
        }
    }

    get hasError() {
        return this.error?.length > 0;
    }

    navigateToHome() {
        if (this.navContext) {
            navigate(this.navContext, { type: 'home' });
        }
    }
}
