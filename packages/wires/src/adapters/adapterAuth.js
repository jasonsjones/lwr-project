import { loginAdapterFactory } from '../generated/adapters/login';
import { luvio } from '../network';

const login = loginAdapterFactory(luvio);

export { login };
