import * as React from "react";

import Link from "gatsby-link";

/**
 * Properties for the Header component.
 * @typedef {Interface} Props
 * @property {string} image the path to the image.
 * @property {string} description the alt description of the image.
 * @property {string} [link] the link to be used with the image.
 *
 * @private
 * @interface
 */
interface Props {
  image: string;
  description: string;
  link?: string;
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
export default function Avatar({
  image,
  description,
  link
}: Props): React.ReactElement<Props> {
  return (
    <Link to={link || "#"} className="avatar">
      <img src={image} alt={description} />
    </Link>
  );
}
