import * as React from "react";
import * as classNames from "classnames";

import Link from "gatsby-link";

import { SearchPost } from "../interfaces";

/**
 * Properties for the SearchResults component.
 * @typedef {Interface} Props
 * @property {string} results the results of the search.
 * @property {Function} close closes the search.
 *
 * @private
 * @interface
 */
interface Props {
  results: Array<SearchPost>;
  close: Function;
}

/**
 * Sorts based on dates and titles.
 * @param {SearchPost} a the first post to be sorted.
 * @param {SearchPost} b the second post to be sorted.
 * @returns {number} the sorting position.
 *
 * @private
 * @function
 */
function sort(a: SearchPost, b: SearchPost): number {
  const dateAParts = a.date.split("-");
  const dateA = new Date(
    Number(dateAParts[0]),
    Number(dateAParts[1]) - 1,
    Number(dateAParts[2])
  );

  const dateBParts = b.date.split("-");
  const dateB = new Date(
    Number(dateBParts[0]),
    Number(dateBParts[1]) - 1,
    Number(dateBParts[2])
  );

  if (dateA.getTime() > dateB.getTime()) return -1;
  if (dateA.getTime() < dateB.getTime()) return 1;

  return a.title.localeCompare(b.title);
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
  results,
  close
}: Props): React.ReactElement<Props> {
  const styles = results
    .reduce((aggregator: Array<string>, current: SearchPost): Array<string> => {
      if (aggregator.indexOf(current.style) === -1) {
        aggregator.push(current.style);
      }
      return aggregator;
    }, [])
    .sort();

  return (
    <div className="search-results">
      {styles.map((style: string, keyStyles: number) => {
        return (
          <ul key={keyStyles}>
            {results
              .filter((result: SearchPost) => result.style === style)
              .sort(sort)
              .map((result: SearchPost, keyResults: number) => {
                const dateParts = result.date.split("-");
                const date = new Date(
                  Number(dateParts[0]),
                  Number(dateParts[1]) - 1,
                  Number(dateParts[2])
                );

                return (
                  <li key={keyResults} className={style}>
                    <Link to={result.url} onClick={() => close()}>
                      {result.title}
                    </Link>
                  </li>
                );
              })}
          </ul>
        );
      })}
    </div>
  );
}
