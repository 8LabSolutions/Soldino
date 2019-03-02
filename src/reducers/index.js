import { LOGIN, LOGOUT } from "../constants/actionTypes";

const initialState = {
  logged: false
};
function rootReducer(state = initialState, action) {
  if (action.type === LOGIN || action.type === LOGOUT) {
    return Object.assign({}, state, {
      logged: action.par
    });
  }
  return state;
}
export default rootReducer;
