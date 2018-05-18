import * as React from "react";

/**
 * Properties for the SearchResults component.
 * @typedef {Interface} Props
 * @property {string} results the results of the search.
 *
 * @private
 * @interface
 */
interface Props {
  results: Array<any>;
}

/**
 * SearchResults component.
 * @param {Props} props the properties of the component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the search results.
 *
 * @public
 * @function
 */
export default function SearchResults({
  results
}: Props): React.ReactElement<Props> {
  return (
    <div className="search-results">
      <ul>
        {results.map((result: any, index: number) => {
          return <li key={index}>{result.title}</li>;
        })}
      </ul>
    </div>
  );
}
