import * as React from "react";

import Link from "gatsby-link";
import Search from "./Search";

const keys = ["Enter", "Spacebar", " "];
const codes = [13, 32];

/**
 * Menu props.
 * @typedef {Interface} Props
 *
 * @private
 * @interface
 */
interface Props {
  openSearch: Function;
}

/**
 * Header component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the menu.
 *
 * @public
 * @function
 */
export default function Menu({ openSearch }: Props): React.ReactElement<Props> {
  const openSearchKeydownHandler = (
    event: React.KeyboardEvent<HTMLSpanElement>
  ): void => {
    if (keys.indexOf(event.key) > -1 || codes.indexOf(event.keyCode) > -1) {
      openSearch();
    }
    event.preventDefault();
  };

  return (
    <section className="menubar">
      <div className="container">
        <nav className="left">
          <Link to="Posts" className="menu">
            Posts
          </Link>
          <Link to="Snippets" className="menu">
            Snippets
          </Link>
          <Link to="About" className="menu">
            About
          </Link>
        </nav>
        <nav className="right">
          <span
            role="button"
            tabIndex={0}
            className="search fa fa-search"
            onClick={() => openSearch()}
            onKeyDown={e => openSearchKeydownHandler(e)}
          />
        </nav>
      </div>
    </section>
  );
}
