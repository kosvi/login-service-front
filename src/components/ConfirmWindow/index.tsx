import React, { useEffect, useContext, useState } from 'react';
import { authService } from '../../services/authService';
import { actions, AppContext } from '../../state';

import { API } from '../../services/API';
import { UserInfo } from '../../types/API';
import { isClientInfo, isCodeResponse, isResourceInfo, isUserInfo } from '../../utils/validators';
import ContentChooser from './ContentChooser';
import RequestInfo from './RequestInfo';
import Redirecter from './Redirecter';

function ConfirmWindow() {

  const [loading, setLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);
  const [clientInfo, setClientInfo] = useState<{ name: string, redirect_uri: string } | undefined>(undefined);
  const [resourceName, setResourceName] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');

  useEffect(() => {
    /*
     * This thing (probably) has memory leaks in it, we will fix it later...
     */
    const loadInfo = async () => {
      const userResult = await API.get(`/users/${state.uid}`);
      if (isUserInfo(userResult.content)) {
        setUserInfo(userResult.content);
      }
      const clientResult = await API.get(`/clients/${state.request?.client_id}`);
      if (isClientInfo(clientResult.content)) {
        setClientInfo({ name: clientResult.content.name, redirect_uri: clientResult.content.redirect_uri });
      }
      const resourceResult = await API.get(`/resources/${state.request?.resource}`);
      if (isResourceInfo(resourceResult.content)) {
        setResourceName(resourceResult.content.name);
      }
      setLoading(false);
    };
    loadInfo();
  }, []);

  const [state, dispatch] = useContext(AppContext);

  function logout(): void {
    dispatch(actions.removeUser());
    authService.clearToken();
  }

  async function getCode(fullInfo: boolean, allowWrite: boolean) {
    const body = {
      user_uid: userInfo?.uid,
      client_id: state.request?.client_id,
      resource_id: state.request?.resource,
      full_info: fullInfo,
      read_only: !allowWrite,
      code_challenge: state.request?.code_challenge
    };
    try {
      const result = await API.post('/codes', body);
      if (result.success && isCodeResponse(result.content)) {
        setCode(result.content.code);
      }
    } catch (error) {
      console.error(error);
    }
    setRedirect(true);
  }

  if (loading) {
    return (
      <div onClick={logout}>
        Loading...
      </div>
    );
  }

  if (state.request?.redirect_uri !== clientInfo?.redirect_uri) {
    console.log(state.request?.redirect_uri, clientInfo?.redirect_uri);
    return (
      <div>
        <p onClick={logout}>logout</p>
        Mismatch in redirect url - will not process request
      </div>
    );
  }

  if (redirect) {
    return (
      <div>
        <p onClick={logout}>logout</p>
        <Redirecter url={`${clientInfo?.redirect_uri}?code=${code}&state=${state.request?.state}`} />
      </div>
    );
  }

  return (
    <div>
      <p onClick={logout}>logout</p>
      <h1>Confirm window</h1>
      <RequestInfo clientName={clientInfo?.name || ''} resourceName={resourceName} />
      <ContentChooser userInfo={userInfo} getCode={getCode} />
    </div>
  );
}

export default ConfirmWindow;
