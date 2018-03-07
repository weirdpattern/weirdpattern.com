import * as React from "react";

import SummaryTotal from "./SummaryTotal";

/**
 * Summary props.
 * @typedef {Interface} Props
 * @property {number} posts the total number of posts.
 * @property {number} tips the total number of tips.
 *
 * @private
 * @interface
 */
interface Props {
  posts: number;
  tips: number;
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
  tips
}: Props): React.ReactElement<Props> {
  return (
    <div className="summary">
      <div className="container">
        <ul>
          <li>
            <SummaryTotal title="Total" value={posts + tips} />
          </li>
          <li>
            <SummaryTotal title="Posts" value={posts} />
          </li>
          <li>
            <SummaryTotal title="Tips" value={tips} />
          </li>
        </ul>
      </div>
    </div>
  );
}
