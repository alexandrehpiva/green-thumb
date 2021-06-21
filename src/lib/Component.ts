import Store from '../store/Store';
import genId from '../utils/genId';

interface ComponentProps {
  store: Store;
  element: Element;
}

class Component {
  id: string;
  element?: Element;
  render?: <T extends Array<any>>(...props: T) => void;

  constructor(props: ComponentProps) {
    if (props.store instanceof Store) {
      props.store.events.subscribe('change', () => this.render?.());
    }

    if (props.hasOwnProperty('element')) {
      this.element = props.element;
    }

    this.id = genId();
  }
}

export default Component;
