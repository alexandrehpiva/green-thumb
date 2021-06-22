export interface MainState {
  filters?: Record<string, any>; // TODO: Refazer tipo
}

const mainState: MainState = {
  filters: {},
};

export default mainState;
