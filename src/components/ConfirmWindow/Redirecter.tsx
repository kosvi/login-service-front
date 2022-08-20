import React from 'react';

function Redirecter({ url }: { url: string | undefined }) {
  if (!url) {
    return (
      <div>
        return url was not set
      </div>
    );
  }
  return (
    <div>
      {url}
    </div>
  );
}

export default Redirecter;
