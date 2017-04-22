import React from 'react';

export default function ErrorMessage({ error }) {
  return (
    <details>
      <summary>Something went wrong!</summary>
      <p>{error.message}</p>
    </details>
  );
}
