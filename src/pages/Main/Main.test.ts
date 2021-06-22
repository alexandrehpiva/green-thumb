import { screen, queryByAltText, within } from '@testing-library/dom';
import Main from '.';
import render from '../../lib/utils/render';
import { cleanup } from '../../utils/testUtils';

describe('Component Main end-to-end tests', () => {
  const { findByTestId } = screen;

  beforeEach(() => {
    cleanup();

    // Render into body
    render(new Main(), document.body);
  });

  it('should render the main header with Greenthumb logo inside', async () => {
    const header = await findByTestId('main-header');
    expect(header).toBeInTheDocument();

    const logoContainer = queryByAltText(header, /green thumb./i);
    expect(logoContainer).toBeTruthy();
  });

  it.each`
    filter
    ${/1.*sunlight/i}
    ${/2.*water/i}
    ${/3.*pets/i}
  `(
    'should render the $filter filter in the filters section',
    async ({ filter }) => {
      const filtersSection = await findByTestId('filters-section');

      const filterInput = within(filtersSection).getByLabelText(filter);

      expect(filterInput).toBeInTheDocument();
    }
  );

  it('should render the content section', async () => {
    const mainContent = await findByTestId('main-content');
    const contentSection = within(mainContent).getByTestId('content-section');

    expect(contentSection).toBeInTheDocument();
  });
});
