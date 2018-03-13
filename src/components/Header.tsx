import * as React from "react";
import * as classNames from "classnames";

import Link from "gatsby-link";
import { isMobile } from "../utils";

/**
 * Header props.
 * @typedef {Interface} Props
 * @property {string} url the url of the website.
 * @property {string} title the title of the website.
 *
 * @private
 * @interface
 */
interface Props {
  url: string;
  title: string;
}

/**
 * Header state.
 * @typedef {Interface} State
 * @property {boolean} mobile a flag indicating mobile is active.
 *
 * @private
 * @interface
 */
interface State {
  mobile: boolean;
}

/**
 * Header component.
 *
 * @public
 * @class
 */
export default class Header extends React.PureComponent<Props, State> {
  /**
   * Class constructor.
   * @param {Props} props the properties.
   *
   * @public
   * @constructor
   */
  public constructor(props: Props) {
    super(props);

    this.state = { mobile: true };
    this.resizeHandler = this.resizeHandler.bind(this);
  }

  /** @inheritdoc */
  public componentDidMount() {
    this.resizeHandler();
    window.addEventListener("resize", this.resizeHandler);
  }

  /** @inheritdoc */
  public componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler);
  }

  /** @inheritdoc */
  public render() {
    const { url, title } = this.props;
    const mobile = this.state.mobile;

    const columnRightClass = classNames("column", {
      "has-text-right": !mobile,
      "has-text-centered": mobile,
      "no-padding": mobile
    });

    const columnLeftClass = classNames("column", {
      "has-text-left": !mobile,
      "has-text-centered": mobile,
      "no-padding": mobile
    });

    return (
      <section>
        <div className="top-border is-fixed-top" />
        <div className="header">
          <div className="container">
            <div className="columns">
              <div className={columnLeftClass}>
                <h1 className="title">
                  <a href={url}>{title}</a>
                </h1>
              </div>
              <nav className={columnRightClass}>
                <Link to="Blog" className="page">
                  Blog
                </Link>
                <Link to="Snippets" className="page">
                  Snippets
                </Link>
                <Link to="About" className="page">
                  About
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /**
   * Updates the width of the component.
   * @returns {void}
   *
   * @private
   * @method
   */
  private resizeHandler(): void {
    this.setState({ mobile: isMobile(window.outerWidth) });
  }
}
