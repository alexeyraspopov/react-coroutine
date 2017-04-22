import React from 'react';

export default function SearchResults({ results }) {
  return results.length === 0 ? (
    <p>No results</p>
  ) : (
    <ul>
      {results.map((result) => (
        <li key={result.package.name}>
          <h3 className="package-name"><a href={result.package.links.npm} target="_blank">{result.package.name}</a> <small className="package-version">({result.package.version})</small></h3>
          <p className="package-description">{result.package.description}</p>
        </li>
      ))}
    </ul>
  );
}
