import Component from '../../lib/Component';
import store from '../../store';
import { decode, encode } from '../../utils/base64';

import './style.scss';

export type FilterOption = {
  label: string;
  value: string;
};

export interface FilterProps {
  name: string;
  image: string;
  imageAlt?: string;
  label: string;
  options: FilterOption[];
}

class Filter extends Component {
  name: string;
  image: string;
  imageAlt?: string;
  label: string;
  options: FilterOption[];

  constructor(props: FilterProps) {
    super();

    this.name = props.name;
    this.imageAlt = props.imageAlt;
    this.image = props.image;
    this.label = props.label;
    this.options = props.options;
  }

  effect() {
    const queryAll = document.querySelectorAll.bind(document);
    const getById = document.getElementById.bind(document);

    // Elements
    const selectContainer = getById(`select-wrapper-${this.id}`) as HTMLElement;
    const selectList = getById(`select-list-${this.id}`) as HTMLElement; // Flyout list
    const inputSelect = getById(`input-${this.id}`) as HTMLInputElement;
    const btnOpenList = getById(`select-btn-${this.id}`) as HTMLInputElement;

    const toggleFilterList = () => {
      selectContainer.classList.toggle('opened');
      selectList.classList.toggle('hidden');
    };

    // Open list button
    btnOpenList.addEventListener('change', toggleFilterList);

    // List click functions
    queryAll(`.select-item > input[name="radio-${this.id}"]`).forEach(
      (input, _itemIdx) => {
        input.addEventListener('click', event => {
          const { value } = event.target as HTMLInputElement;
          const option = decode<FilterOption>(value);

          inputSelect.value = option.label;

          store.dispatch('main', 'addFilter', {
            name: this.name,
            value: option.value,
          });

          toggleFilterList();
        });
      }
    );

    // Close FilterList if clicked outside the element
    document.addEventListener('click', evt => {
      // Ignore if the list is not opened
      if (!selectContainer.classList.contains('opened')) {
        return;
      }

      let targetElement = evt.target as HTMLElement; // clicked element

      if (selectContainer.contains(targetElement)) {
        // Clicked inside the element
        return;
      }

      // Clicked outside the element
      toggleFilterList();
      btnOpenList.checked = false;
    });
  }

  render() {
    this.element.innerHTML = `
      <div class="filter-wrapper">
        <picture class="filter-image">
          <img src="${this.image}" alt="${this.imageAlt}" />
        </picture>
        <label for="input-${this.id}" class="filter-label">${this.label}</label>

        <div
          data-testid="select-wrapper-${this.id}"
          class="select-wrapper"
          id="select-wrapper-${this.id}"
        >
          <div class="select">
            <input
              data-testid="input-${this.id}"
              type="text"
              name="input-${this.name}"
              class="filter-input"
              placeholder="Select..."
              id="input-${this.id}"
              disabled
            />

            <div class="select-icon">
              <label for="select-btn-${this.id}">
                <input
                  data-testid="select-btn-${this.id}"
                  type="checkbox"
                  id="select-btn-${this.id}"
                />
                <div class="square">
                  <div class="arrow rotate-down"></div>
                </div>
              </label>
            </div>
          </div>

          <div
            data-testid="select-list-${this.id}"
            class="select-list hidden"
            id="select-list-${this.id}"
          >
            ${this.options
              .map(
                option => `
                  <label for="radio-${this.id}" class="select-item">
                    <input
                      type="radio"
                      name="radio-${this.id}"
                      value="${encode(option)}"
                      data-testid="radio-${this.id}"
                    />
                    <span class="select-item-text">${option.label}</span>
                  </label>
                `
              )
              .join('')}
          </div>
        </div>
      </div>
    `;
  }
}

export default Filter;
