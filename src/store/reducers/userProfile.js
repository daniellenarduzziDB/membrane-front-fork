import * as types from '../actions/types/userProfile';

export default function userProfileReducer(
  state = {
    company: 'AccelOne'
  },
  action
) {
  switch (action.type) {
    case types.SET_USER_PROFILE:
      return Object.assign({}, state, { ...action.payload });
    default:
      return state;
  }
}
