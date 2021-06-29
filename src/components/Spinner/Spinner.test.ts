import Spinner from '.';
import { cleanup } from '../../utils/testUtils';

describe('Component Spinner end-to-end tests', () => {
  let spinner: Spinner;

  beforeEach(() => {
    cleanup();

    spinner = new Spinner();
    spinner.render();
  });

  it('should have the class loader and Loading... message', async () => {
    expect(spinner.node()).toHaveClass('loader');

    expect(spinner.node()).toHaveTextContent('Loading...');
  });

  it('should insert the className specified in constructor', () => {
    const className = 'test-class';

    cleanup();
    spinner = new Spinner({ className });
    spinner.render();

    expect(spinner.node()).toHaveClass(className);
  });
});
