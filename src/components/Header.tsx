import * as React from "react";
import * as classNames from "classnames";

import { isMobile } from "../utils";
import { SocialMedia, SocialMedias } from "../interfaces";

/**
 * Header props.
 * @typedef {Interface} Props
 * @property {string} title the title of the website.
 *
 * @private
 * @interface
 */
interface Props {
  title: string;
}

/**
 * Header state.
 * @typedef {Interface} State
 * @property {number} width the width of the page.
 *
 * @private
 * @interface
 */
interface State {
  width: number;
}

/**
 * Sidebar component.
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

    this.state = { width: window.innerWidth };
    this.updateWidth = this.updateWidth.bind(this);
  }

  /** @inheritdoc */
  public componentDidMount() {
    window.addEventListener("resize", this.updateWidth);
  }

  /** @inheritdoc */
  public componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }

  /** @inheritdoc */
  public render() {
    const { title } = this.props;
    const mobile = isMobile(this.state.width);

    const levelRightClass = classNames("level-right", {
      "has-text-centered": mobile
    });

    const titleClass = classNames("title", {
      "has-text-left": !mobile,
      "has-text-centered": mobile
    });

    return (
      <React.Fragment>
        <div className="top-border is-fixed-top" />
        <div className="header">
          <div className="container level">
            <div className="level-left">
              <h1 className={titleClass}>
                <a href="https://weirdpattern.com">{title}</a>
              </h1>
            </div>
            <div className={levelRightClass}>
              <a href="https://weirdpattern.com" className="page">
                Home
              </a>
              <a href="https://weirdpattern.com/Blog" className="page">
                Blog
              </a>
              <a href="https://weirdpattern.com/About" className="page">
                About
              </a>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  /**
   * Updates the width of the component.
   * @returns {void}
   *
   * @private
   * @method
   */
  private updateWidth(): void {
    this.setState({ width: window.outerWidth });
  }
}
