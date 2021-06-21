import Component from '../../lib/Component';

class GreenThumb extends Component {
  constructor() {
    super();
  }

  render() {
    this.element.innerHTML = `
      <header data-testid="main-header" class="main-header">
        <div class="container">
          <div class="nav-wrapper">
            <div class="nav-left">
              <div class="logo">
                <img src="../src/assets/images/icons/logo-white.svg" alt="Greenthumb" />
              </div>
              <h1 class="text">Find your next green friend</h1>
              <div>
                <img
                  src="../src/assets/images/icons/arrow-down-mod.svg"
                  alt="Greenthumb"
                />
              </div>
            </div>
            <div class="nav-right">
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
