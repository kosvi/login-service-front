import React from 'react';

function Redirecter({ url }: { url: string | undefined }) {
  if (!url) {
    return (
      <div>
        return url was not set
      </div>
    );
  }
  window.location.replace(url);
  return (
    <div>
      {url}
    </div>
  );
}

export default Redirecter;
