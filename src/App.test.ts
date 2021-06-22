import App from "./App";
import { queryById } from './utils/testUtils';

describe('App', () => {
  it('should render the root div', async () => {
    App();

    // console.log({ html: document.querySelector('html')?.innerHTML });

    const rootElement = queryById(document.body, 'root');

    expect(rootElement).toBeInTheDocument();
  });
});
