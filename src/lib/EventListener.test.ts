import EventListener from './EventListener';

describe('Unit(EventListener)', () => {
  it('should be possible to subscribe to a event and then publish to it', () => {
    const eventListener = new EventListener();

    // Mock function
    const fn = jest.fn((...payload) => payload);

    // Subscription
    eventListener.subscribe('change', fn);

    // Publishing to change event with a payload
    const testPayload = [123, 'test', { name: 'test' }];
    const result = eventListener.publish('change', ...testPayload);

    expect(fn).toBeCalledTimes(1);

    expect(result).toEqual([testPayload]);
  });
});