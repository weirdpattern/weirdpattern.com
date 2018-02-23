import "./index.css";

import * as React from "react";

import Link from "gatsby-link";
import Helmet from "react-helmet";
import config from "../site-config";

export default class Layout extends React.PureComponent<{}, {}> {
  public render() {
    const { children } = this.props;
    return (
      <div>
        <Helmet>
          <meta name="description" content={config.site.description} />
        </Helmet>
        <Header config={config} />
        <div className="main-container">{children}</div>
        <Footer config={config} />
      </div>
    );
  }
}
