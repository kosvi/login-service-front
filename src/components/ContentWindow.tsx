import React, { useContext } from 'react';
import Forms from './Forms';
import ConfirmWindow from './ConfirmWindow';
import { AppContext } from '../state';

function ContentWindow() {

  const [state] = useContext(AppContext);

  return (
    <div id="ContentWindow">
      <div id="Content">
        {!state.token && <Forms />}
        {state.token && <ConfirmWindow />}
      </div>
    </div>
  );
}

export default ContentWindow;
