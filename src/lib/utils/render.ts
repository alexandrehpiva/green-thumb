import Component from '../Component';

const render = (
  component: InstanceType<typeof Component>,
  appendTo?: HTMLElement
) => {
  component.render?.();

  if (appendTo) {
    appendTo.appendChild(component.element);
    return appendTo.innerHTML;
  }

  return component.element.innerHTML;
};

export default render;
