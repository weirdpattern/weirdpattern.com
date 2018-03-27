import * as React from "react";
import * as data from "../../content/data.json";

import { Entry } from "../interfaces";

const config = data as any;
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Totals properties.
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
 * A counter.
 * @typedef {Interface} Counter
 *
 * @private
 * @interface
 */
interface Counter {
  [key: string]: number;
}

/**
 * Formats the total count.
 * @param {number} count the total count.
 * @param {number} limit the limit length of the number.
 * @param {string} suffix the suffix to be used.
 * @returns {string} the formatted number.
 */
function format(count: number, limit: number, suffix: string): string {
  const formatted = count.toLocaleString();
  return formatted.length > limit ? "1" + suffix : count.toLocaleString();
}

/**
 * Totals component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the totals.
 *
 * @public
 * @function
 */
export default function Totals({ entries }: Props): React.ReactElement<Props> {
  const categories: Counter = entries.reduce(
    (reduction: Counter, current: Entry) => {
      if (!hasOwnProperty.call(reduction, current.content.category)) {
        reduction[current.content.category] = 0;
      }

      reduction[current.content.category]++;
      return reduction;
    },
    {}
  );

  return (
    <div className="totals">
      <div
        className="total"
        style={{
          color: config.colors["total-fg"],
          backgroundColor: config.colors["total-bg"]
        }}
      >
        <span className="count">{format(entries.length, 9, "b+")}</span>
        <span className="description">total entries</span>
      </div>
      {Object.keys(categories).map((category: string, index: number) => {
        return (
          <div
            key={index}
            className="category"
            style={{
              color: config.colors[category + "-fg"],
              backgroundColor: config.colors[category + "-bg"]
            }}
          >
            <span className="count">
              {format(categories[category], 3, "k+")}
            </span>
            <span className="description">{category}</span>
          </div>
        );
      })}
    </div>
  );
}
