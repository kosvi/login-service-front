import React, { useState } from 'react';
import { UserInfo } from '../../types';

interface ContentChooserProps {
  userInfo: UserInfo | undefined,
  getCode: (fullInfo: boolean, allowWrite: boolean) => Promise<void>
}

function ContentChooser({ userInfo, getCode }: ContentChooserProps) {

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
    getCode(fullInfo, allowWrite);
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
        <br />
        uid: {userInfo.uid}<br />
        username: {userInfo.username}<br />
        <br />
        Following additional information is passed if you choose so:<br />
        name: {userInfo.name}<br />
        email: {userInfo.email}<br />
        <input id="fullInfo" type="checkbox" onClick={() => setFullInfo(!fullInfo)} /><label htmlFor="fullInfo">yes, include this information</label><br />
        <br />
        Do you want to also give write access to the resource? <br />
        <input id="allowWrite" type="checkbox" onClick={() => setAllowWrite(!allowWrite)} /><label htmlFor="allowWrite">allow write access</label><br />
        <br />
        <button onClick={cancelSubmit}>Cancel</button> <button onClick={writeInfo}>OK</button>
      </form>
    </div>
  );
}

export default ContentChooser;
