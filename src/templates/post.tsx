import * as React from "react";

import { GraphResult, Post } from "../interfaces";

interface Props extends GraphResult<Post> {}

export default class PostTemplate extends React.Component<Props, {}> {
  /** @inheritdoc */
  public render(): React.ReactNode {
    return null;
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
        cover
        date
        category
        tags
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
