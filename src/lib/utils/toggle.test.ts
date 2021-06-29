import toggle from './toggle';

describe('Unit(toggle)', () => {
  it('should toggle hidden class in the element if it does not specify the value', () => {
    const element = document.createElement('div');
    toggle(element);

    expect(element).toHaveClass('hidden');
  });

  it('should add the hidden class in the element if value is false', () => {
    // Not hidden element
    const element = document.createElement('div');
    toggle(element, false);

    expect(element).toHaveClass('hidden');

    // Already hidden element
    const hiddenElement = document.createElement('div');
    element.classList.add('hidden');
    toggle(hiddenElement, false);

    expect(element).toHaveClass('hidden');
  });

  it('should remove the hidden class from the element if the value is true', () => {
    // Hidden element
    const element = document.createElement('div');
    element.classList.add('hidden');
    toggle(element, true);

    expect(element).not.toHaveClass('hidden');

    // Already not hidden element
    const hiddenElement = document.createElement('div');
    toggle(hiddenElement, true);

    expect(element).not.toHaveClass('hidden');
  });

  it("should return false if the final element has hidden class and true if don't", () => {
    // Hiding element
    const element = document.createElement('div');
    const hideElementResult = toggle(element, false);

    expect(hideElementResult).toBe(false);

    // Showing element
    const hiddenElement = document.createElement('div');
    hiddenElement.classList.add('hidden');
    const elementResult = toggle(hiddenElement, true);

    expect(elementResult).toBe(true);

    // Hiding an already hidden element
    const aHiddenElement = document.createElement('div');
    aHiddenElement.classList.add('hidden');
    const aHideElementResult = toggle(aHiddenElement, false);

    expect(aHideElementResult).toBe(undefined);

    // Showing an already not hidden element
    const aElement = document.createElement('div');
    const aElementResult = toggle(aElement, true);

    expect(aElementResult).toBe(undefined);
  });

  it('should find the element in document and toggle hidden class if using a string selector', () => {
    const element = document.createElement('div');
    element.id = 'element';
    document.body.appendChild(element);

    toggle('#element');

    expect(element).toHaveClass('hidden');
  });

  it('should return undefined if do not found an element', () => {
    let response = toggle('#invalid-element', true);

    expect(response).not.toBeDefined();
  });
});
