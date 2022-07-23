import React, { useContext } from 'react';
import { authService } from '../services/authService';
import { actions, AppContext } from '../state';

// import React, { useEffect, useState } from 'react';
// import { API } from '../services/API';
// import { UserInfo } from '../types/API';

function ConfirmWindow() {

  // const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

  /*
  useEffect(() => {
    const loadInfo = async() => {
      const result = await API.get()
    }
  })
  */

  const [state, dispatch] = useContext(AppContext);

  function logout(): void {
    dispatch(actions.removeUser());
    authService.clearToken();
  }

  return (
    <div onClick={logout}>
      ConfirmWindow<br />
      <br />
      uid: {state.uid}
    </div>
  );
}

export default ConfirmWindow;
