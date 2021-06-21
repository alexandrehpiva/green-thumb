import { getByText, screen } from '@testing-library/dom';
import App from '../index';

describe('Home', () => {
  it('should render the home page', async () => {
    App();

    console.log({ html: document.querySelector('html')?.innerHTML });

    const greetingElement = getByText(document.body, 'Hello!');

    expect(greetingElement).toBeTruthy();

    expect(screen.queryByText('Hello!')).toBeInTheDocument();
  });
});
