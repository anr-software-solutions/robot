export const initialState = {
  xPlacement: '',
  yPlacement: '',
  direction: '',
  command: ''
};

export const UPDATE_PLACEMENT = 'updatePlacement';
export const UPDATE_X_PLACEMENT = 'updateXPlacement';
export const UPDATE_Y_PLACEMENT = 'updateYPlacement';
export const UPDATE_DIRECTION = 'updateDirection';
export const CLEAR_STATE = 'clearState';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PLACEMENT:
      return {
        ...state,
        xPlacement: action.xPlacement,
        yPlacement: action.yPlacement,
        direction: action.direction
      };
    case UPDATE_X_PLACEMENT:
      return {
        ...state,
        xPlacement: action.xPlacement
      };
    case UPDATE_Y_PLACEMENT:
      return {
        ...state,
        yPlacement: action.yPlacement
      };
    case UPDATE_DIRECTION:
      return {
        ...state,
        direction: action.direction
      };
    case CLEAR_STATE:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
}

export default reducer;