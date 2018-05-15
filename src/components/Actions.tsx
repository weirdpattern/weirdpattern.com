import * as React from "react";
import * as classNames from "classnames";

import ActionButton from "./ActionButton";
import { Action } from "../interfaces";

/**
 * Properties for the Actions component.
 * @typedef {Interface} Props
 * @property {boolean} actions an array of actions to be displayed.
 *
 * @private
 * @interface
 */
interface Props {
  actions: Array<Action>;
}

/**
 * State for the Actions component.
 * @typedef {Interface} State
 * @property {boolean} toggled
 *    a flag indicating whether the button has been toggled or not.
 *
 * @private
 * @interface
 */
interface State {
  toggled: boolean;
}

/**
 * Actions component.
 * @param {Props} props the properties of the component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the actions.
 *
 * @public
 * @function
 */
export default class Actions extends React.PureComponent<Props, State> {
  /**
   * Class constructor.
   * @param {Props} props the properties of the ActionButton.
   */
  public constructor(props: Props) {
    super(props);

    this.state = { toggled: false };
    this.mouseEnterHandler = this.mouseEnterHandler.bind(this);
    this.mouseLeaveHandler = this.mouseLeaveHandler.bind(this);
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    const actions = this.props.actions.slice();
    const { toggled } = this.state;

    const actionClasses = classNames("actions", {
      active: toggled
    });

    return (
      <div
        className={actionClasses}
        onMouseEnter={this.mouseEnterHandler}
        onMouseLeave={this.mouseLeaveHandler}
      >
        <ActionButton main={true} active={toggled} type={actions.shift()} />
        <ul>
          {actions.map((action: Action, index: number) => (
            <li key={index}>
              <ActionButton active={toggled} type={action} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  /**
   * Handles mouse enter events to enable the actions.
   * @returns {void}
   *
   * @private
   * @method
   */
  private mouseEnterHandler(): void {
    this.setState({ toggled: true });
  }

  /**
   * Handles mouse leave events to enable the actions.
   * @returns {void}
   *
   * @private
   * @method
   */
  private mouseLeaveHandler(): void {
    this.setState({ toggled: false });
  }
}
