import Store from '../store/Store';
import genId from '../utils/genId';
import storeObj from '../store/index';

interface ComponentProps {
  store?: Store;
  element?: HTMLElement;
}

/**
 * Main Component to extend to
 */
class Component {
  id: string;
  element: HTMLElement;
  render?(): void;
  effect?(): void;

  constructor({ store = storeObj, element }: ComponentProps = {}) {
    this.element = element ?? this.fragment();
    this.id = genId();

    // Method bindings
    this.node = this.node.bind(this);

    // TODO: Render on mount?
    // render?.();

    // Re-render the component when getting a 'change' event
    // TODO: The problem is that re-renders everything. the re-render must be specific to changes
    // store.events.subscribe('change', () => this.render?.());

    // Call Component effect method when getting a 'change' event
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

      // Return the rendered element in the div fragment
      return element.firstElementChild ?? element;
    }

    return element;
  }
}

export default Component;
