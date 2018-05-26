import * as React from "react";

/**
 * Properties for the Header component.
 * @typedef {Interface} Props
 * @property {string} name the name of the site.
 * @property {string} [credentials] the credentials of the author.
 *
 * @private
 * @interface
 */
interface Props {
  name: string;
  credentials?: string;
}

/**
 * Avatar component.
 * @param {Props} props the properties of the component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the avatar.
 *
 * @public
 * @function
 */
export default function Intro({
  name,
  credentials
}: Props): React.ReactElement<Props> {
  return (
    <div className="intro">
      <h3>{name}</h3>
      {credentials && <span className="credentials">{credentials}</span>}
    </div>
  );
}
