import { LightningElement, wire } from 'lwc';
import { NavigationContext } from 'lwr/navigation';

export default class Login extends LightningElement {
    @wire(NavigationContext)
    navContext;

    handleLogin(event) {
        event.preventDefault();
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        console.log({ email, password });
        console.log('Login user handler not yet implemented...');
    }
}
