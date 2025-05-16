import React from 'react';

export function StatusMessage({ type, children }) {
  return (
    <div className={`app-message${type ? ' ' + type : ''}`}>
      {children}
    </div>
  );
}
