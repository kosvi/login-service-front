import React, { useState } from 'react';

function App() {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const updateUsername = (event: React.FormEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  };

  const updatePassword = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const printToConsole = () => {
    console.log(`Username: ${username}, Password: ${password}`);
  };

  return (
    <div className="App">
      <input type="text" value={username} onChange={updateUsername} /> <br />
      <input type="password" value={password} onChange={updatePassword} /> <br />
      <button onClick={printToConsole}>login</button>
    </div>
  );
}

export default App;
