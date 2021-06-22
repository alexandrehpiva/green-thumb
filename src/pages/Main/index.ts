import Component from '../../lib/Component';
import Filter from '../../components/Filter/index';

import logoWhite from '../../assets/images/icons/logo-white.svg';
import arrowDown from '../../assets/images/icons/arrow-down-mod.svg';
import noResults from '../../assets/images/illustrations/no-results.png';

import './style.scss';
import render from '../../lib/utils/render';
import store from '../../store';
import { CombinedStates, StateName } from '../../store/state';
import plantsService from '../../services/plantsService';
import { sunlightFilter, waterFilter, petsFilter } from './filtersData';

class Main extends Component {
  constructor() {
    super();

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
      const data = await plantsService.get(sunlight, water, pets);
      console.log({ data });

      if (typeof data === 'string') {
        return;
      }
    }
  }

  render() {
    this.element.innerHTML = `
      <header data-testid="main-header" class="main-header">
        <div class="container">
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
            <article class="no-results">
              <header class="message">
                <h2 class="title">No results yet...</h2>
                <p class="text">Use the filters above to find the plant that best fits your environment :)</p>
              </header>
              <picture>
                <img src="${noResults}" alt="No results">
              </picture>
            </article>
          </div>
        </section>
      </main>
    `;
  }
}

export default Main;
