import React, { useEffect, useContext, useState } from 'react';
import { authService } from '../../services/authService';
import { actions, AppContext } from '../../state';

import { API } from '../../services/API';
import { UserInfo } from '../../types/API';
import { isClientInfo, isResourceInfo, isUserInfo } from '../../utils/validators';
import ContentChooser from './ContentChooser';
import RequestInfo from './RequestInfo';

function ConfirmWindow() {

  const [loading, setLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);
  const [clientInfo, setClientInfo] = useState<{ name: string, redirect_uri: string } | undefined>(undefined);
  const [resourceName, setResourceName] = useState<string>('');

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

  if (loading) {
    return (
      <div onClick={logout}>
        Loading...
      </div>
    );
  }

  if (state.request?.redirect_uri !== clientInfo?.redirect_uri) {
    return (
      <div>
        Mismatch in redirect url - will not process request
      </div>
    );
  }

  return (
    <div>
      <p onClick={logout}>logout</p>
      <h1>Confirm window</h1>
      <RequestInfo clientName={clientInfo?.name || ''} resourceName={resourceName} />
      <ContentChooser userInfo={userInfo} />
    </div>
  );
}

export default ConfirmWindow;
