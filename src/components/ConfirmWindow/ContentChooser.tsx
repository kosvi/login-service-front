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
        <br />
        Do you want to also give write access to the resource? <br />
        allow write access <br />
        <button>Cancel</button> <button>OK</button>
      </form>
    </div>
  );
}

export default ContentChooser;
