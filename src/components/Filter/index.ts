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
    const query = document.querySelector.bind(document);
    const queryAll = document.querySelectorAll.bind(document);

    const toggleFilterList = () => {
      query(`#select-wrapper-${this.id}`)?.classList.toggle('opened');
      query(`#select-list-${this.id}`)?.classList.toggle('hidden');
    };

    const btnOpenList: HTMLInputElement | null = query(
      `#select-btn-${this.id}`
    );

    btnOpenList?.addEventListener('change', toggleFilterList);

    const inputSelect: HTMLInputElement | null = query(`#input-${this.id}`);

    queryAll(`.select-item > input[id="radio-${this.id}"]`).forEach(
      (input, _itemIdx) => {
        input.addEventListener('click', event => {
          const { value } = event.target as HTMLInputElement;
          const option = decode<FilterOption>(value);

          if (inputSelect && option) {
            inputSelect.value = option.label;

            store.dispatch('main', 'addFilter', {
              name: this.name,
              value: option.value,
            });
          }

          toggleFilterList();
        });
      }
    );
  }

  render() {
    this.element.innerHTML = `    
      <div class="filter-wrapper">
        <picture class="filter-image">
          <img src="${this.image}" alt="${this.imageAlt}" />
        </picture>
        <label for="input-${this.id}" class="filter-label">${this.label}</label>

        <div class="select-wrapper" id="select-wrapper-${this.id}">
          <div class="select">
            <input
              type="text"
              name="input-${this.name}"
              class="filter-input"
              placeholder="Select..."
              id="input-${this.id}"
              disabled
            />

            <div class="select-icon">
              <label for="select-btn-${this.id}">
                <input type="checkbox" id="select-btn-${this.id}" />
                <div class="square">
                  <div class="arrow rotate-down"></div>
                </div>
              </label>
            </div>
          </div>

          <div class="select-list hidden" id="select-list-${this.id}">
            ${this.options
              .map(
                option => `
                  <label for="radio-${this.id}" class="select-item">
                    <input
                      type="radio"
                      name="radio-${this.id}"
                      value="${encode(option)}"
                      id="radio-${this.id}"
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
