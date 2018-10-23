import * as React from "react";

import { graphql } from "gatsby";

import Layout from "../components/Layout";
import { LayoutProps, Query } from "../interfaces";

/**
 * Properties of the NotFoundPage.
 * @typedef {Interface} Props
 * @property {{ pathname: string }} location the location of the page.
 *
 * @private
 * @interface
 */
interface Props extends Query<LayoutProps> {
  location: { pathname: string };
}

/**
 * NotFoundPage component
 * @param {Props} props the properties of the component.
 * @returns {React.ReactNode} the NotFoundPage component.
 *
 * @public
 * @function
 */
export default function NotFoundPage(props: Props): React.ReactElement<Props> {
  return (
    <Layout
      index={props.data.search.index}
      metadata={props.data.site.metadata}
      supportedActions={["home", "report", "search"]}
    >
      <div className="not-found">
        <div className="middle-center">
          <h1>404</h1>
          <p>
            Ooops... I can&apos;t find the page you need. I&apos;m truly sorry!
          </p>
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  {
    site {
      ...SiteMetadataFragment
    }
    search: siteSearchIndex {
      index
    }
  }
`;
