import * as React from "react";
import * as classNames from "classnames";

import Link from "gatsby-link";

import { SearchPost } from "../interfaces";

/**
 * Properties for the SearchResults component.
 * @typedef {Interface} Props
 * @property {string} results the results of the search.
 *
 * @private
 * @interface
 */
interface Props {
  results: Array<SearchPost>;
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
  results = results.sort((a: SearchPost, b: SearchPost) => {
    let sort = a.style.localeCompare(b.style);

    if (sort === 0) {
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
    }

    sort = a.title.localeCompare(b.title);

    return sort;
  });

  return (
    <div className="search-results">
      <ul>
        {results.map((result: any, index: number) => {
          const dateParts = result.date.split("-");
          const date = new Date(
            Number(dateParts[0]),
            Number(dateParts[1]) - 1,
            Number(dateParts[2])
          );

          const resultClasses = classNames("style", {
            post: result.style === "post",
            snippet: result.style === "snippet"
          });

          return (
            <li key={index}>
              <div className={resultClasses}>
                <div>
                  <h3>
                    <Link to={result.url}>{result.title}</Link>
                  </h3>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
