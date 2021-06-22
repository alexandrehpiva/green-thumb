import mainState from './mainState';

const state = {
  main: mainState,
};

export type StateName = keyof typeof state;

export type CombinedStates = typeof state;

export default state;
