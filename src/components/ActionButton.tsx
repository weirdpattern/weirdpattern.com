import * as React from "react";
import * as classNames from "classnames";

import { Action } from "../interfaces";

/**
 * Properties for the Header component.
 * @typedef {Interface} Props
 * @property {Action} type the type of button to render.
 * @property {boolean} [main] whether this is the main action.
 * @property {boolean} [active] whether the button is active or not.
 *
 * @private
 * @interface
 */
interface Props {
  type: Action;
  main?: boolean;
  active?: boolean;
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
export default function ActionButton({
  type,
  active,
  main = false
}: Props): React.ReactElement<Props> {
  const buttonClasses = classNames("action-button", type.name, {
    main,
    active,
    large: main
  });

  return (
    <button className={buttonClasses} onClick={() => type.callback()}>
      <i />
    </button>
  );
}
