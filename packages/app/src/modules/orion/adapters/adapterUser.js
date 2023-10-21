import { createWireAdapterConstructor } from '@luvio/lwc-luvio';
import { getUsersAdapterFactory } from './generated/adapters/getUsers';
import { luvio } from './network';

const getUsersLuvioAdapter = getUsersAdapterFactory(luvio);
const GetUsersWireAdapter = createWireAdapterConstructor(getUsersLuvioAdapter, 'getUsers', luvio);

export { GetUsersWireAdapter as getUsers };
