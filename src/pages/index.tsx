import * as React from "react";

import { GraphResult, Posts } from "../interfaces";

/**
 * Index properties.
 * @typedef {Interface} Props
 *
 * @private
 * @interface
 */
interface Props extends GraphResult<Posts> {}

/**
 * Page component.
 *
 * @public
 * @class
 */
export default class Index extends React.Component<Props, {}> {
  /** @inheritdoc */
  public render(): React.ReactNode {
    const posts = this.props.data.posts.edges;
    return posts.map((post, index) => {
      return (
        <span key={index} style={{ display: "block" }}>
          {post.node.content.title} in {post.node.content.category}
        </span>
      );
    });
  }
}

export const query = graphql`
  query IndexQuery {
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: "blog" } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          content: frontmatter {
            title
            tags
            category
            cover
            date
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
          fields {
            slug
          }
          excerpt
          content: frontmatter {
            title
            tags
            category
            date
          }
        }
      }
    }
  }
`;
