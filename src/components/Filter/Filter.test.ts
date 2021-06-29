import { waitFor } from '@testing-library/dom';
import { cleanup, findByTestIds } from '../../utils/testUtils';

import Filter from '.';
import render from '../../lib/utils/render';
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
    const [selectContainer, selectList, btnOpenList] = await findByTestIds(
      `select-wrapper-${filter.id}`,
      `select-list-${filter.id}`,
      `select-btn-${filter.id}`
    );

    expect(selectList).toHaveClass('hidden');

    btnOpenList.click();

    await waitFor(() => {
      expect(selectContainer).toHaveClass('opened');
      expect(selectList).not.toHaveClass('hidden');
    });
  });

  it('should addFilter to store on click a list item', async () => {
    // TODO
  });

  it('should close the list on click outside', async () => {
    // TODO
  });
});
