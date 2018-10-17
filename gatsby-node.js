const path = require("path");
const { has, kebabCase } = require("lodash");

/** @inheritdoc */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);

    let slug;
    if (has(node, "frontmatter.title")) {
      slug = `/${kebabCase(node.frontmatter.title)}`;
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === "") {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }

    if (has(node, "frontmatter.slug")) {
      slug = `/${_.kebabCase(node.frontmatter.slug)}`;
    }

    createNodeField({ node, name: "slug", value: slug });
  }
};

/** @inheritdoc */
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const postPage = path.resolve("src/templates/post.tsx");
    const tagPage = path.resolve("src/templates/tag.tsx");
    const categoryPage = path.resolve("src/templates/category.tsx");

    resolve(
      graphql(
        `
          {
            all: allMarkdownRemark {
              edges {
                node {
                  frontmatter {
                    tags
                    category
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        const tagSet = new Set();
        const categorySet = new Set();

        const all = result.data.all.edges.map(p => p.node);

        all.forEach(node => {
          if (node.frontmatter.tags) {
            node.frontmatter.tags.forEach(tag => {
              tagSet.add(tag);
            });
          }

          if (node.frontmatter.category) {
            categorySet.add(node.frontmatter.category);
          }

          createPage({
            path: node.fields.slug,
            component: postPage,
            context: {
              slug: node.fields.slug
            }
          });
        });

        const tagList = Array.from(tagSet);
        tagList.forEach(tag => {
          createPage({
            path: `/tags/${encodeURIComponent(kebabCase(tag))}/`,
            component: tagPage,
            context: {
              tag
            }
          });
        });

        const categoryList = Array.from(categorySet);
        categoryList.forEach(category => {
          createPage({
            path: `/categories/${encodeURIComponent(kebabCase(category))}/`,
            component: categoryPage,
            context: {
              category
            }
          });
        });
      })
    );
  });
};
