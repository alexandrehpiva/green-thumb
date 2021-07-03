import { waitFor, screen } from '@testing-library/dom';
import { cleanup, findByTestIds } from '../../utils/testUtils';

import Filter from '.';
import render from '../../lib/utils/render';
import { FilterProps } from './index';
import state from '../../store/state';

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

  it('should open the list on click and close when click outside', async () => {
    const [selectContainer, selectList, btnOpenList, inputSelect] =
      await findByTestIds(
        `select-wrapper-${filter.id}`,
        `select-list-${filter.id}`,
        `select-btn-${filter.id}`,
        `input-${filter.id}`
      );
    const outside = document.body;

    // Verify select-list initial condition
    expect(selectContainer).not.toHaveClass('opened');
    expect(selectList).toHaveClass('hidden');

    // Should open the list
    btnOpenList.click();

    await waitFor(() => {
      expect(selectContainer).toHaveClass('opened');
      expect(selectList).not.toHaveClass('hidden');
    });

    // Click inside the list (e.g. inputSelect) should not close it
    inputSelect.click();

    await waitFor(() => {
      expect(selectContainer).toHaveClass('opened');
      expect(selectList).not.toHaveClass('hidden');
    });

    // Click outside the list
    outside.click();

    await waitFor(() => {
      expect(selectContainer).not.toHaveClass('opened');
      expect(selectList).toHaveClass('hidden');
    });
  });

  it('should ignore toggleFilterList if selectContainer is not opened or the click were inside selectContainer', async () => {
    const [selectContainer, selectList] = await findByTestIds(
      `select-wrapper-${filter.id}`,
      `select-list-${filter.id}`
    );
    const [btnOpenList, inputSelect] = await findByTestIds<HTMLInputElement[]>(
      `select-btn-${filter.id}`,
      `input-${filter.id}`
    );

    // Verify select-list initial condition
    expect(btnOpenList.checked).toBe(false);
    expect(selectContainer).not.toHaveClass('opened');
    expect(selectList).toHaveClass('hidden');

    // Verify an outside click with list closed
    const outside = document.body;
    outside.click();

    await waitFor(() => {
      expect(btnOpenList.checked).toBe(false);
      expect(selectContainer).not.toHaveClass('opened');
      expect(selectList).toHaveClass('hidden');
    });

    // Verify an inside list click
    btnOpenList.click();

    // Verify select-list initial condition
    expect(btnOpenList.checked).toBe(true);
    expect(selectContainer).toHaveClass('opened');
    expect(selectList).not.toHaveClass('hidden');

    const inside = inputSelect;
    inside.click();

    await waitFor(() => {
      expect(btnOpenList.checked).toBe(true);
      expect(selectContainer).toHaveClass('opened');
      expect(selectList).not.toHaveClass('hidden');
    });
  });

  it('should addFilter to store on click a list item', async () => {
    const [mockFirstOption] = mockData.options;

    const [firstItem] = (await screen.findAllByTestId(
      `radio-${filter.id}`
    )) as HTMLInputElement[];
    const [inputSelect] = await findByTestIds<[HTMLInputElement]>(
      `input-${filter.id}`
    );

    // Click item list
    firstItem.click();

    await waitFor(() => {
      // inputSelect value must change
      expect(inputSelect.value).toBe(mockFirstOption.label);

      // The filter must be added to state
      expect(state.main.filters).toEqual({
        [filter.name]: mockFirstOption.value,
      });
    });
  });
});
