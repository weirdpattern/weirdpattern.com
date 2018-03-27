import * as React from "react";

import { Entry } from "../interfaces";

/**
 * LatestEntries properties.
 * @typedef {Interface} Props
 * @param {Array<Entry>} entries the entries.
 *
 * @private
 * @interface
 */
interface Props {
  entries: Entry[];
}

/**
 * LatestEntries component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the latest entries.
 *
 * @public
 * @function
 */
export default function LatestEntries({
  entries
}: Props): React.ReactElement<Props> {
  return (
    <div className="latest-entries">
      {entries.slice(0, 5).map((entry: Entry, index: number) => {
        return (
          <div key={index} className={"entry " + entry.content.category}>
            <div>
              <h2>{entry.content.title}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}
