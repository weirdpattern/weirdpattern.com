import * as React from "react";

import { Action } from "../interfaces";
import { getCommonActions } from "../utils";

/**
 * Properties of the NotFoundPage.
 * @typedef {Interface} Props
 * @property {Function} onUpdateActions a callback for scroll events.
 *
 * @private
 * @interface
 */
interface Props {
  location: { pathname: string };
  onUpdateActions: (actions: Array<Action>) => void;
}

/**
 * NotFoundPage component
 * @returns {void}
 *
 * @public
 * @function
 */
export default class NotFoundPage extends React.PureComponent<Props, {}> {
  /**
   * Class constructor.
   * @param {Props} props the properties of the component.
   */
  public constructor(props: Props) {
    super(props);

    // NOTE: this is a bug in gatsbyjs (https://github.com/gatsbyjs/gatsby/issues/3504)
    if (this.props && this.props.onUpdateActions) {
      this.props.onUpdateActions(getCommonActions("home", "report", "search"));
    }
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    return (
      <div className="not-found">
        <div className="middle-center">
          <h1>404</h1>
          <p>Ooops... I can&apos;t find the page you are looking for</p>
        </div>
      </div>
    );
  }
}
