import { screen } from '@testing-library/dom';
import GridItem from '.';
import render from '../../lib/utils/render';
import { cleanup } from '../../utils/testUtils';

describe('Component GridItem end-to-end tests', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should render the GridItem component correctly', async () => {
    const gridItem = new GridItem({
      id: 1,
      name: 'Euphorbia eritrea',
      sun: 'high',
      water: 'rarely',
      url: 'https://storage.googleapis.com/front-br-challenges.appspot.com/green-thumb-v2/plants/euphorbia-eritrea.png',
      price: 25,
      toxicity: false,
      staff_favorite: true,
    });

    render(gridItem, document.body);

    expect(gridItem.node()).toBeInTheDocument();

    expect(screen.queryByText(/Euphorbia eritrea/i)).toBeInTheDocument();
  });
});
