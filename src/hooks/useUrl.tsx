import React, { useContext } from 'react';
import { actions, AppContext } from '../state';
import { isCodeRequest } from '../utils/validators';

function useUrl() {

  const [, dispatch] = useContext(AppContext);

  const readParams = () => {
    const params = new URLSearchParams(window.location.search);
    // now let's make a CodeRequest from those params
    const codeRequest = {
      response_type: params.get('response_type'),
      client_id: params.get('client_id'),
      state: params.get('state'),
      redirect_uri: decodeURIComponent(params.get('redirect_uri') || ''),
      resource: params.get('resource'),
      code_challenge: params.get('code_challenge'),
      code_challenge_method: params.get('code_challenge_method')
    };
    // now validate those params
    if (isCodeRequest(codeRequest)) {
      // was valid!
      dispatch(actions.setRequest(codeRequest));
    }
  };

  return {
    readParams
  };

}

export default useUrl;
