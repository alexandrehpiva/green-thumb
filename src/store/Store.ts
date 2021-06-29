import EventListener from '../lib/EventListener';
import { CombinedMutations, CombinedStates } from './types';

class Store<
  S extends CombinedStates = CombinedStates,
  M extends CombinedMutations<keyof S> = CombinedMutations<keyof S>
> {
  private mutations: M;
  private state: S;
  events: EventListener;
  status: string;

  constructor({ state, mutations }: { state: S; mutations: M }) {
    this.mutations = mutations;
    this.events = new EventListener(); // Subscriptions
    this.status = 'idle';

    // The Proxy set will intercept the state change and publish the event to listener
    this.state = new Proxy(state, {
      // TODO: There is a way to use pure function concept of set() (not changing stateObj directly)?
      set: (stateObj, propName, value) => {
        // Update prop value in state
        if (typeof stateObj !== undefined && propName in stateObj) {
          stateObj[propName as keyof typeof stateObj] = value;
        }

        // Publish a change event
        this.events.publish('change', stateObj, propName, value);

        this.status = 'idle';

        return true;
      },
    });
  }

  // TODO: create/test a dispatchAsync

  dispatch<T = any>(
    stateName: keyof S,
    mutationName: keyof M[keyof S],
    payload: T
  ) {
    if (typeof this.mutations[stateName]?.[mutationName] !== 'function') {
      throw new Error(
        `The mutation key [${stateName}][${mutationName}] do not exists.`
      );
    }

    this.status = 'mutation';

    const newState = this.mutations[stateName]?.[mutationName](
      this.state[stateName],
      payload
    );

    // Change the state and let the Proxy do its job
    Object.assign(this.state, {
      ...this.state,
      [stateName]: newState,
    });

    // TODO: Return state instead?
    return true;
  }
}

export default Store;
