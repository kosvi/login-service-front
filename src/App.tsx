import React, { useContext, useEffect } from 'react';
import ContentWindow from './components/ContentWindow';
import './App.css';
import { authService } from './services/authService';
import { actions, AppContext } from './state';
import { isLocalStorageContent } from './utils/validators';

function App() {

  const [, dispatch] = useContext(AppContext);

  useEffect(() => {
    const content = authService.loadToken();
    if (isLocalStorageContent(content)) {
      dispatch(actions.setUser(content.token, content.uid));
    }
  }, []);

  return (
    <div id="Page">
      <ContentWindow />
    </div>
  );

}

export default App;
