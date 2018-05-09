import * as React from "react";

import ActionButton from "./ActionButton";

/**
 * Properties for the Actions component.
 * @typedef {Interface} Props
 * @property {string} defaultAction the default action.
 * @property {boolean} actions an array of actions to be displayed.
 *
 * @private
 * @interface
 */
interface Props {
  defaultAction: string;
  actions: Array<string>;
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
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    const { actions, defaultAction } = this.props;

    return (
      <div className="action">
        <ActionButton main={true} className={defaultAction} />
        <ul>
          {actions.map((action: string, index: number) => (
            <li key={index}>
              <ActionButton main={false} className={action} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
