import { screen, queryByAltText, within } from '@testing-library/dom';
import Filter from '.';
import render from '../../lib/utils/render';
import { cleanup } from '../../utils/testUtils';

describe('Component Filter end-to-end tests', () => {
  const { findByTestId } = screen;

  beforeEach(() => {
    cleanup();
  });

  it('should render the Filter component correctly', async () => {
    const filter = new Filter({
      name: 'sunlight',
      image: './path/to/image.svg',
      imageAlt: 'Sunlight',
      label: `
        <b>1. </b>Set the amount of sunlight your plant will get.
      `,
      options: [
        { label: 'No sunlight', value: 'no' },
        { label: 'Low sunlight', value: 'low' },
        { label: 'High sunlight', value: 'high' },
      ],
    });

    render(filter, document.body);

    expect(filter.node()).toBeInTheDocument();
  });
});
