import Component from './Component';

describe('Unit(Component) - fragment method', () => {
  it('should generate a fragment on mount', () => {
    const component = new Component();

    expect(component.element.classList.contains('fragment')).toBe(true);
  });
});

describe('Unit(Component) - node method', () => {
  it('should return the entire div fragment if it has adjacent siblings', () => {
    const html = `
      <p>Test 1</p>
      <p>Test 2</p>
    `;
    const fragment = `
      <div class="fragment">${html}</div>
    `;

    class TestComponent extends Component {
      render() {
        this.element.innerHTML = html;
      }
    }

    const testComponent = new TestComponent();
    testComponent.render();

    expect(testComponent.node().outerHTML.trim()).toBe(fragment.trim());
  });

  it('should return the unique element child in the div fragment', () => {
    const html = `
      <p>Test 1</p>
    `;

    class TestComponent extends Component {
      render() {
        this.element.innerHTML = html;
      }
    }

    const testComponent = new TestComponent();
    testComponent.render();

    expect(testComponent.node().outerHTML.trim()).toBe(html.trim());
  });

  it('should return the fragment if it has no child', () => {
    const emptyFragment = `
      <div class="fragment"></div>
    `;

    class TestComponent extends Component {
      render() {
        this.element.innerHTML = '';
      }
    }

    const testComponent = new TestComponent();
    testComponent.render();

    expect(testComponent.node().outerHTML.trim()).toBe(emptyFragment.trim());
  });

  it('should return the rendered element if the element is not a fragment', () => {
    const element = document.createElement('div');
    element.classList.add('test-class');

    const html = `
      <div class="test-class"></div>
    `;

    class TestComponent extends Component {}

    const testComponent = new TestComponent({ element });
    testComponent.render?.();

    expect(testComponent.node().outerHTML.trim()).toBe(html.trim());
  });
});
