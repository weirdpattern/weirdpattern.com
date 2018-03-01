import "../scss/main.scss";

import * as React from "react";
import Helmet from "react-helmet";

import config from "../site-config";
import Header from "../components/Header";

export default class Layout extends React.PureComponent<{}, {}> {
  public render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <meta name="description" content={config.site.description} />
        </Helmet>
        <div className="is-fluid">
          <Header title={config.site.title} />
        </div>
      </React.Fragment>
    );
  }
}
