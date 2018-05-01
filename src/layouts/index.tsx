import "prismjs/themes/prism-solarizedlight.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.min.js";

import "../scss/main.scss";
import "../scss/themes/prism-ayu-light.scss";

import * as React from "react";
import Helmet from "react-helmet";

import * as data from "../../content/data.json";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";

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
    this.searchHandler = this.searchHandler.bind(this);
    this.keydownHandler = this.keydownHandler.bind(this);
  }

  /** @inheritdoc */
  public componentDidMount(): void {
    window.addEventListener("keydown", this.keydownHandler);
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    const { children } = this.props;
    const { searching } = this.state;

    return (
      <div className="container-fluid">
        <div className="page">
          <Helmet>
            <title>{config.title}</title>
            <meta name="description" content={config.description} />
          </Helmet>
          <div className="sidepanel">
            <Header
              title={config.title}
              description={config.description}
              name={config.profile.name}
              email={config.profile.email}
              credentials={config.profile.credentials}
              avatar={config.profile.avatar}
            />
            <Footer
              networks={config.profile.networks}
              copyright={config.copyright}
            />
          </div>
          <div className="mainpanel">
            <Search
              searching={this.state.searching}
              search={this.searchHandler}
            />
            {children()}
          </div>
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
  private searchHandler(term: string): void {
    this.setState({ searching: true });
  }
}
