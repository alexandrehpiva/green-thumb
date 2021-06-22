import Component from '../../lib/Component';

import './style.scss';

export interface SpinnerProps {
  className?: string;
}

class Spinner extends Component {
  private className?: string;

  constructor({ className }: SpinnerProps = {}) {
    super();

    this.className = className;
  }

  render() {
    this.element.innerHTML = `
      <div class="loader ${this.className ?? ''}">Loading...</div>
    `;
  }
}

export default Spinner;
