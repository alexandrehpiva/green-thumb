export interface MainState {
  filters?: Record<string, string | undefined>; // TODO: Refazer tipo
}

const mainState: MainState = {
  filters: {},
};

export default mainState;
