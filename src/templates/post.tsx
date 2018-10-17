import * as React from "react";

import Img from "gatsby-image";
import { graphql } from "gatsby";

import SEO from "../components/SEO";
import Share from "../components/Share";
import Layout from "../components/Layout";
import { PostProps, Query } from "../interfaces";

/**
 * Properties of the post page.
 * @typedef {Query<PostProps>} Props
 *
 * @private
 * @interface
 */
interface Props extends Query<PostProps> {}

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
 * PostTemplate component.
 *
 * @public
 * @class
 */
export default class PostTemplate extends React.Component<Props, State> {
  /**
   * Class constructor.
   * @param {Props} props the properties of the index page.
   */
  public constructor(props: Props) {
    super(props);

    this.state = { scrolled: false };
    this.scrollHandler = this.scrollHandler.bind(this);
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    const { site, post } = this.props.data;
    return (
      <Layout
        index={this.props.data.search.index}
        metadata={this.props.data.site.metadata}
        supportedActions={["search"]}
        onScroll={this.scrollHandler}
      >
        <SEO post={post} />
        <div className="post">
          <div className="compact-metadata">
            {site.metadata.author.name} {" · "} {post.content.date}
            {" · "} {post.timeToRead} min read
          </div>
          <h1>{post.content.title}</h1>
          <Share />
          <Img
            className="banner"
            title="Post image"
            alt={post.content.title}
            fluid={this.props.data.post.content.image.childImageSharp.fluid}
          />
          <div
            className="post-preview"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
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
    this.setState({ scrolled });
    callback();
  }
}

export const query = graphql`
  query($slug: String!) {
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
            fluid(maxWidth: 670) {
              ...GatsbyImageSharpFluid_tracedSVG
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
