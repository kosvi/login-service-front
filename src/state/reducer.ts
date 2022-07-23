import { State } from './state';

export type Action = { type: 'SET_USER', payload: { token: string, uid: string } } | { type: 'REMOVE_USER', payload: undefined }

export function reducer(state: State, action: Action): State {
  switch (action.type) {
  case 'SET_USER':
    return {
      token: action.payload.token,
      uid: action.payload.uid
    };
  case 'REMOVE_USER':
    return {
      token: undefined,
      uid: undefined
    };
  default:
    return state;
  }
}

function setUser(token: string, uid: string): Action {
  return {
    type: 'SET_USER',
    payload: {
      token: token,
      uid: uid
    }
  };
}

function removeUser(): Action {
  return {
    type: 'REMOVE_USER',
    payload: undefined
  };
}

export const actions = {
  setUser, removeUser
};
