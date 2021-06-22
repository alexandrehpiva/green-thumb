import Component from '../../lib/Component';
import Filter from '../../components/Filter/index';
import Spinner from '../../components/Spinner';

import render from '../../lib/utils/render';
import store from '../../store';
import { CombinedStates, StateName } from '../../store/state';
import plantsService from '../../services/plantsService';

import { sunlightFilter, waterFilter, petsFilter } from './filtersData';

import svgLogoWhite from '../../assets/images/icons/logo-white.svg';
import svgArrowDown from '../../assets/images/icons/arrow-down-mod.svg';
import pngNoResults from '../../assets/images/illustrations/no-results.png';
import pngPick from '../../assets/images/illustrations/pick.png';

import './style.scss';
import isApiError from '../../utils/typeValidators/isApiError';

class Main extends Component {
  constructor() {
    super();

    // Method bindings
    this.handleStateChange = this.handleStateChange.bind(this);

    // Subscribing to changes on main state
    store.events.subscribe('change', this.handleStateChange);
  }

  async handleStateChange(state: CombinedStates, propName: StateName) {
    if (propName !== 'main') {
      return;
    }

    const { water, pets, sunlight } = state.main.filters ?? {};
    if (water && pets && sunlight) {
      // Ready for service call.
      this.toggle('#loading', true);
      this.toggle('#no-results', false);
      this.toggle('#grid-section', false);

      const data = await plantsService.get(sunlight, water, pets);

      if (isApiError(data)) {
        this.toggle('#loading', false);
        this.toggle('#no-results', true);
        return;
      }

      const testItems = document.querySelector('#test-items');
      if (testItems) {
        testItems.innerHTML = JSON.stringify(data);
      }
      this.toggle('#loading', false);
      this.toggle('#grid-section', true);
    }
  }

  render() {
    this.element.innerHTML = `
      <header data-testid="main-header" class="main-header">
        <div class="container">
          <div class="nav-wrapper">
            <div class="nav-left">
              <picture class="logo">
                <img src="${svgLogoWhite}" alt="green thumb." />
              </picture>
              <h1 class="text">Find your next green friend</h1>
              <picture>
                <img src="${svgArrowDown}" alt="Greenthumb" />
              </picture>
            </div>
            <div class="nav-right">
              <picture class="nav-right-image"></picture>
            </div>
          </div>
        </div>
      </header>
      <main data-testid="main-content" class="main-content">
        <section
          data-testid="filters-section"
          id="filters-section"
          class="filters-section"
        >
          <div class="container">
            <div class="filters-wrapper">
              ${render(new Filter(sunlightFilter))}
              ${render(new Filter(waterFilter))}
              ${render(new Filter(petsFilter))}
            </div>
          </div>
        </section>
        <section
          data-testid="content-section"
          id="content-section"
          class="content-section"
        >
          <div class="container">
            <section id="loading" class="no-results hidden">
              ${render(new Spinner())}
            </section>
            <section id="no-results" class="no-results">
              <header class="message">
                <h2 class="title">No results yet...</h2>
                <p class="text">Use the filters above to find the plant that best fits your environment :)</p>
              </header>
              <picture>
                <img src="${pngNoResults}" alt="No results">
              </picture>
            </section>
            <section id="grid-section" class="grid-section hidden">
              <header>
                <picture>
                  <img src="${pngPick}" alt="Our picks for you">
                  <h2>Our picks for you</h2>
                </picture>
              </header>
              <body id="grid-items" class="grid-items">
                <pre id="test-items"></pre>
              </body>
              <footer id="grid-footer" class="grid-footer">

              </footer>
            </section> 
          </div>
        </section>
      </main>
    `;
  }
}

export default Main;
