import Component from '../../lib/Component';
import { Plant } from '../../types/apiTypes';

import svgSunHigh from '../../assets/images/icons/high-sun.svg';
import svgSunLow from '../../assets/images/icons/low-sun.svg';
import svgSunNo from '../../assets/images/icons/no-sun.svg';
import svgWaterRarely from '../../assets/images/icons/1-drop.svg';
import svgWaterRegularly from '../../assets/images/icons/2-drops.svg';
import svgWaterDaily from '../../assets/images/icons/3-drops.svg';
import svgToxicityTrue from '../../assets/images/icons/toxic.svg';
import svgToxicityFalse from '../../assets/images/icons/pet.svg';

import './style.scss';

const imageMap = {
  high: svgSunHigh,
  low: svgSunLow,
  no: svgSunNo,
  rarely: svgWaterRarely,
  regularly: svgWaterRegularly,
  daily: svgWaterDaily,
  true: svgToxicityTrue,
  false: svgToxicityFalse,
};

export interface GridItemProps extends Plant {}

class GridItem extends Component {
  name: string;
  sun: string;
  water: string;
  url: string;
  price: number;
  toxicity: boolean;
  staff_favorite: boolean;

  constructor(props: GridItemProps) {
    super();

    this.name = props.name;
    this.sun = props.sun;
    this.water = props.water;
    this.url = props.url;
    this.price = props.price;
    this.toxicity = props.toxicity;
    this.staff_favorite = props.staff_favorite;
  }

  render() {
    this.element.innerHTML = `
      <div class="grid-item staff-favorite">
        <picture>
          <img src="${this.url}" alt="${this.name}">
        </picture>
        <div class="title">${this.name}</div>
        <div class="grid-item-footer">
          <span class="price">$${this.price}</span>
          <div class="icon-tags">
            <picture class="tag"><img src="${
              imageMap[this.toxicity.toString() as keyof typeof imageMap]
            }" alt="" /></picture>
            <picture class="tag"><img src="${
              imageMap[this.sun.toString() as keyof typeof imageMap]
            }" alt="" /></picture>
            <picture class="tag"><img src="${
              imageMap[this.water.toString() as keyof typeof imageMap]
            }" alt="" /></picture>
          </div>
        </div>
      </div>
    `;
  }
}

export default GridItem;
