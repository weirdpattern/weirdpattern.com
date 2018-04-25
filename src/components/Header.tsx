import * as React from "react";

/**
 * Properties for the Header component.
 * @typedef {Interface} Props
 * @property {string} title the title of the blog.
 * @property {string} description the description of the blog.
 * @property {string} name the name of the author.
 * @property {string} email the email of the author.
 * @property {string} credentials the credentials of the author.
 * @property {string} avatar the avatar of the author.
 *
 * @private
 * @interface
 */
interface Props {
  title: string;
  description: string;
  name: string;
  email: string;
  credentials: string;
  avatar: string;
}

/**
 * Header component.
 * @param {Props} props the properties of the component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the header.
 *
 * @public
 * @function
 */
export default function Header(props: Props): React.ReactElement<Props> {
  return (
    <header className="col-sm-4">
      <a href="/about" className="avatar">
        <img src={props.avatar} alt={props.name} />
      </a>
    </header>
  );
}
