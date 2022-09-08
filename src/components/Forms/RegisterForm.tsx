import React, { useContext, useState } from 'react';
import useTextInput from '../../hooks/useInput';
import { authService } from '../../services/authService';
import { actions, AppContext } from '../../state';
import { RegisterContent } from '../../types';
import { isRegisterContent } from '../../utils/validators';

function RegisterForm() {

  const name = useTextInput();
  const email = useTextInput();
  const username = useTextInput();
  const password = useTextInput('password');
  const password2 = useTextInput('password');

  const submit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (password.value !== password2.value) {
      console.log('passwords dont match');
      return;
    }
    let obj: RegisterContent = {
      username: username.value,
      password: password.value,
    };
    if (name.value.length > 0) {
      obj = { ...obj, name: name.value };
    }
    if (email.value.length > 0) {
      obj = { ...obj, email: email.value };
    }
    console.log(isRegisterContent(obj));
    console.log(obj);
  };

  return (
    <div className="App">
      <form>
        Name:<br />
        <input {...name} /><br />
        Email:<br />
        <input {...email} /><br />
        Username:<br />
        <input {...username} /><br />
        Password:<br />
        <input {...password} /><br />
        Confirm password:<br />
        <input {...password2} /><br />
        <button onClick={submit}>login</button>
      </form>
    </div>
  );
}

export default RegisterForm;
