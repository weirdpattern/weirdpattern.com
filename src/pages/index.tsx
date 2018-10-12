import * as React from "react";

import Helmet from "react-helmet";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import Totals from "../components/Totals";
import { Query, IndexProps } from "../interfaces";

/**
 * Properties of the index page.
 * @typedef {Query<IndexProps>} Props
 *
 * @private
 * @interface
 */
interface Props extends Query<IndexProps> {}

/**
 * State of the index page.
 * @typedef {Interface} State
 * @property {boolean} scrolled a flag indicating the page has been scrolled.
 *
 * @private
 * @interface
 */
interface State {
  scrolled: boolean;
}

/**
 * Index component
 * @param {Props} props the properties of the component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the component.
 *
 * @public
 * @class
 */
export default class Index extends React.PureComponent<Props, State> {
  /**
   * Class constructor.
   * @param {Props} props the properties of the page.
   */
  public constructor(props: Props) {
    super(props);
    this.state = { scrolled: false };
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    const { site, copyright, author } = this.props.data.site.metadata;
    const { posts, categories, tags } = this.props.data.markdown;

    return (
      <Layout
        index={this.props.data.search.index}
        site={site}
        copyright={copyright}
        author={author}
      >
        <Helmet>
          <title>Dashboard | {site.title}</title>
          <meta name="description" content={site.description} />
          <meta name="keywords" content={site.keywords.join(",")} />
        </Helmet>
        <Totals
          total={posts.length}
          categories={categories}
          tags={tags}
          styling={this.state.scrolled ? "dark" : "light"}
        />
      </Layout>
    );
  }
}

export const query = graphql`
  query IndexQuery {
    site {
      metadata: siteMetadata {
        site {
          title
          description
          keywords
        }
        copyright {
          text
          year
        }
        author {
          avatar
          name
          credentials
          networks {
            twitter {
              name
              handler
              link
            }
            github {
              name
              handler
              link
            }
            linkedin {
              name
              handler
              link
            }
            email {
              name
              handler
              link
            }
          }
        }
      }
    }
    search: siteSearchIndex {
      index
    }
    markdown: allMarkdownRemark(
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
    ) {
      tags: group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
      categories: group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
      posts: edges {
        post: node {
          html
          excerpt
          timeToRead
          content: frontmatter {
            title
            style
            abstract
            author
            tags
            category
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
