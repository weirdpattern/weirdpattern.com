import "../scss/main.scss";

import * as React from "react";

import Link from "gatsby-link";
import Helmet from "react-helmet";
import config from "../site-config";
import Sidebar from "../components/Sidebar";

export default class Layout extends React.PureComponent<{}, {}> {
  public render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <meta name="description" content={config.site.description} />
        </Helmet>
        <div className="top-line" />
        <div className="container columns">
          <Sidebar title={config.site.title} social={config.social} />
        </div>
      </React.Fragment>
    );
  }
}
