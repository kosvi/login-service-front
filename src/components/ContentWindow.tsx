import React, { useState } from 'react';
import LoginForm from './LoginForm';

function ContentWindow() {

  const [content, setContent] = useState<string>('login');

  const updateContent = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <div id="ContentWindow">
      <div id="Content" onClick={() => updateContent('login')}>
        {content === 'login' && <LoginForm />}
      </div>
    </div>
  );
}

export default ContentWindow;
