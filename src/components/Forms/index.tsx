import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function Forms() {

  const [selectedForm, setSelectedForm] = useState<number>(1);

  return (
    <div>
      <div id="MenuLinkBar">
        <span className="MenuLink" onClick={() => setSelectedForm(1)}>Login</span>
        <span className="MenuLink" onClick={() => setSelectedForm(2)}>Register</span>
      </div>
      {
        /* not a beauty, but works for now */
        selectedForm === 1 && <LoginForm />
      }
      {selectedForm === 2 && <RegisterForm />}
    </div>
  );
}

export default Forms;
