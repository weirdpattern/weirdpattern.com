import * as React from "react";

/**
 * Properties for the Header component.
 * @typedef {Interface} Props
 * @property {string} text the text to be displayed
 * @property {string} year the year to be displayed
 *
 * @private
 * @interface
 */
interface Props {
  text: string;
  year: string;
}

/**
 * Social component.
 * @param {Props} props the properties of the component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the social.
 *
 * @public
 * @function
 */
export default function Intro({
  text,
  year
}: Props): React.ReactElement<Props> {
  return <span className="copyright">{`© ${text} ${year}`}</span>;
}
