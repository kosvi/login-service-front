import React, { useState } from 'react';
import { UserInfo } from '../../types';

function ContentChooser({ userInfo }: { userInfo: UserInfo | undefined }) {

  const [fullInfo, setFullInfo] = useState<boolean>(false);
  const [allowWrite, setAllowWrite] = useState<boolean>(false);

  if (!userInfo) {
    return (
      <div></div>
    );
  }

  const writeInfo = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(fullInfo);
    console.log(allowWrite);
  };

  const cancelSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  /*
   * This looks like a pile of vomit, but we can fix it later if/when we want to spend time working on UI/UX
   */

  return (
    <div>
      <form>
        Following information is passed to the resource:<br />
        uid: {userInfo.uid}<br />
        username: {userInfo.username}<br />
        <br />
        Following additional information is passed if you choose so:<br />
        name: {userInfo.name}<br />
        email: {userInfo.email}<br />
        <input type="checkbox" onClick={() => setFullInfo(!fullInfo)} /> yes, include this information<br />
        <br />
        Do you want to also give write access to the resource? <br />
        <input type="checkbox" onClick={() => setAllowWrite(!allowWrite)} /> allow write access <br />
        <br />
        <button onClick={cancelSubmit}>Cancel</button> <button onClick={writeInfo}>OK</button>
      </form>
    </div>
  );
}

export default ContentChooser;
