import Component from '../../lib/Component';
import Filter from '../../components/Filter/index';

import logoWhite from '../../assets/images/icons/logo-white.svg';
import arrowDown from '../../assets/images/icons/arrow-down-mod.svg';
import sun from '../../assets/images/illustrations/sun.png';
import wateringCan from '../../assets/images/illustrations/wateringcan.png';
import dog from '../../assets/images/illustrations/dog.png';

import './style.scss';
import render from '../../lib/utils/render';
import store from '../../store';
import { CombinedStates, StateName } from '../../store/state';

const sunlightFilter = {
  name: 'sunlight',
  image: sun,
  imageAlt: 'Sunlight',
  label: `
        <b>1. </b>Set the amount of sunlight your plant will get.
      `,
  options: [
    { label: 'No sunlight', value: 'no' },
    { label: 'Low sunlight', value: 'low' },
    { label: 'High sunlight', value: 'high' },
  ],
};

const waterFilter = {
  name: 'water',
  image: wateringCan,
  imageAlt: 'Water',
  label: `
        <b>2. </b>How often do you want to <b>water</b> your plant?
      `,
  options: [
    { label: 'Rarely', value: 'rarely' },
    { label: 'Regularly', value: 'regularly' },
    { label: 'Daily', value: 'daily' },
  ],
};

const petsFilter = {
  name: 'pets',
  image: dog,
  imageAlt: 'Pets',
  label: `
        <b>3. </b>Do you have pets? Do they <b>chew</b> plants?
      `,
  options: [
    { label: 'No/They don’t care', value: 'no' },
    { label: 'Yes', value: 'yes' },
  ],
};

class Main extends Component {
  constructor() {
    super();

    // Subscribing to changes on main state
    store.events.subscribe(
      'change',
      (stateObj: CombinedStates, propName: StateName) => {
        if (propName !== 'main') {
          return;
        }

        const { water, pets, sunlight } = stateObj.main.filters ?? {};
        if (water && pets && sunlight) {
          console.log('Ready for service call.')
        }
      }
    );
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
        ></section>
      </main>
    `;
  }
}

export default Main;
