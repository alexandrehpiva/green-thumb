import mainMutations from './mainMutations';

// type Mutations<T = Record<string, Mutation>> = Record<StateName, T>;
// type Mutations<T = any> = Record<StateName, T>;

const mutations = {
  main: mainMutations,
};

export type MutationName = keyof typeof mutations;

export default mutations;
