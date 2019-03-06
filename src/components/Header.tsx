import * as React from "react";

import Avatar from "./Avatar";
import Intro from "./Intro";

/**
 * Properties for the Header component.
 * @typedef {Interface} Props
 * @property {string} title the title of the blog.
 * @property {string} description the description of the blog.
 * @property {string} name the name of the author.
 * @property {string} email the email of the author.
 * @property {string} avatar the avatar of the author.
 * @property {string} [biography] the biography of the author.
 * @property {string} [credentials] the credentials of the author.
 *
 * @private
 * @interface
 */
interface Props {
  title: string;
  description: string;
  name: string;
  email: string;
  avatar: string;
  credentials?: string;
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
    <header className="header">
      <Avatar image={props.avatar} description={props.name} link="#" />
      <Intro name={props.name} credentials={props.credentials} />
    </header>
  );
}
