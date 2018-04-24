import * as React from "react";

/**
 * Header props.
 * @typedef {Interface} Props
 * @property {string} title the title of the website.
 *
 * @private
 * @interface
 */
interface Props {
  title: string;
}

/**
 * Header component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the header.
 *
 * @public
 * @function
 */
export default function Header({ title }: Props): React.ReactElement<Props> {
  return (
    <header className="col-sm-4">Hi</header>
  );
}
