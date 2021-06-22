import { MainState } from '../state/mainState';

const mainMutations = {
  addFilter(
    state: MainState,
    payload: { name: string; value: string }
  ): MainState {
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
