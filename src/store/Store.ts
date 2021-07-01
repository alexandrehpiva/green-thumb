import EventListener from '../lib/EventListener';
import deepClone from '../utils/deepClone';
import { CombinedMutations, CombinedStates } from './types';

class Store<
  S extends CombinedStates = CombinedStates,
  M extends CombinedMutations<keyof S> = CombinedMutations<keyof S>
> {
  private mutations: M;
  readonly initialState: S;
  private state: S;
  readonly events: EventListener;
  status: string;

  constructor({ state, mutations }: { state: S; mutations: M }) {
    this.mutations = mutations;
    this.events = new EventListener(); // Subscriptions
    this.status = 'idle';
    this.initialState = deepClone(state);

    // The Proxy set will intercept the state change and publish the event to listener
    this.state = new Proxy(state, {
      set: (stateObj, propName, value) => {
        // Update prop value in state
        stateObj[propName as keyof typeof stateObj] = value;

        // Publish a change event
        this.events.publish('change', stateObj, propName, value);

        this.status = 'idle';

        return true;
      },
    });
  }

  dangerousResetState() {
    Object.assign(this.state, deepClone(this.initialState));
  }

  resetEvents() {
    Object.assign(this.events, new EventListener());
  }

  // TODO: create/test a dispatchAsync

  dispatch<T = any>(
    stateName: keyof S,
    mutationName: keyof M[keyof S],
    payload?: T
  ) {
    this.status = 'mutation';

    const newValue = this.mutations[stateName][mutationName](
      this.state[stateName],
      payload
    );

    // Change the state and let the Proxy do its job
    Object.assign(this.state, {
      ...this.state,
      [stateName]: newValue,
    });
  }
}

export default Store;
