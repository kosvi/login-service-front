import React, { useContext, useEffect } from 'react';
import ContentWindow from './components/ContentWindow';
import './App.css';
import { authService } from './services/authService';
import { actions, AppContext } from './state';
import { isLocalStorageContent } from './utils/validators';
import useUrl from './hooks/useUrl';

function App() {

  const [, dispatch] = useContext(AppContext);
  const { readParams } = useUrl();

  useEffect(() => {
    // Check if user already has token and dispatch it from localStorage
    const content = authService.loadToken();
    if (isLocalStorageContent(content)) {
      dispatch(actions.setUser(content.token, content.uid));
    }
    // Also read URL params and store them into AppContext
    readParams();
  }, []);

  return (
    <div id="Page">
      <ContentWindow />
    </div>
  );

}

export default App;
