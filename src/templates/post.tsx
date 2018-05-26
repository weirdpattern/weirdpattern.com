import * as React from "react";

import * as data from "../../content/data.json";
import SEO from "../components/SEO";
import PostMetadata from "../components/PostMetadata";
import { getCommonActions } from "../utils";
import { Action, MarkdownPost, Query } from "../interfaces";

const config = data as any;

/**
 * Post properties.
 * @typedef {Interface} Props
 * @property {Function} onUpdateActions a callback for scroll events.
 *
 * @private
 * @interface
 */
interface Props extends Query<MarkdownPost> {
  onUpdateActions: (actions: Array<Action>) => void;
}

/**
 * PostTemplate component.
 *
 * @public
 * @class
 */
export default class PostTemplate extends React.Component<Props, {}> {
  private ticking: boolean = false;

  /**
   * Class constructor.
   * @param {Props} props the properties of the index page.
   */
  public constructor(props: Props) {
    super(props);

    this.props.onUpdateActions(getCommonActions("back", "search"));
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
    const { post } = this.props.data;
    const author = config.authors[post.content.author];

    return (
      <React.Fragment>
        <SEO post={post} />
        <div className="post">
          <div className="compact-metadata">
            <a href="#author">{author.name}</a> {" · "} {post.content.date}
            {" · "} {post.timeToRead} min read
          </div>
          <h1 className={post.content.category}>{post.content.title}</h1>
          <div
            className="post-preview"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
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

    if (document.documentElement.scrollTop > 0) {
      this.props.onUpdateActions(
        getCommonActions("scrollTop", "back", "search")
      );
    } else {
      this.props.onUpdateActions(getCommonActions("back", "search"));
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
}

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      content: frontmatter {
        title
        style
        abstract
        author
        category
        tags
        date(formatString: "DD MMMM, YYYY")
      }
      fields {
        suggestions {
          slug
          title
        }
        slug
      }
    }
  }
`;
