import Store from '../store/Store';
import genId from '../utils/genId';
import storeObj from '../store/index';

interface ComponentProps {
  store?: Store;
  element?: HTMLElement;
}

const newFragment = () => {
  const element = document.createElement('div');
  element.id = '__fragment__';
  return element;
};

class Component {
  id: string;
  element: HTMLElement;
  render?(): void;

  constructor({
    store = storeObj,
    element = newFragment(),
  }: ComponentProps = {}) {
    this.element = element;
    this.id = genId();

    // Re-render the component when getting a 'change' event
    store.events.subscribe('change', () => this.render?.());
  }

  node() {
    const { element } = this;

    if (element.id === '__fragment__') {
      return element.firstChild ?? this.element;
    }

    return this.element;
  }
}

export default Component;
