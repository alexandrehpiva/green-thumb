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
  // removeFilter(state: MainState, payload: { name: string }): MainState {
  //   return {
  //     ...state,
  //     filters: Object.keys(state.filters ?? {})
  //       .filter(name => name === payload.name)
  //       .reduce((obj: Record<string, any>, key) => {
  //         obj[key] = state.filters?.[key];
  //         return obj;
  //       }, {}),
  //   };
  // },
};

export default mainMutations;
