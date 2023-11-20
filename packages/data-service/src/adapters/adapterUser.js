import { createWireAdapterConstructor } from '@luvio/lwc-luvio';
import { createUserAdapterFactory } from '../generated/adapters/createUser';
import { getUsersAdapterFactory } from '../generated/adapters/getUsers';
import { luvio } from '../transport/network';

const getUsersLuvioAdapter = getUsersAdapterFactory(luvio);
const GetUsersWireAdapter = createWireAdapterConstructor(getUsersLuvioAdapter, 'getUsers', luvio);

const createUser = createUserAdapterFactory(luvio);

export { GetUsersWireAdapter as getUsers, createUser };
