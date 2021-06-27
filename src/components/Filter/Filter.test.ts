import { screen, waitFor } from '@testing-library/dom';

import Filter from '.';
import render from '../../lib/utils/render';
import { cleanup } from '../../utils/testUtils';
import { FilterProps } from './index';

describe('EndToEnd(Filter)', () => {
  let filter: Filter;
  const mockData: FilterProps = {
    name: 'sunlight',
    image: './path/to/image.svg',
    imageAlt: 'Sunlight',
    label: `Set the amount of sunlight your plant will get`,
    options: [
      { label: 'No', value: 'no' },
      { label: 'Low', value: 'low' },
      { label: 'High', value: 'high' },
    ],
  };

  beforeEach(() => {
    cleanup();

    filter = new Filter(mockData);
    render(filter, document.body);
    filter.effect();
  });

  it('should render the Filter component', async () => {
    expect(filter.node()).toBeInTheDocument();
  });

  it('should open the list on click', async () => {
    const selectContainer = await screen.findByTestId(
      `select-wrapper-${filter.id}`
    );
    const selectList = await screen.findByTestId(`select-list-${filter.id}`);
    const btnOpenList = (await screen.findByTestId(
      `select-btn-${filter.id}`
    )) as HTMLInputElement;

    expect(selectList).toHaveClass('hidden');

    btnOpenList.click();

    await waitFor(() => {
      expect(selectContainer).toHaveClass('opened');
      expect(selectList).not.toHaveClass('hidden');
    });
  });

  it('should...', async () => {});
});
