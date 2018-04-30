import * as React from "react";

import Post from "../components/Post";
import { QueryPost, MarkdownPost, Query } from "../interfaces";

/**
 * Index properties.
 * @typedef {Query<MarkdownPost>} Props
 *
 * @private
 * @interface
 */
interface Props extends Query<MarkdownPost> {}

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
export default class Index extends React.Component<Props, State> {
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
    const posts = this.props.data.markdown.posts;

    return (
      <div className="post-list">
        {posts.map((data: { post: QueryPost }, index: number) => {
          return <Post key={index} post={data.post} />;
        })}
      </div>
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
  query IndexQuery {
    markdown: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      posts: edges {
        post: node {
          excerpt
          content: frontmatter {
            title
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
