import "../scss/main.scss";

import * as React from "react";
import Helmet from "react-helmet";

import * as data from "../../content/data.json";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";
import { isMobile } from "../utils";
import { GraphResult, Metadata } from "../interfaces";

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
 * @property {boolean} mobile a flag indicating mobile is active.
 * @property {bolean} searching a flag indicating search is active.
 *
 * @private
 * @interface
 */
interface State {
  mobile: boolean;
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

    this.state = { mobile: true, searching: false };
    this.resizeHandler = this.resizeHandler.bind(this);
    this.keydownHandler = this.keydownHandler.bind(this);
    this.openSearchHandler = this.openSearchHandler.bind(this);
    this.closeSearchHandler = this.closeSearchHandler.bind(this);
  }

  /** @inheritdoc */
  public componentDidMount() {
    this.resizeHandler();
    window.addEventListener("resize", this.resizeHandler);
    window.addEventListener("keydown", this.keydownHandler);
  }

  /** @inheritdoc */
  public componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler);
    window.removeEventListener("keydown", this.keydownHandler);
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    const { mobile, searching } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <meta name="description" content={config.description} />
        </Helmet>
        <div>
          {searching ? (
            <Search
              performSearch={this.search}
              closeSearch={this.closeSearchHandler}
            />
          ) : null}
          <Header title={config.title} mobile={mobile} />
          <Menu openSearch={this.openSearchHandler} />
          {this.props.children({ ...this.props, mobile })}
          <Footer profile={config.profile} />
        </div>
      </React.Fragment>
    );
  }

  /**
   * Updates the mobile state of the component.
   * @returns {void}
   *
   * @private
   * @method
   */
  private resizeHandler(): void {
    this.setState({ mobile: isMobile(window.outerWidth) });
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
