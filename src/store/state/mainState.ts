export interface MainState {
  filters?: Record<string, any>; // TODO: Improve this type
}

const mainState: MainState = {
  filters: {},
};

export default mainState;
