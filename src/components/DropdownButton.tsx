import * as React from "react";

import Link from "gatsby-link";
import { kebabCase } from "lodash";

import { ValueCount } from "../interfaces";

/**
 * Properties for the DropdownButton component.
 * @typedef {Interface} Props
 * @property {string} text the text to be displayed.
 * @property {Array<ValueCount>} data the source of the dropdown button.
 *
 * @private
 * @interface
 */
interface Props {
  text: string;
  data: Array<ValueCount>;
}

/**
 * State for the DropdownButton component.
 * @typedef {Interface} Props
 * @property {boolean} expanded
 *   a flag indicating whether the dropdown is open or not.
 *
 * @private
 * @interface
 */
interface State {
  expanded: boolean;
}

/**
 * DropdownButton component.
 * @param {Props} props the properties of the component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the dropdown button.
 *
 * @public
 * @function
 */
export default function DropdownButton(
  props: Props
): React.ReactElement<Props> {
  const { text, data } = props;

  const sorted = data.sort(
    (a: ValueCount, b: ValueCount): number => {
      return b.totalCount - a.totalCount;
    }
  );

  return (
    <li className="dropdown">
      <div className="dropdown-button">
        <span className="total">{data.length}</span>
        <span className="total-label">{text}</span>
        <i className="arrow-down" />
      </div>
      <div className="dropdown-list">
        <div className="dropdown-list-scroll">
          <ul>
            {sorted.map((item: ValueCount, index: number) => {
              return (
                <li key={index}>
                  <Link
                    to={
                      "/" +
                      text +
                      "/" +
                      encodeURIComponent(kebabCase(item.fieldValue))
                    }
                  >
                    {item.fieldValue} ({item.totalCount})
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </li>
  );
}
