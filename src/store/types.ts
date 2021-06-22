export type State<T = any> = Record<string | symbol, T>;

// export type Mutation = <S, T extends Array<any>>(...props: T) => S;

// TODO: Fix Mutation type
export type Mutation = (state: any, payload: any) => any;

export type CombinedStates = Record<string, State>;

export type CombinedMutations = Record<string, Record<string, Mutation>>;