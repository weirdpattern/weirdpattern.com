import * as React from "react";

import Summary from "../components/Summary";
import LatestEntries from "../components/LatestEntries";
import { GraphResult, Posts, Tips } from "../interfaces";

/**
 * Index properties.
 * @typedef {Interface} Props
 *
 * @private
 * @interface
 */
interface Props extends GraphResult<Posts & Tips> {}

/**
 * Page component.
 *
 * @public
 * @class
 */
export default class Index extends React.Component<Props, {}> {
  /** @inheritdoc */
  public render(): React.ReactNode {
    const { posts, tips } = this.props.data;
    return (
      <section className="body">
        <Summary posts={posts.totalCount} tips={tips.totalCount} />
        <LatestEntries posts={posts} tips={tips} />
      </section>
    );
  }
}

export const query = graphql`
  query IndexQuery {
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: "blog" } } }
    ) {
      totalCount
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
    tips: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: "tip" } } }
    ) {
      totalCount
      edges {
        node {
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
