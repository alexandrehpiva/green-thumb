import testMutations from './testMutations';
import mainMutations from './mainMutations';

const mutations = {
  test: testMutations,
  main: mainMutations,
};

export type MutationName = keyof typeof mutations;

export default mutations;
