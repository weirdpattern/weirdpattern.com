import * as React from "react";

/**
 * SummaryTotal props.
 * @typedef {Interface} Props
 * @property {string} title the title of the summary total.
 * @property {number} value the value of the summary total.
 *
 * @private
 * @interface
 */
interface Props {
  title: string;
  value: number;
}

/**
 * SummaryTotal component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the summary total.
 *
 * @public
 * @function
 */
export default function SummaryTotal({
  title,
  value
}: Props): React.ReactElement<Props> {
  return (
    <span className="summary-box">
      <span className="title">{title}</span>
      <span className="total">{value}</span>
    </span>
  );
}
