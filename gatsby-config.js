const config = require("./config.json");
const regexExcludeRobots = /^(?!\/(dev-404-page|404|offline-plugin-app-shell-fallback|tags|categories)).*$/;

module.exports = {
  siteMetadata: config,
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-lodash",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${__dirname}/${config.posts.path}`
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1200
            }
          },
          {
            resolve: "gatsby-remark-responsive-iframe"
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: `${__dirname}/public/static`
            }
          },
          {
            resolve: "gatsby-remark-embed-gist",
            options: {
              username: "weirdpattern",
              gistCssPreload: true,
              gistCssUrlAddress: "https://github.githubassets.com/assets/gist-embed-b3b573358bfc66d89e1e95dbf8319c09.css"
            }
          }
        ]
      }
    },
    "gatsby-plugin-netlify",
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: "#55B4D4"
      }
    },
    "gatsby-transformer-json",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-twitter",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        output: "/sitemap.xml",
        query: `
            {
              site {
                siteMetadata {
                  siteUrl
                }
              }
              allSitePage(
                filter: {
                  path: {
                    regex: "${regexExcludeRobots}"
                  }
                }
              ) {
                edges {
                  node {
                    path
                  }
                }
              }
          }`
      }
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: config.title,
        short_name: config.title,
        description: config.description,
        start_url: "",
        background_color: "#FAFAFA",
        theme_color: "#FF6A00",
        display: "minimal-ui",
        icon: "static/logos/favicon.png"
      }
    },
    "gatsby-plugin-offline",
    {
      resolve: "@gatsby-contrib/gatsby-plugin-elasticlunr-search",
      options: {
        fields: ["title", "category", "tags"],
        resolvers: {
          MarkdownRemark: {
            url: node => node.fields.slug,
            date: node => node.frontmatter.date,
            title: node => node.frontmatter.title,
            style: node => node.frontmatter.style,
            abstract: node => node.frontmatter.abstract,
            category: node => node.frontmatter.category,
            tags: node => node.frontmatter.tags
          }
        }
      }
    }
    /*
    {
      resolve: "gatsby-plugin-feed",
      options: {
        setup(ref) {
          const ret = ref.query.site.siteMetadata.rssMetadata;
          ret.allMarkdownRemark = ref.query.allMarkdownRemark;
          ret.generator = "GatsbyJS Material Starter";
          return ret;
        },
        query: `
        {
          site {
            siteMetadata {
              rssMetadata {
                site_url
                feed_url
                title
                description
                image_url
                author
                copyright
              }
            }
          }
        }
      `,
        feeds: [
          {
            serialize(ctx) {
              const rssMetadata = ctx.query.site.siteMetadata.rssMetadata;
              return ctx.query.allMarkdownRemark.edges.map(edge => ({
                categories: edge.node.frontmatter.tags,
                date: edge.node.frontmatter.date,
                title: edge.node.frontmatter.title,
                description: edge.node.excerpt,
                author: rssMetadata.author,
                url: rssMetadata.site_url + edge.node.fields.slug,
                guid: rssMetadata.site_url + edge.node.fields.slug,
                custom_elements: [{ "content:encoded": edge.node.html }]
              }));
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                edges {
                  node {
                    excerpt
                    html
                    timeToRead
                    fields { slug }
                    frontmatter {
                      title
                      cover
                      date
                      category
                      tags
                    }
                  }
                }
              }
            }
          `,
            output: config.siteRss
          }
        ]
      }
    }
    */
  ]
};
