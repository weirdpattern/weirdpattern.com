import * as React from "react";

/**
 * Properties for the Overlay component.
 * @typedef {Interface} Props
 * @property {boolean} active a flag indicating the overlay is active.
 *
 * @private
 * @interface
 */
interface Props {
  children: any;
}

/**
 * Overlay component.
 * @param {Props} props the properties of the component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the overlay.
 *
 * @public
 * @function
 */
export default function Overlay({
  children
}: Props): React.ReactElement<Props> {
  return <div className="overlay">{children}</div>;
}
