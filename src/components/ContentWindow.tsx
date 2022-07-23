import React, { useState } from 'react';
import LoginForm from './LoginForm';

function ContentWindow() {

  const [content, setContent] = useState<string>('login');

  const updateContent = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <div id="ContentWindow">
      <div id="Menu">
        <div className="menuButton" onClick={() => updateContent('login')}>Login</div>
        <div className="menuButton" onClick={() => updateContent('none')}>none</div>
      </div>
      <div id="Content">
        {content === 'login' && <LoginForm />}
      </div>
    </div>
  );
}

export default ContentWindow;
