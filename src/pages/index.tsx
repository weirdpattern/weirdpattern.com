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
    const postEdges = this.props.data.posts.edges;
    return (
      <React.Fragment>
        <span>Here</span>
        <span>{postEdges[0].node.fields.slug}</span>
      </React.Fragment>
    );
  }
}

export const query = graphql`
  query IndexQuery {
    posts: allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
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
            cover
            date
          }
        }
      }
    }
  }
`;
