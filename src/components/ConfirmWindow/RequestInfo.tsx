import React from 'react';

function RequestInfo({ clientName, resourceName }: { clientName: string, resourceName: string }) {
  return (
    <div>
      <b>{clientName}</b> is requesting access to <b>{resourceName}</b><br />
    </div>
  );
}

export default RequestInfo;
