import React, { useContext } from 'react';
import LoginForm from './LoginForm';
import ConfirmWindow from './ConfirmWindow';
import { AppContext } from '../state';

function ContentWindow() {

  const [state] = useContext(AppContext);

  return (
    <div id="ContentWindow">
      <div id="Content">
        {!state.token && <LoginForm />}
        {state.token && <ConfirmWindow />}
      </div>
    </div>
  );
}

export default ContentWindow;
