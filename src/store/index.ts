import mutations from './mutations';
import state from './state';
import Store from './Store';

const store = new Store({ mutations, state });

export default store;
