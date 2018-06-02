import * as React from "react";

import Helmet from "react-helmet";
import { chunk } from "lodash";

import * as data from "../../content/data.json";
import Totals from "../components/Totals";
import PostPreview from "../components/PostPreview";
import { getCommonActions, syncPrism } from "../utils";
import { Action, MarkdownPosts, Query, QueryPost } from "../interfaces";

const config = data as any;

/**
 * Properties of the index page.
 * @typedef {Query<MarkdownPost>} Props
 * @property {number} postToShow the number of post to show.
 * @property {Function} onUpdateActions a callback for scroll events.
 *
 * @private
 * @interface
 */
interface Props extends Query<MarkdownPosts> {
  postToShow: number;
  onUpdateActions: (actions: Array<Action>) => void;
}

/**
 * State of the index page.
 * @typedef {Interface} State
 * @property {boolean} scrolled a flag indicating the page was scrolled.
 * @property {number} numberOfPost
 *    the number of posts to be displayed every time.
 * @property {boolean} showLoadMore
 *    a flag indicating if the load more button should be visible.
 *
 * @private
 * @interface
 */
interface State {
  scrolled: boolean;
  numberOfPosts: number;
  showLoadMore: boolean;
}

/**
 * Index component.
 *
 * @public
 * @class
 */
export default class Index extends React.PureComponent<Props, State> {
  private ticking: boolean = false;
  private chunkSize: number = 10;

  /**
   * Class constructor.
   * @param {Props} props the properties of the index page.
   */
  public constructor(props: Props) {
    super(props);

    const postToShow = this.props.postToShow || this.chunkSize;

    this.state = {
      scrolled: false,
      numberOfPosts: postToShow,
      showLoadMore: this.props.data.markdown.posts.length > postToShow
    };

    this.scrollHandler = this.scrollHandler.bind(this);
    this.loadMoreHandler = this.loadMoreHandler.bind(this);
  }

  /** @inheritdoc */
  public componentDidMount(): void {
    syncPrism(document);
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
        <Totals
          total={posts.length}
          categories={categories}
          tags={tags}
          styling={this.state.scrolled ? "dark" : "light"}
        />
        <div className="post-list">
          {chunk(posts.slice(0, this.state.numberOfPosts), this.chunkSize).map(
            (chunk: Array<{ post: QueryPost }>, index: number) => {
              return (
                <React.Fragment key={index}>
                  {chunk.map((data: { post: QueryPost }) => {
                    return (
                      <PostPreview
                        key={data.post.fields.slug}
                        data={data.post}
                      />
                    );
                  })}
                </React.Fragment>
              );
            }
          )}
        </div>
        {this.state.showLoadMore && (
          <div className="load-container">
            <button className="load-more" onClick={this.loadMoreHandler}>
              Load More
            </button>
          </div>
        )}
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

    if (!this.state.showLoadMore && distanceToBottom < 100) {
      this.loadMoreHandler();
    }

    if (document.documentElement.scrollTop > 0) {
      this.setState({ scrolled: true });
      this.props.onUpdateActions(getCommonActions(null, "scrollTop", "search"));
    } else {
      this.setState({ scrolled: false });
      this.props.onUpdateActions(getCommonActions(null, "search"));
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
   * Handles the load more events.
   * @returns {void}
   *
   * @private
   * @method
   */
  private loadMoreHandler(): void {
    this.setState({
      numberOfPosts: this.state.numberOfPosts + this.chunkSize,
      showLoadMore: false
    });
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
