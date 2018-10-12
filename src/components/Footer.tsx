import * as React from "react";

import Legal from "./Legal";
import Social from "./Social";

import { CopyrightMetadata, NetworksMetadata } from "../interfaces";

/**
 * Properties for the Header component.
 * @typedef {Interface} Props
 * @property {CopyrightMetadata} [copyright] the copyright information.
 * @property {NetworksMetadata} [networks] the networks of the author.
 *
 * @private
 * @interface
 */
interface Props {
  copyright?: CopyrightMetadata;
  networks?: NetworksMetadata;
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
      {props.copyright && (
        <Legal text={props.copyright.text} year={props.copyright.year} />
      )}
    </footer>
  );
}
