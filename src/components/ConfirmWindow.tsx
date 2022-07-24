import React, { useEffect, useContext, useState } from 'react';
import { authService } from '../services/authService';
import { actions, AppContext } from '../state';

import { API } from '../services/API';
import { UserInfo } from '../types/API';
import { isUserInfo } from '../utils/validators';

function ConfirmWindow() {

  const [loading, setLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

  useEffect(() => {
    const loadInfo = async () => {
      const result = await API.get(`/users/${state.uid}`);
      if (isUserInfo(result.content)) {
        setUserInfo(result.content);
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

  return (
    <div onClick={logout}>
      ConfirmWindow<br />
      <br />
      uid: {state.uid}<br />
      <br />
      name: {userInfo?.name}<br />
      <br />
      redirecting to: {state.request?.redirect_uri}
    </div>
  );
}

export default ConfirmWindow;
