import testState from './testState';
import mainState from './mainState';

const state = {
  test: testState,
  main: mainState,
};

export type StateName = keyof typeof state;

export default state;
