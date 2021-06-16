import * as types from './types/userProfile';

export const setUserProfile = payload => {
  return (dispatch, getState) => {
    return dispatch({
      type: types.SET_USER_PROFILE,
      payload
    });
  };
};
