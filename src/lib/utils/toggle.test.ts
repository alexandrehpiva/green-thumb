import toggle from './toggle';

describe('Unit(toggle)', () => {
  it('should toggle hidden class in the element if it does not specify the value', () => {
    const hiddenElementHTML = `
      <div class="hidden"></div>
    `;

    const element = document.createElement('div');
    toggle(element);

    expect(element.outerHTML).toBe(hiddenElementHTML.trim());
  });

  it('should add the hidden class in the element if value is false', () => {
    const hidden = /<div(?: class="hidden")?><\/div>/;

    // Not hidden element
    const element = document.createElement('div');
    toggle(element, false);

    expect(element.outerHTML).toMatch(hidden);

    // Already hidden element
    const hiddenElement = document.createElement('div');
    element.classList.add('hidden');
    toggle(hiddenElement, false);

    expect(element.outerHTML).toMatch(hidden);
  });

  it('should remove the hidden class from the element if the value is true', () => {
    const notHidden = /<div(?: class="")?><\/div>/;

    // Hidden element
    const element = document.createElement('div');
    element.classList.add('hidden');
    toggle(element, true);

    expect(element.outerHTML).toMatch(notHidden);

    // Already not hidden element
    const hiddenElement = document.createElement('div');
    toggle(hiddenElement, true);

    expect(element.outerHTML).toMatch(notHidden);
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
});
