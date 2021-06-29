import { within } from '@testing-library/dom';
import Component from '../Component';
import render from './render';

describe('Unit(render)', () => {
  class TestComponent extends Component {
    render() {
      this.element.innerHTML = `
        <div data-testid="test-element"></div>
      `;
    }
  }

  class EmptyComponent extends Component {}

  it('should call render method from component object and return its innerHTML', () => {
    const component = new TestComponent();
    const innerHTML = render(component);

    expect(innerHTML).toBe(component.element.innerHTML);
  });

  it('should behave normally if the component does not have a render method', () => {
    const component = new EmptyComponent();
    const innerHTML = render(component);

    expect(innerHTML).toBe('');
  });

  it('should append to HTMLElement if specified', () => {
    const element = document.createElement('div');
    const component = new TestComponent();

    render(component, element);

    const isInside = within(component.element).queryByTestId('test-element');

    expect(isInside).toBeTruthy();
  });
});
