import * as React from "react";

import { Entries } from "../interfaces";

/**
 * LatestEntries props
 * @typedef {Interface} Props
 * @property {Entries} posts the latest posts.
 * @property {Entries} tips the latest tips.
 *
 * @private
 * @interface
 */
interface Props {
  posts: Entries;
  tips: Entries;
}

/**
 * LatestEntries component
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the latest entries.
 *
 * @public
 * @function
 */
export default function LatestEntries({
  posts,
  tips
}: Props): React.ReactElement<Props> {
  return (
    <div className="latest-news">
      <div className="container">
        <div className="columns">
          <div className="column">
            Latest Posts
          </div>
          <div className="column">
            Latest Tips
          </div>
        </div>
      </div>
    </div>
  );
}
