import * as React from "react";

import { Metadata } from "../interfaces";

interface Props extends Pick<Metadata, "profile"> {}

/**
 * Footer component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the footer.
 *
 * @public
 * @function
 */
export default function Footer({ profile }: Props): React.ReactElement<Props> {
  return (
    <section className="footer">
      <div className="container">
        <div className="copyright">
          © Copyright 2018,&nbsp;
          <a href={"mailto:" + profile.email}>{profile.name}</a>
        </div>
      </div>
    </section>
  );
}
