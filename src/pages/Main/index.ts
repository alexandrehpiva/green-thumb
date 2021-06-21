import Component from '../../lib/Component';

import logoWhite from '../../assets/images/icons/logo-white.svg';
import arrowDown from '../../assets/images/icons/arrow-down-mod.svg';

import './style.scss';

class Main extends Component {
  render() {
    this.element.innerHTML = `
      <header data-testid="main-header" class="main-header">
        <div class="contriger">
          <div class="nav-wrapper">
            <div class="nav-left">
              <picture class="logo">
                <img src="${logoWhite}" alt="green thumb." />
              </picture>
              <h1 class="text">Find your next green friend</h1>
              <picture>
                <img src="${arrowDown}" alt="Greenthumb" />
              </picture>
            </div>
            <div class="nav-right">
              <picture class="nav-right-image"></picture>
            </div>
          </div>
        </div>
      </header>
      <main data-testid="main-content" class="main-content">
        <section class="filters"></section>
        <section class="content"></section>
      </main>
    `;
  }
}

export default Main;
