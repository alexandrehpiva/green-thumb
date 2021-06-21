import { queryByAttribute } from '@testing-library/dom';
import App from "./App";

describe('Home', () => {
  it('should render the root div', async () => {
    App();

    console.log({ html: document.querySelector('html')?.innerHTML });

    const queryById = queryByAttribute.bind(null, 'id');

    const rootElement = queryById(document.body, 'root');

    expect(rootElement).toBeInTheDocument();
  });
});
