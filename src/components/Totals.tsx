import * as React from "react";
import * as classNames from "classnames";

import DropdownButton from "./DropdownButton";
import { ValueCount } from "../interfaces";

/**
 * Properties for the Totals component.
 * @typedef {Interface} Props
 * @property {string} total the total number of posts.
 * @property {Array<ValueCount>} categories the categories.
 * @property {Array<ValueCount>} tags the tags.
 * @property {string} styling the style to be used.
 *
 * @private
 * @interface
 */
interface Props {
  total: number;
  categories: Array<ValueCount>;
  tags: Array<ValueCount>;
  styling: string;
  location?: string;
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
  styling,
  location,
  total,
  categories,
  tags
}: Props): React.ReactElement<Props> {
  const postTotalsClasses = classNames("post-totals", styling);

  return (
    <div className={postTotalsClasses}>
      <div className="totals">
        <span className="total">{total}</span>
        <span className="total-label">
          total entries {location && `in ${location}`}
        </span>
      </div>
      <div className="buttons">
        {categories.length + tags.length > 0 && (
          <ul>
            {categories.length > 0 && (
              <DropdownButton text="categories" data={categories} />
            )}
            {tags.length > 0 && <DropdownButton text="tags" data={tags} />}
          </ul>
        )}
      </div>
    </div>
  );
}
