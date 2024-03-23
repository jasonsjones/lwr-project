import { createWireAdapterConstructor } from '@luvio/lwc-luvio';
import { createUserAdapterFactory } from '../generated/adapters/createUser';
import { getUsersAdapterFactory } from '../generated/adapters/getUsers';
import { getUserAdapterFactory } from '../generated/adapters/getUser';
import { luvio } from '../transport/network';

const getUsersLuvioAdapter = getUsersAdapterFactory(luvio);
const getUserLuvioAdapter = getUserAdapterFactory(luvio);

const GetUsersWireAdapter = createWireAdapterConstructor(getUsersLuvioAdapter, 'getUsers', luvio);
const GetUserWireAdapter = createWireAdapterConstructor(getUserLuvioAdapter, 'getUser', luvio);

const createUser = createUserAdapterFactory(luvio);

export { GetUsersWireAdapter as getUsers, GetUserWireAdapter as getUser, createUser };
