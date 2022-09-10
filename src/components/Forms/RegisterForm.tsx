import React, { useContext, useState } from 'react';
import useTextInput from '../../hooks/useInput';
import { authService } from '../../services/authService';
import { actions, AppContext } from '../../state';
import { RegisterRequestBody, ZodRegisterRequestBody } from '../../types';
import { isLoginResult, isRegisterRequestBody, isRegisterResult } from '../../utils/validators';
import { API } from '../../services';

function RegisterForm() {

  const [, dispatch] = useContext(AppContext);
  const [message, setMessage] = useState<string>('');
  const name = useTextInput();
  const email = useTextInput();
  const username = useTextInput();
  const password = useTextInput('password');
  const password2 = useTextInput('password');

  const submit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (password.value !== password2.value) {
      setMessage('Passwords don\'t match!');
      return;
    }
    let obj: { username: string | undefined, password: string | undefined } | RegisterRequestBody = {
      username: (username.value.length > 0 ? username.value : undefined),
      password: (password.value.length > 0 ? password.value : undefined),
    };
    if (name.value.length > 0) {
      obj = { ...obj, name: name.value };
    }
    if (email.value.length > 0) {
      obj = { ...obj, email: email.value };
    }
    if (isRegisterRequestBody(obj)) {
      setMessage('');
      const result = await API.post('/users', obj);
      if (result.success && isRegisterResult(result.content)) {
        // successfully created the user
        const loginResult = await authService.login(result.content.username, password.value);
        if (loginResult.success && isLoginResult(loginResult.content)) {
          dispatch(actions.setUser(loginResult.content.token, loginResult.content.content.uid));
        }
      } else if (!result.success) {
        setMessage(result.content.error);
      } else {
        console.log(result.content);
      }
    } else {
      const result = ZodRegisterRequestBody.safeParse(obj);
      if (!result.success) {
        setMessage(`${result.error.issues[0].message.toLowerCase()}`);
      }
    }
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
        <button onClick={submit}>login</button> {message}
      </form>
    </div>
  );
}

export default RegisterForm;
