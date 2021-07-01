import {
  screen,
  queryByAltText,
  within,
  waitFor,
  fireEvent,
} from '@testing-library/dom';
import Main from '.';
import render from '../../lib/utils/render';
import store from '../../store';
import { Plant } from '../../types/apiTypes';
import { cleanup, defineProperty, findByTestIds } from '../../utils/testUtils';

import { sunlightFilter, waterFilter, petsFilter } from './filtersData';

describe('EndToEnd(Main)', () => {
  const { findByTestId } = screen;
  let main: Main;

  beforeEach(() => {
    cleanup();

    main = new Main();

    // Render into body
    render(main, document.body);
    main.effect();

    // Reset scrollTop
    document.documentElement.scrollTop = 0;
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

      const inputSelect = within(filtersSection).getByLabelText(filter);

      expect(inputSelect).toBeInTheDocument();
    }
  );

  it('should render the content section', async () => {
    const mainContent = await findByTestId('main-content');
    const contentSection = within(mainContent).getByTestId('content-section');

    expect(contentSection).toBeInTheDocument();
  });

  it('should scroll down to main-content on click scroll-down-btn', async () => {
    const [mainContent, scrollDownBtn] = await findByTestIds(
      'main-content',
      'scroll-down-btn'
    );

    // Verify initial document scrollTop
    expect(document.documentElement.scrollTop).toBe(0);

    // Mocking mainContent offsetTop
    defineProperty(mainContent, 'offsetTop', 500);

    scrollDownBtn.click();

    await waitFor(() => {
      expect(document.documentElement.scrollTop).toBe(mainContent.offsetTop);
    });
  });

  it('should scroll up to main-content on click back-to-top btn ', async () => {
    const [mainContent, backToTopBtn] = await findByTestIds(
      'main-content',
      'back-to-top'
    );

    // Mocking mainContent offsetTop
    defineProperty(mainContent, 'offsetTop', 500);

    // Setting initial document scrollTop
    document.documentElement.scrollTop = 1000;

    backToTopBtn.click();

    await waitFor(() => {
      expect(document.documentElement.scrollTop).toBe(mainContent.offsetTop);
    });
  });

  it('should enable back-to-top btn when the scroll is below the main-content container', async () => {
    const [mainContent, backToTopBtn] = await findByTestIds(
      'main-content',
      'back-to-top'
    );

    // Verify initial document scrollTop
    expect(document.documentElement.scrollTop).toBe(0);
    expect(backToTopBtn).toHaveClass('hidden');

    // Mocking offsetTop
    defineProperty(document.documentElement, 'scrollHeight', 1000);
    defineProperty(mainContent, 'offsetTop', 500);

    fireEvent.scroll(window, { target: { scrollY: 600 } });

    // Should show if below
    await waitFor(() => {
      expect(backToTopBtn).not.toHaveClass('hidden');
    });

    fireEvent.scroll(window, { target: { scrollY: 0 } });

    // And hide if above
    await waitFor(() => {
      expect(backToTopBtn).toHaveClass('hidden');
    });
  });

  it('should call fetch service data when all three filters are filled', async () => {
    const mockData: Plant[] = [
      {
        id: 1,
        name: 'Euphorbia eritrea',
        sun: 'high',
        water: 'rarely',
        url: 'https://storage.googleapis.com/front-br-challenges.appspot.com/green-thumb-v2/plants/euphorbia-eritrea.png',
        price: 25,
        toxicity: false,
        staff_favorite: true,
      },
    ];

    // Mocking global fetch
    global.fetch = jest.fn(
      (input: RequestInfo, init?: RequestInit): Promise<Response> => {
        return Promise.resolve({
          json: () => Promise.resolve(mockData),
        } as Response);
      }
    );

    // Dispatching data for all three filters
    [sunlightFilter, waterFilter, petsFilter].forEach(filter => {
      store.dispatch('main', 'addFilter', {
        name: filter.name,
        value: filter.options[0].value,
      });
    });

    expect(global.fetch).toBeCalledTimes(1);
  });

  it('should show no-results container if receive an api error', async () => {
    // TODO
  });

  it('should render all received data items into grid if not get api error', async () => {
    // TODO
  });
});
