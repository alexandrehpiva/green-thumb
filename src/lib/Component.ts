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
  effect?(): void;

  constructor({ store = storeObj, element }: ComponentProps = {}) {
    this.element = element ?? this.fragment();
    this.id = genId();

    // TODO: Render on mount?
    // render?.();

    // Re-render the component when getting a 'change' event
    // TODO: Think in something better than re-render everything
    // store.events.subscribe('change', () => this.render?.());

    // Re-render the component when getting a 'change' event
    store.events.subscribe('rendered', () => this.effect?.());
  }

  fragment() {
    const element = document.createElement('div');
    element.className = 'fragment';
    return element;
  }

  node(): Element {
    const { element } = this;

    if (element.className === 'fragment') {
      // Return the elements inside a div fragment if it has adjacent siblings
      if (element.children.length > 1) {
        return element;
      }

      // Return the rendered element or the div fragment
      return element.firstElementChild ?? element;
    }

    return element;
  }
}

export default Component;
