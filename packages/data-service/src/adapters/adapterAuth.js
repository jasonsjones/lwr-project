import { loginAdapterFactory } from '../generated/adapters/login';
import { logoutAdapterFactory } from '../generated/adapters/logout';
import { luvio } from '../transport/network';

const login = loginAdapterFactory(luvio);
const logout = logoutAdapterFactory(luvio);

export { login, logout };
