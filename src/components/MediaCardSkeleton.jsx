import React from 'react';

function MediaCardSkeleton({ animation }) {
  return <div className={`p-4 rounded ${animation} h-40`}></div>;
}

export default MediaCardSkeleton;
