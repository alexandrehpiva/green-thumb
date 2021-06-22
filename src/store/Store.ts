import EventListener from '../lib/EventListener';
import { StateName } from './state';
import { CombinedMutations, CombinedStates } from './types';
import { isKeyOfCombinedStates } from './utils';

export interface StoreProps {
  state: CombinedStates;
  mutations: CombinedMutations;
}

class Store {
  private mutations: CombinedMutations;
  private state: CombinedStates;
  events: EventListener;
  status: string;

  constructor({ state = {}, mutations = {} }: StoreProps) {
    this.mutations = mutations;
    this.events = new EventListener(); // Subscriptions
    this.status = 'idle';

    // The Proxy set will intercept the state change and publish the event to listener
    this.state = new Proxy(state, {
      // TODO: There is a way to use pure function concept of set() (not changing stateObj directly)?
      set: (stateObj, propName, value) => {
        console.log({ stateObj, propName, value });

        // Update prop value in state
        if (isKeyOfCombinedStates(propName, stateObj)) {
          stateObj[propName] = value;
        }

        // Publish a change event
        this.events.publish('change', stateObj, propName, value);

        this.status = 'idle';

        return true;
      },
    });
  }

  // TODO: create/test a dispatchAsync

  dispatch<T = any>(stateName: StateName, mutationName: string, payload: T) {
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
