import * as React from "react";
import * as classNames from "classnames";
import Img from "gatsby-image";

import * as data from "../../content/data.json";
import SEO from "../components/SEO";
import Share from "../components/Share";
import { getCommonActions } from "../utils";
import { Action, MarkdownPost, Query } from "../interfaces";

const config = data as any;

/**
 * Properties of the PostTemplate.
 * @typedef {Interface} Props
 * @property {string} location the location of this article.
 * @property {Function} onUpdateActions a callback for scroll events.
 *
 * @private
 * @interface
 */
interface Props extends Query<MarkdownPost> {
  location: string;
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
            {author.name} {" · "} {post.content.date}
            {" · "} {post.timeToRead} min read
          </div>
          <h1>{post.content.title}</h1>
          <Share />
          <Img
            className="banner"
            title="Post image"
            alt={post.content.title}
            sizes={this.props.data.post.content.image.childImageSharp.sizes}
          />
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
        image {
          childImageSharp {
            sizes(maxWidth: 670) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        date(formatString: "DD MMMM, YYYY")
      }
      fields {
        slug
      }
    }
  }
`;
