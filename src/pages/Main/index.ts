import Component from '../../lib/Component';
import Filter from '../../components/Filter/index';
import Spinner from '../../components/Spinner';

import render from '../../lib/utils/render';
import store from '../../store';
import { StateName } from '../../store/state';
import plantsService from '../../services/plantsService';
import isApiError from '../../utils/typeValidators/isApiError';
import GridItem from '../../components/GridItem/index';
import toggle from '../../lib/utils/toggle';
import { scrollTo } from '../../utils/dom/scrollTo';

import { sunlightFilter, waterFilter, petsFilter } from './filtersData';

import svgLogoWhite from '../../assets/images/icons/logo-white.svg';
import svgArrowDown from '../../assets/images/icons/arrow-down-mod.svg';
import svgArrowUp from '../../assets/images/icons/arrow-up-mod.svg';
import pngNoResults from '../../assets/images/illustrations/no-results.png';
import pngPick from '../../assets/images/illustrations/pick.png';

import './style.scss';
import { CombinedStates } from '../../store/types';

class Main extends Component {
  constructor() {
    super();

    // Method bindings
    this.handleStateChange = this.handleStateChange.bind(this);

    // Subscribing to changes on main state
    store.events.subscribe('change', this.handleStateChange);
  }

  effect() {
    const mainContent = document.getElementById('main-content');

    // Scroll down button
    const scrollDownBtn = document.getElementById('scroll-down-btn');
    scrollDownBtn?.addEventListener(
      'click',
      () => mainContent && scrollTo(mainContent.offsetTop)
    );

    // Back to the top button
    const backToTopBtn = document.getElementById('back-to-top');
    backToTopBtn?.addEventListener(
      'click',
      () => mainContent && scrollTo(mainContent.offsetTop)
    );

    document.addEventListener('scroll', function (e) {
      if (mainContent && window.scrollY > mainContent.offsetTop) {
        return toggle('#back-to-top', true);
      }
      return toggle('#back-to-top', false);
    });
  }

  async handleStateChange(state: CombinedStates, propName: StateName) {
    if (propName !== 'main') {
      return;
    }

    const { water, pets, sunlight } = state.main.filters ?? {};
    if (water && pets && sunlight) {
      // Ready for service call.
      toggle('#loading', true);

      const data = await plantsService.get(sunlight, water, pets);

      if (isApiError(data)) {
        toggle('#loading', false);
        toggle('#no-results', true);
        toggle('#grid-section', false);

        return;
      }

      // Render all data items into grid
      const grid = document.querySelector('#grid');
      if (grid) {
        grid.innerHTML = data
          .map(plant => render(new GridItem(plant)))
          .join('');
      }

      toggle('#loading', false);
      toggle('#no-results', false);
      toggle('#grid-section', true);
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
              <picture role="button" id="scroll-down-btn">
                <img src="${svgArrowDown}" alt="Greenthumb" />
              </picture>
            </div>
            <div class="nav-right">
              <picture class="nav-right-image"></picture>
            </div>
          </div>
        </div>
      </header>
      <main data-testid="main-content" class="main-content" id="main-content">
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
            <section id="loading" class="hidden">
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
              <header id="grid-header" class="grid-header">
                <picture>
                  <img src="${pngPick}" alt="Our picks for you">
                </picture>
                <h2>Our picks for you</h2>
              </header>
              <div id="grid" class="grid"></div>
              <footer id="grid-footer" class="grid-footer">
                <div role="button" id="back-to-top" class="hidden">
                  <img src="${svgArrowUp}" alt="Back to the top">
                  <span>back to the top</span>
                </div>
              </footer>
            </section> 
          </div>
        </section>
      </main>
    `;
  }
}

export default Main;
