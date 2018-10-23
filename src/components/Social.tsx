import * as React from "react";

import { NetworkMetadata } from "../interfaces";

/**
 * Properties for the Social component.
 * @typedef {Interface} Props
 * @property {Array<NetworkMetadata>} networks the networks of the author.
 *
 * @private
 * @interface
 */
interface Props {
  networks: Array<NetworkMetadata>;
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
      {networks.length &&
        networks.map((network: NetworkMetadata, index: number) => (
          <li key={index}>
            <a href={network.link} className={network.id}>
              <span className="label">{network.name}</span>
            </a>
          </li>
        ))}
    </ul>
  );
}
