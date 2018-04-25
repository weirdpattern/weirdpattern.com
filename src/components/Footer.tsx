import * as React from "react";

import Social from "./Social";
import Copyright from "./Copyright";

import { Copyrights, SocialNetworks } from "../interfaces";

/**
 * Properties for the Header component.
 * @typedef {Interface} Props
 * @property {SocialNetworks} [networks] the social networks of the author.
 * @property {string} [copyright] the copyright information.
 *
 * @private
 * @interface
 */
interface Props {
  networks?: SocialNetworks;
  copyright?: Copyrights;
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
    <footer className="footer">
      {props.networks && <Social networks={props.networks} />}
      <Copyright text={props.copyright.text} year={props.copyright.year} />
    </footer>
  );
}
