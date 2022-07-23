import React, { useContext, useState } from 'react';
import { authService } from '../services/authService';
import { actions, AppContext } from '../state';
import { isLoginResult } from '../utils/validators';

function LoginForm() {


  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [, dispatch] = useContext(AppContext);

  const updateUsername = (event: React.FormEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  };

  const updatePassword = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const submit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const result = await authService.login(username, password);
    if (result.success && isLoginResult(result.content)) {
      dispatch(actions.setUser(result.content.token, result.content.content.uid));
    }
  };

  return (
    <div className="App">
      <form>
        <input type="text" value={username} onChange={updateUsername} /> <br />
        <input type="password" value={password} onChange={updatePassword} /> <br />
        <button onClick={submit}>login</button>
      </form>
    </div>
  );
}

export default LoginForm;
