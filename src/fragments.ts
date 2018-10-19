import { graphql } from "gatsby";

export const SiteMetadataFragment = graphql`
  fragment SiteMetadataFragment on Site {
    metadata: siteMetadata {
      site {
        url
        title
        description
        keywords
      }
      copyright {
        text
        year
      }
      profile
      authors {
        id
        name
        credentials
        avatar
        networks {
          id
          name
          handler
          link
        }
      }
      posts {
        loadOnScroll
        initialSize
        incrementsBy
      }
      dependencies {
        sharethis
      }
    }
  }
`;

export const AllMarkdownRemarkMetadataFra = graphql`
  fragment AllMarkdownRemarkFragment on MarkdownRemarkConnection {
    tags: group(field: frontmatter___tags) {
      fieldValue
      totalCount
    }
    categories: group(field: frontmatter___category) {
      fieldValue
      totalCount
    }
    entries: edges {
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
`;
