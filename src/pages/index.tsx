import * as React from "react";

/**
 * Index properties.
 * @typedef {Interface} Props
 * @property {Data} data the gatsby data.
 *
 * @private
 * @interface
 */
interface Props {
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          fields: {
            slug: string;
          };
          excerpt: string;
          timeToRead: string;
          frontmatter: {
            title: string;
            tags: string[];
            cover: string;
            date: Date;
          };
        };
      };
    };
  };
}

/**
 * Page component.
 *
 * @public
 * @class
 */
export default class Index extends React.Component<Props, {}> {
  /**
   * Class constructor.
   * @param {Props} props the properties.
   *
   * @public
   * @constructor
   */
  public constructor(props: Props) {
    super(props);
  }

  /** @inheritdoc */
  public render() {
    const postEdges = this.props.data.allMarkdownRemark.edges;
    return null;
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
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
          frontmatter {
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
