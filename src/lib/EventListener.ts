type Callback = (...props: any[]) => void;

/**
 * EventListener using subscribe/publish pattern
 */
class EventListener {
  private events: Record<string | symbol, Callback[]>;

  constructor() {
    this.events = {};
  }

  /**
   * Add callback to subscription event list
   * @param  {string} event Event name
   * @param  {Callback} callback Callback function to subscribe
   */
  subscribe(event: string, callback: Callback): void {
    if (!(event in this.events)) {
      this.events[event] = [];
    }

    this.events[event].push(callback);
  }

  /**
   * Calls all subscriptions to event in subscription list
   * @param  {string} event Event name
   * @param  {any[]} ...props Props to send to subscribed events
   */
  publish(event: string, ...props: any[]): void[] {
    if (!(event in this.events)) {
      return [];
    }

    return this.events[event].map(fn => fn(...props));
  }
}

export default EventListener;
