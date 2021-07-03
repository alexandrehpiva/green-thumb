import App from './App';
import store from './store';
import { cleanup, queryById } from './utils/testUtils';

describe('App', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should render the root div', async () => {
    App();

    const rootElement = queryById(document.body, 'root');

    expect(rootElement).toBeInTheDocument();
  });

  it('should publish a "rendered" event to store', () => {
    const mockFn = jest.fn();

    store.events.subscribe('rendered', mockFn);

    App();

    expect(mockFn).toBeCalledTimes(1);
  });
});
