import "../scss/main.css";

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
        <div className="container">
          <Sidebar
            title={config.site.title}
            sotial={config.social}
          />
          <Content />
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}
