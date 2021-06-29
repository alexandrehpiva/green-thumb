import { screen, queryByAltText, within } from '@testing-library/dom';
import Main from '.';
import render from '../../lib/utils/render';
import { cleanup } from '../../utils/testUtils';

describe('EndToEnd(Main)', () => {
  const { findByTestId } = screen;
  let main: Main;

  beforeEach(() => {
    cleanup();
    main = new Main();

    // Render into body
    render(main, document.body);
    main.effect();
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

  it('should scroll down to main-content on click scroll-down-btn', () => {
    // TODO
  })

  it('should up to main-content on click back-to-top btn ', () => {
    // TODO
  })

  it('should enable back-to-top btn when the scroll is below the main-content container', () => {
    // TODO
  })

  it('should call fetch service data when all three filters are filled', () => {
    // TODO
  })

  it('should show no-results container if receive an api error', () => {
    // TODO
  })

  it('should render all received data items into grid if not get api error', () => {
    // TODO
  })
});
