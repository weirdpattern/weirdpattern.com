import * as React from "react";

import SEO from "../components/SEO";
import { MarkdownPost, Query } from "../interfaces";

interface Props extends Query<MarkdownPost> {}

export default class PostTemplate extends React.Component<Props, {}> {
  /** @inheritdoc */
  public render(): React.ReactNode {
    const { post } = this.props.data;

    return <SEO post={post} />;
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
        cover
        author
        category
        tags
        date(formatString: "DD MMMM, YYYY")
      }
      navigation: fields {
        suggestions {
          slug
          title
        }
        slug
      }
    }
  }
`;
