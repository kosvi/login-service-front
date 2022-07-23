import React, { useEffect, useState } from 'react';
import { API } from '../services/API';
import { authService } from '../services/authService';
import { ZodLoginResult } from '../types/API';
import { isLoginResult } from '../utils/validators';

function LoginForm() {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (authService.loadToken()) {
      setLoggedIn(true);
    }
  }, []);

  const updateUsername = (event: React.FormEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  };

  const updatePassword = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const submit = async () => {
    const result = await API.post('/login', { username: username, password: password });
    if (!result.success) {
      // login failed
      alert(`login failed: ${result.content.error}`);
    } else {
      // login succeeded
      if (isLoginResult(result.content)) {
        alert(`login succeeded: ${result.content.content.uid}`);
      }
    }
  };

  if (!loggedIn) {
    return (
      <div className="App">
        <input type="text" value={username} onChange={updateUsername} /> <br />
        <input type="password" value={password} onChange={updatePassword} /> <br />
        <button onClick={submit}>login</button>
      </div>
    );
  }
  return (
    <div>
      logged in
    </div>
  );
}

export default LoginForm;
