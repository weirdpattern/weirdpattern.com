import * as React from "react";

/**
 * Index properties.
 * @typedef {Interface} Props
 *
 * @private
 * @interface
 */
interface Props {}

/**
 * Page component.
 *
 * @public
 * @class
 */
export default class Index extends React.Component<Props, {}> {
  /** @inheritdoc */
  public render(): React.ReactNode {
    return <span>Hello</span>;
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
