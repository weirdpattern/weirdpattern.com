import * as React from "react";

import { Helmet } from "react-helmet";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import Totals from "../components/Totals";
import Entries from "../components/Entries";
import { IndexProps, Query } from "../interfaces";

/**
 * Properties of the category template.
 * @typedef {Query<IndexProps>} Props
 *
 * @private
 * @interface
 */
interface Props extends Query<IndexProps> {
  pageContext: { category: string };
}

/**
 * State of the category template.
 * @typedef {Interface} State
 * @property {boolean} scrolled a flag indicating the page has been scrolled.
 * @property {number} checkProgressiveLoad
 *    a flag indicating progressive load can be triggered.
 *
 * @private
 * @interface
 */
interface State {
  scrolled: boolean;
  checkProgressiveLoad: boolean;
}

/**
 * CategoryTemplate component.
 *
 * @public
 * @class
 */
export default class CategoryTemplate extends React.PureComponent<
  Props,
  State
> {
  // the path context
  private pageContext: string;

  /**
   * Class constructor.
   * @param {Props} props the properties of the index page.
   */
  public constructor(props: Props) {
    super(props);

    this.state = { scrolled: false, checkProgressiveLoad: false };
    this.pageContext = this.props.pageContext.category;
    this.scrollHandler = this.scrollHandler.bind(this);
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    const { entries, categories, tags } = this.props.data.markdown;
    const { site } = this.props.data.site.metadata;

    return (
      <Layout
        index={this.props.data.search.index}
        metadata={this.props.data.site.metadata}
        supportedActions={["back", "search"]}
        onScroll={this.scrollHandler}
      >
        <Helmet>
          <title>Tags | {site.title}</title>
          <meta name="description" content={site.description} />
        </Helmet>
        <Totals
          total={entries.length}
          categories={categories}
          tags={tags}
          styling={this.state.scrolled ? "dark" : "light"}
          location={this.pageContext}
        />
        <Entries
          entries={entries}
          metadata={this.props.data.site.metadata}
          checkProgressiveLoad={this.state.checkProgressiveLoad}
        />
      </Layout>
    );
  }

  /**
   * Updates the scrolled state.
   * @param {boolean} scrolled a flag indicating the scroll state.
   * @param {Function} callback the callback to be used after completion.
   * @returns {void}
   *
   * @private
   * @function
   */
  private scrollHandler(scrolled: boolean, callback: () => void): void {
    const distanceToBottom =
      document.documentElement.offsetHeight -
      window.innerHeight -
      window.scrollY;

    this.setState({ scrolled, checkProgressiveLoad: distanceToBottom < 50 });
    callback();
  }
}

export const query = graphql`
  query($category: String) {
    site {
      ...SiteMetadataFragment
    }
    search: siteSearchIndex {
      index
    }
    markdown: allMarkdownRemark(
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      ...AllMarkdownRemarkFragment
    }
  }
`;
