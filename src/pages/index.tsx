import * as React from "react";

import Helmet from "react-helmet";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import Totals from "../components/Totals";
import ScrollablePanel from "../components/ScrollablePanel";
import { Action, Query, IndexProps } from "../interfaces";
import { getCommonActions } from "../utils";

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
 * @property {Array<Action>} actions
 *    the actions to be displayed in the quick action button.
 *
 * @private
 * @interface
 */
interface State {
  scrolled: boolean;
  actions: Array<Action>;
}

/**
 * Index component
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
    this.state = {
      scrolled: false,
      actions: getCommonActions(this.props.data.site.metadata, "search")
    };

    this.scrollHandler = this.scrollHandler.bind(this);
    this.actionRefreshHandler = this.actionRefreshHandler.bind(this);
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    const { entries, categories, tags } = this.props.data.markdown;
    const { site } = this.props.data.site.metadata;

    return (
      <Layout
        index={this.props.data.search.index}
        metadata={this.props.data.site.metadata}
        actions={this.state.actions}
      >
        <Helmet>
          <title>Dashboard | {site.title}</title>
          <meta name="description" content={site.description} />
          <meta name="keywords" content={site.keywords.join(",")} />
        </Helmet>
        <Totals
          total={entries.length}
          tags={tags}
          categories={categories}
          styling={this.state.scrolled ? "dark" : "light"}
        />
        <ScrollablePanel
          entries={entries}
          metadata={this.props.data.site.metadata}
          onScroll={this.scrollHandler}
          onActionRefresh={this.actionRefreshHandler}
        />
      </Layout>
    );
  }

  /**
   * Updates the scrolled state.
   * @param {boolean} scrolled a flag indicating the scroll state.
   * @returns {void}
   *
   * @private
   * @function
   */
  private scrollHandler(scrolled: boolean): void {
    this.setState({ scrolled });
  }

  /**
   * Updates the actions state.
   * @param {Array<Action>} actions the actions to be used.
   * @returns {void}
   *
   * @private
   * @function
   */
  private actionRefreshHandler(actions: Array<Action>): void {
    this.setState({ actions });
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
        posts {
          loadOnScroll
          initialSize
          incrementsBy
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
      entries: edges {
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
