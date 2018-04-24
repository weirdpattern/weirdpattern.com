import * as React from "react";

export default class PostTemplate extends React.Component<{}, {}> {
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
