import * as React from "react";
import * as classNames from "classnames";

import Link from "gatsby-link";
import Search from "./Search";

const keys = ["Enter", "Spacebar", " "];
const codes = [13, 32];

/**
 * Header props.
 * @typedef {Interface} Props
 * @property {string} title the title of the website.
 * @property {boolean} mobile
 *    a flag indicating the components is being rendered in mobile view.
 *
 * @private
 * @interface
 */
interface Props {
  title: string;
  mobile: boolean;
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
  title,
  mobile
}: Props): React.ReactElement<Props> {
  const bannerClass = classNames("banner", {
    "banner-mobile": mobile,
    "banner-desktop": !mobile
  });

  return (
    <section>
      <div className="top-border is-fixed-top" />
      <div className="header">
        <div className="container">
          <div className={bannerClass}>
            <div>
              <span>
                <Link to="/" className="title">
                  {title}
                </Link>
              </span>
              <span className="subtitle">
                Architecting in the weirdest possible way
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
