import { FilterProps } from '../../components/Filter/index';
import sun from '../../assets/images/illustrations/sun.png';
import wateringCan from '../../assets/images/illustrations/wateringcan-invert.png';
import dog from '../../assets/images/illustrations/dog.png';

export const sunlightFilter: FilterProps = {
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

export const waterFilter: FilterProps = {
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

export const petsFilter: FilterProps = {
  name: 'pets',
  image: dog,
  imageAlt: 'Pets',
  label: `
        <b>3. </b>Do you have pets? Do they <b>chew</b> plants?
      `,
  options: [
    { label: 'No/They don’t care', value: 'false' },
    { label: 'Yes', value: 'true' },
  ],
};
