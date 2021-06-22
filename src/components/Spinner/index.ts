import Component from '../../lib/Component';

import './style.scss';

class Spinner extends Component {
  render() {
    this.element.innerHTML = `
      <div class="loader">Loading...</div>
    `;
  }
}

export default Spinner;
