import * as React from "react";

import Helmet from "react-helmet";
import { throttle } from "lodash";

import * as data from "../../content/data.json";
import Totals from "../components/Totals";
import PostPreview from "../components/PostPreview";
import { getCommonActions } from "../utils";
import { Action, QueryPost, MarkdownPosts, Query } from "../interfaces";

const config = data as any;

/**
 * Index properties.
 * @typedef {Query<MarkdownPost>} Props
 * @property {Function} onScroll a callback for scroll events.
 *
 * @private
 * @interface
 */
interface Props extends Query<MarkdownPosts> {
  onUpdateActions: (actions: Array<Action>) => void;
}

/**
 * Index state.
 * @typedef {Interface} State
 * @property {number} numberOfPost
 *    the number of posts to be displayed every time.
 * @property {boolean} autoScrolling
 *    a flag indicating if infinite scroll has been activated.
 *
 * @private
 * @interface
 */
interface State {
  numberOfPosts: number;
  autoScrolling: boolean;
}

/**
 * Page component.
 *
 * @public
 * @class
 */
export default class Index extends React.PureComponent<Props, State> {
  private ticking: boolean = false;

  /**
   * Class constructor.
   * @param {Props} props the properties of the index page.
   */
  public constructor(props: Props) {
    super(props);

    this.state = {
      numberOfPosts: 15,
      autoScrolling: false
    };

    this.scrollHandler = this.scrollHandler.bind(this);
  }

  /** @inheritdoc */
  public componentDidMount(): void {
    window.addEventListener("scroll", this.scrollHandler);
  }

  /** @inheritdoc */
  public componentWillUnmount(): void {
    window.removeEventListener("scroll", this.scrollHandler);
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    const { tags, categories, posts } = this.props.data.markdown;

    return (
      <React.Fragment>
        <Helmet>
          <title>Dashboard | {config.title}</title>
          <meta name="description" content={config.description} />
        </Helmet>
        <Totals total={posts.length} categories={categories} tags={tags} />
        <div className="post-list">
          {posts.map((data: { post: QueryPost }, index: number) => {
            return <PostPreview key={index} data={data.post} />;
          })}
        </div>
      </React.Fragment>
    );
  }

  /**
   * Updates the existing list.
   * @returns {void}.
   *
   * @private
   * @method
   */
  private update(): void {
    const distanceToBottom =
      document.documentElement.offsetHeight -
      window.scrollY +
      window.innerHeight;

    if (this.state.autoScrolling && distanceToBottom < 100) {
      this.setState({ numberOfPosts: this.state.numberOfPosts + 12 });
    }

    if (document.documentElement.scrollTop > 0) {
      this.props.onUpdateActions(getCommonActions("scrollTop", "search"));
    } else {
      this.props.onUpdateActions(getCommonActions("search"));
    }

    this.ticking = false;
  }

  /**
   * Handles the scroll events.
   * @returns {void}.
   *
   * @private
   * @method
   */
  private scrollHandler(): void {
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => this.update());
    }
  }

  /**
   * Determines if the given entry is a post.
   * @param {QueryPost} entry the entry to be validated.
   * @returns {boolean} true when entry is a post; false otherwise.
   *
   * @private
   * @method
   */
  private isPost(entry: QueryPost): boolean {
    return entry.content.style === "post";
  }

  /**
   * Determines if the given entry is a snippet.
   * @param {QueryPost} entry the entry to be validated.
   * @returns {boolean} true when entry is a snippet; false otherwise.
   *
   * @private
   * @method
   */
  private isSnippet(entry: QueryPost): boolean {
    return entry.content.style === "snippet";
  }
}

export const query = graphql`
  query IndexQuery {
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
