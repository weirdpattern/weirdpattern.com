import * as React from "react";

import DropdownButton from "./DropdownButton";

/**
 * Properties for the Totals component.
 * @typedef {Interface} Props
 * @property {string} total the total number of posts.
 * @property {Array<string>} categories the categories.
 * @property {Array<string>} tags the tags.
 *
 * @private
 * @interface
 */
interface Props {
  total: number;
  categories: Array<string>;
  tags: Array<string>;
}

/**
 * Totals component.
 * @param {Props} props the properties of the component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the totals.
 *
 * @public
 * @function
 */
export default function Totals({
  total,
  categories,
  tags
}: Props): React.ReactElement<Props> {
  return (
    <div className="post-totals">
      <div className="totals">
        <span className="total">{total}</span>
        <span className="total-label">total entries</span>
      </div>
      <div className="buttons">
        {categories.length + tags.length > 0 ? (
          <ul>
            {categories.length > 0 ? (
              <DropdownButton text="categories" data={categories} />
            ) : null}
            {tags.length > 0 ? (
              <DropdownButton text="tags" data={tags} />
            ) : null}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
