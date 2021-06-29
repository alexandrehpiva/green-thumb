/**
 * Toggle class hidden in HTMLElement
 * @param {string} selector A string querySelector or a HTMLElement instance
 * @param {boolean} visible false for set class hidden and true to remove it
 * @returns false if the final element has hidden class and true if don't
 */
const toggle = (
  selector: string | HTMLElement,
  visible?: boolean
): boolean | undefined => {
  const element =
    typeof selector === 'string' ? document.querySelector(selector) : selector;

  if (!element) return;

  const tg = () => !element.classList.toggle('hidden');
  const isHidden = () => element.classList.contains('hidden');

  switch (visible) {
    case undefined:
      return tg();
    case true:
      if (isHidden()) {
        return tg();
      }
      return;
    case false:
      if (!isHidden()) {
        return tg();
      }
      return;
  }
};

export default toggle;
