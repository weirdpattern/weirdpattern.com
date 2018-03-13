import * as React from "react";

import { Entries } from "../interfaces";

/**
 * LatestEntries props
 * @typedef {Interface} Props
 * @property {Entries} posts the latest posts.
 * @property {Entries} snippets the latest snippets.
 *
 * @private
 * @interface
 */
interface Props {
  posts: Entries;
  snippets: Entries;
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
  snippets
}: Props): React.ReactElement<Props> {
  return (
    <div className="latest-news">
      <div className="container">
        <div className="columns">
          <div className="column">Latest Posts</div>
          <div className="column">Latest Snippets</div>
        </div>
      </div>
    </div>
  );
}
