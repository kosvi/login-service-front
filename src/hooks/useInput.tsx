import React, { useState } from 'react';

function useTextInput(password?: string) {
  const [value, setValue] = useState<string>('');

  const type = password === 'password' ? 'password' : 'text';

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  return { type, value, onChange };
}

export default useTextInput;
