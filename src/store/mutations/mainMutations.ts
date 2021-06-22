// import { Mutation } from '../types';

import { MainState } from '../state/mainState';

// export interface MainMutations extends Record<string, Mutation> {
//   addFilter:
// }

const mainMutations = {
  addFilter(
    state: MainState,
    payload: { name: string; value: string }
  ): MainState {
    console.log('addFilter: ', { state, payload });
    return {
      ...state,
      filters: {
        ...state.filters,
        [payload.name]: payload.value,
      },
    };
  },
};

export default mainMutations;
