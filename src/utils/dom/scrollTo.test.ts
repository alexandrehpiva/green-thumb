import { scrollTo } from './scrollTo';

describe('Unit(scrollTo)', () => {
  it('should change the scroll to the specified offsetTop', () => {
    expect(document.body.scrollTop).toBe(0);
    expect(document.documentElement.scrollTop).toBe(0);

    scrollTo(100);

    expect(document.body.scrollTop).toBe(100);
    expect(document.documentElement.scrollTop).toBe(100);

    scrollTo(10);

    expect(document.body.scrollTop).toBe(10);
    expect(document.documentElement.scrollTop).toBe(10);
  });
});
