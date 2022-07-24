import { CodeRequest } from '../types';
import { State } from './state';

export type Action = |
{ type: 'SET_USER', payload: { token: string, uid: string } } |
{ type: 'REMOVE_USER', payload: undefined } |
{ type: 'SET_REQUEST', payload: CodeRequest } |
{ type: 'REMOVE_REQUEST', payload: undefined };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
  case 'SET_USER':
    return {
      token: action.payload.token,
      uid: action.payload.uid,
      request: state.request
    };
  case 'REMOVE_USER':
    return {
      token: undefined,
      uid: undefined,
      request: state.request
    };
  case 'SET_REQUEST':
    return {
      token: state.token,
      uid: state.uid,
      request: action.payload
    };
  case 'REMOVE_REQUEST':
    return {
      token: state.token,
      uid: state.uid,
      request: action.payload
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

function setRequest(req: CodeRequest): Action {
  return {
    type: 'SET_REQUEST',
    payload: req
  };
}

function removeRequest(): Action {
  return {
    type: 'REMOVE_REQUEST',
    payload: undefined
  };
}

export const actions = {
  setUser, removeUser, setRequest, removeRequest
};
