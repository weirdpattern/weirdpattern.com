import * as React from "react";
import * as data from "../../content/data.json";

import Totals from "../components/Totals";
import Social from "../components/Social";
import LatestEntries from "../components/LatestEntries";
import { GraphResult, Markdowns, Entry } from "../interfaces";

const config = data as any;

/**
 * Index properties.
 * @typedef {Interface} Props
 *
 * @private
 * @interface
 */
interface Props extends GraphResult<Markdowns> {}

/**
 * Page component.
 *
 * @public
 * @class
 */
export default class Index extends React.Component<Props, {}> {
  /** @inheritdoc */
  public render(): React.ReactNode {
    const { markdowns = { entries: [] } } = this.props.data;

    return (
      <section className="body">
        <div className="container">
          <div className="columns">
            <div className="column is-three-quarters">
              <LatestEntries entries={markdowns.entries.map(e => e.entry)} />
            </div>
            <div className="column is-one-quarter">
              <Totals entries={markdowns.entries.map(e => e.entry)} />
              <Social />
              <Archive entries={markdowns.entries.map(e => e.entry)} />
              <Tags entries={markdowns.entries.map(e => e.entry)} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export const query = graphql`
  query IndexQuery {
    markdowns: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      entries: edges {
        entry: node {
          excerpt
          content: frontmatter {
            title
            tags
            category
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
