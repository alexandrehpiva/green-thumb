import Store from '../store/Store';
import genId from '../utils/genId';
import storeObj from '../store/index';

interface ComponentProps {
  store?: Store;
  element: HTMLElement;
}

class Component {
  id: string;
  element: HTMLElement;
  render?(): void;

  constructor({ store = storeObj, element }: ComponentProps) {
    this.element = element;
    this.id = genId();

    // Re-render the component when getting a change event
    store.events.subscribe('change', () => this.render?.());
  }
}

export default Component;
