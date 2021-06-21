import Store from '../store/Store';
import genId from '../utils/genId';
import storeObj from '../store/index';

interface ComponentProps {
  store?: Store;
  element?: HTMLElement;
}

/**
 * Main Component
 *
 * TODOS:
 * - Send props through components
 */
class Component {
  id: string;
  element: HTMLElement;
  render?(): void;

  constructor({ store = storeObj, element }: ComponentProps = {}) {
    this.element = element ?? this.fragment();
    this.id = genId();

    // Re-render the component when getting a 'change' event
    store.events.subscribe('change', () => this.render?.());
  }

  fragment() {
    const element = document.createElement('div');
    element.className = 'fragment';
    return element;
  }

  node() {
    const { element } = this;

    if (element.className === 'fragment') {
      return element.firstChild ?? element;
    }

    return element;
  }
}

export default Component;
