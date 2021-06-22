import { screen } from '@testing-library/dom';
import Spinner from '.';
import render from '../../lib/utils/render';
import { cleanup } from '../../utils/testUtils';

describe('Component Spinner end-to-end tests', () => {
  const { queryByText } = screen;

  beforeEach(() => {
    cleanup();

    render(new Spinner(), document.body);
  });

  it('should render the Spinner component correctly', async () => {
    const spinner = queryByText(/loading/i);

    expect(spinner).toBeInTheDocument();
  });
  
  it('should have the class loader', async () => {
    const spinner = queryByText(/loading/i);

    expect(spinner?.className).toBe('loader');
  });
});
