import * as React from "react";

import Helmet from "react-helmet";
import { throttle } from "lodash";

import * as data from "../../content/data.json";
import PostPreview from "../components/PostPreview";
import { getCommonActions } from "../utils";
import { Action, QueryPost, MarkdownPost, Query } from "../interfaces";

const config = data as any;

/**
 * Index properties.
 * @typedef {Query<MarkdownPost>} Props
 * @property {Function} onScroll a callback for scroll events.
 *
 * @private
 * @interface
 */
interface Props extends Query<MarkdownPost> {
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
    const posts = this.props.data.markdown.posts;

    return (
      <React.Fragment>
        <Helmet>
          <title>Dashboard | {config.title}</title>
          <meta name="description" content={config.description} />
        </Helmet>
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
}

export const query = graphql`
  query IndexQuery {
    markdown: allMarkdownRemark(
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
    ) {
      posts: edges {
        post: node {
          html
          excerpt
          timeToRead
          content: frontmatter {
            title
            style
            abstract
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
