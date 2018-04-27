import * as React from "react";

import { SocialNetwork, SocialNetworks } from "../interfaces";

/**
 * Properties for the Header component.
 * @typedef {Interface} Props
 * @property {string} networks the networks of the author.
 *
 * @private
 * @interface
 */
interface Props {
  networks: SocialNetworks;
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
export default function Social({ networks }: Props): React.ReactElement<Props> {
  return (
    <ul className="social">
      {Object.keys(networks).map((name: string, index: number) => {
        const network: SocialNetwork = networks[name];
        return (
          <li key={index}>
            <a href={network.link} className={name}>
              <span className="label">{network.name}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
