import { TestState } from '../state/testState';

const testMutations = {
  toggle(state: TestState): TestState {
    return {
      test: !state.test,
    };
  },
};

export default testMutations;
