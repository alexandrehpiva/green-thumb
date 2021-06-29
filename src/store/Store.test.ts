import Store from './Store';

type MockState = {
  count: number;
};

describe('Unit(Store)', () => {
  const initialMockState: MockState = { count: 0 };
  const mockMutations = {
    mock: {
      addToCount(state: MockState, payload: number) {
        return {
          count: state.count + payload,
        };
      },
    },
  };

  it('should publish a change event when detect a change in state', () => {
    const mockFn = jest.fn();

    const store = new Store({
      state: {},
      mutations: {},
    });

    store.events.subscribe('change', mockFn);

    store.events.publish('change');

    expect(mockFn).toBeCalledTimes(1);
  });

  it('should change the state with the payload when dispatch an mutation', () => {
    const state = { mock: initialMockState };
    const store = new Store({
      state,
      mutations: mockMutations,
    });

    expect(state.mock).toEqual({ count: 0 });

    store.dispatch('mock', 'addToCount', 2);

    expect(state.mock).toEqual({ count: 2 });
  });
});
