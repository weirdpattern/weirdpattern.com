import * as React from "react";

import { Entry } from "../interfaces";

/**
 * Index properties.
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
 * Page component.
 *
 * @public
 * @class
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
