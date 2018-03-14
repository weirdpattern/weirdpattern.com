import * as React from "react";
import * as classNames from "classnames";

import Link from "gatsby-link";
import Search from "./Search";

const keys = ["Enter", "Spacebar", " "];
const codes = [13, 32];

/**
 * Header props.
 * @typedef {Interface} Props
 * @property {string} url the url of the website.
 * @property {string} title the title of the website.
 * @property {boolean} mobile
 *    a flag indicating the components is being rendered in mobile view.
 * @property {Function} openSearch opens the search dialog.
 *
 * @private
 * @interface
 */
interface Props {
  url: string;
  title: string;
  mobile: boolean;
  openSearch: Function;
}

/**
 * Header component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the header.
 *
 * @public
 * @function
 */
export default function Header({
  url,
  title,
  mobile,
  openSearch
}: Props): React.ReactElement<Props> {
  const openSearchKeydownHandler = (
    event: React.KeyboardEvent<HTMLSpanElement>
  ): void => {
    if (keys.indexOf(event.key) > -1 || codes.indexOf(event.keyCode) > -1) {
      openSearch();
    }

    event.preventDefault();
  };

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
              <span
                role="button"
                tabIndex={0}
                className="search fa fa-search"
                onClick={() => openSearch()}
                onKeyDown={e => openSearchKeydownHandler(e)}
              />
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
