import * as React from "react";

import SummaryTotal from "./SummaryTotal";

/**
 * Summary props.
 * @typedef {Interface} Props
 * @property {number} posts the total number of posts.
 * @property {number} snippets the total number of snippets.
 *
 * @private
 * @interface
 */
interface Props {
  posts: number;
  snippets: number;
}

/**
 * Summary component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the summary.
 *
 * @public
 * @function
 */
export default function Summary({
  posts,
  snippets
}: Props): React.ReactElement<Props> {
  return (
    <div className="summary">
      <div className="container">
        <ul>
          <li>
            <SummaryTotal title="Total" value={posts + snippets} />
          </li>
          <li>
            <SummaryTotal title="Posts" value={posts} />
          </li>
          <li>
            <SummaryTotal title="Snippets" value={snippets} />
          </li>
        </ul>
      </div>
    </div>
  );
}
