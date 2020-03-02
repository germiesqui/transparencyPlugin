export interface State {
  showDaltonicMode: boolean
};

const initialState: State = {
    showDaltonicMode: false
};

export function reducer(state = initialState, action): State{
  console.log("estado previo: " + JSON.stringify(state));
  console.log("payload: " + JSON.stringify(action.payload));
  switch (action.type) {
    case 'TOGGLE_DALTONIC_MODE': {
      return {
        ...state,
        showDaltonicMode: action.payload
      };
    }

    default: {
      return state;
    }
  }
}