import "../scss/main.scss";

import * as React from "react";
import Helmet from "react-helmet";

import * as data from "../../content/data.json";
import Header from "../components/Header";
import { isMobile } from "../utils";

const config = data as any;

/**
 * Layout props.
 * @typedef {Interface} Props
 * @property {*} children the children function renderer.
 *
 * @private
 * @interface
 */
interface Props {
  children: any;
}

/**
 * Header state.
 * @typedef {Interface} State
 * @property {bolean} searching a flag indicating search is active.
 *
 * @private
 * @interface
 */
interface State {
  searching: boolean;
}

/**
 * Layout of the site.
 * @param {Function} children the children.
 * @returns {React.ReactNode} the react node that represents the layout.
 *
 * @public
 * @function
 */
export default class Layout extends React.PureComponent<Props, State> {
  /**
   * Class constructor.
   * @param {Props} props the properties of the layout.
   */
  public constructor(props: Props) {
    super(props);

    this.state = { searching: false };
    this.openSearchHandler = this.openSearchHandler.bind(this);
    this.closeSearchHandler = this.closeSearchHandler.bind(this);
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    const { children } = this.props;
    const { searching } = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <Helmet>
            <title>{config.title}</title>
            <meta name="description" content={config.description} />
          </Helmet>
          <Header />
          {children()}
        </div>
      </div>
    );
  }

  /**
   * Looks for search activation keys.
   * @param {React.KeyboardEvent<HTMLElement>} event the event.
   * @returns {void}
   *
   * @private
   * @method
   */
  private keydownHandler(event: KeyboardEvent): void {
    if (
      event.altKey &&
      event.shiftKey &&
      (event.key === "S" || event.keyCode === 83)
    ) {
      this.setState({ searching: true });
    }
  }

  /**
   * Performs a search.
   * @param {string} term the term to be searched.
   * @returns {void}
   *
   * @private
   * @method
   */
  private search(term: string): void {}

  /**
   * Activates the searching state of the component.
   * @returns {void}
   *
   * @private
   * @method
   */
  private openSearchHandler(): void {
    this.setState({ searching: true });
  }

  /**
   * Cancels the searching state of the component.
   * @returns {void}
   *
   * @private
   * @method
   */
  private closeSearchHandler(): void {
    this.setState({ searching: false });
  }
}
