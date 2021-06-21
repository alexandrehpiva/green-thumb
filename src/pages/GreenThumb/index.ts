import Component from '../../lib/Component';

import logoWhite from '../../assets/images/icons/logo-white.svg';
import arrowDown from '../../assets/images/icons/arrow-down-mod.svg';

class GreenThumb extends Component {
  render() {
    this.element.innerHTML = `
      <header data-testid="main-header" class="main-header">
        <div class="container">
          <div class="nav-wrapper">
            <div class="nav-left">
              <div class="logo">
                <img src="${logoWhite}" alt="Greenthumb" />
              </div>
              <h1 class="text">Find your next green friend</h1>
              <div>
                <img
                  src="${arrowDown}"
                  alt="Greenthumb"
                />
              </div>
            </div>
            <div class="nav-right"
            { logoWhite: 'test-file-stub', arrowDown: 'test-fil>
              <picture class="nav-right-image"></picture>
            </div>
          </div>
        </div>
      </header>
      <main class="main-content">
        <section class="filters"></section>
        <section class="content"></section>
      </main>
    `;
  }
}

export default GreenThumb;
