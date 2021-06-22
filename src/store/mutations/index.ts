import mainMutations from './mainMutations';

const mutations = {
  main: mainMutations,
};

export type MutationName = keyof typeof mutations;

export default mutations;
