import combinedMutations from './index';

describe('Unit(mutations)', () => {
  it.each(Object.entries(combinedMutations))(
    'should only have pure functions',
    (_stateName, mutations) => {
      for (const [_name, mutation] of Object.entries(mutations)) {
        const state = {};
        const newState = mutation(state, { name: 'test', value: 'test' });

        // Object cannot be changed
        expect(state).toEqual({});

        // Must to receive a new object
        expect(newState).not.toBe(state);
      }
    }
  );
});
