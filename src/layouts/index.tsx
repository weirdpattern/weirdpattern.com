import "../scss/main.scss";

import * as React from "react";
import Helmet from "react-helmet";

import Header from "../components/Header";
import { GraphResult, SiteMetadata } from "../interfaces";

/**
 * Layout props.
 * @typedef {GraphResult<SiteMetadata>} Props
 *
 * @private
 * @interface
 */
interface Props extends GraphResult<SiteMetadata> {}

/**
 * The layout of the site.
 *
 * @public
 * @class
 */
export default function Layout({ data, children }: Props): React.ReactNode {
  return (
    <React.Fragment>
      <Helmet>
        <meta name="description" content={data.site.metadata.description} />
      </Helmet>
      <div className="is-fluid">
        <Header title={data.site.metadata.title} />
      </div>
    </React.Fragment>
  );
}

/**
 * The query to be used to populate the properties.
 *
 * @public
 * @const
 */
export const query = graphql`
  query LayoutQuery {
    site {
      metadata: siteMetadata {
        title
        description
      }
    }
  }
`;
