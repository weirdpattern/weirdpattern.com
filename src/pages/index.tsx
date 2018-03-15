import * as React from "react";

import Summary from "../components/Summary";
import LatestEntries from "../components/LatestEntries";
import { GraphResult, Markdowns } from "../interfaces";

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

    const posts = markdowns.entries.filter(
      e => e.entry.content.category === "post"
    );

    const snippets = markdowns.entries.filter(
      e => e.entry.content.category === "snippet"
    );

    return (
      <section className="body">
        <Summary posts={posts.length} snippets={snippets.length} />
        <LatestEntries
          posts={{ entries: posts }}
          snippets={{ entries: snippets }}
        />
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
