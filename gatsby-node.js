const path = require("path");
const { has, kebabCase } = require("lodash");
const webpackLodashPlugin = require("lodash-webpack-plugin");

const extractQueryPlugin = path.resolve(
  __dirname,
  "node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js"
);

/**
 * Adds related sibling nodes.
 * @param {Array} nodes the nodes to be linked.
 * @param {Function} createNodeField the factory method to be used.
 * @returns {void}
 *
 * @private
 * @function
 */
function addSiblingNodes(nodes, createNodeField) {
  nodes.sort(
    (left, right) =>
      new Date(left.frontmatter.date) - new Date(right.frontmatter.date)
  );

  for (let i = 0; i < nodes.length; i++) {
    const current = nodes[i];
    const suggestions = nodes
      .filter(node => {
        if (
          !node.frontmatter.tags ||
          !current.frontmatter.tags ||
          node.fields.slug === current.fields.slug
        ) {
          return false;
        }

        return (
          current.frontmatter.tags.filter(
            tag => node.frontmatter.tags.indexOf(tag) > -1
          ).length > 0
        );
      })
      .map(node => {
        return {
          slug: node.fields.slug,
          date: node.frontmatter.date,
          title: node.frontmatter.title,
          description: node.frontmatter.description
        };
      });

    const randomized = [];

    let index = -1;
    const length = suggestions.length;
    while (++index < length) {
      randomized.push(
        suggestions.splice(Math.floor(Math.random() * length, 1)[0])
      );
    }

    createNodeField({
      node: current,
      name: "suggestions",
      value: randomized
    });
  }
}

/** @inheritdoc */
exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;

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
exports.setFieldsOnGraphQLNodeType = ({ type, boundActionCreators }) => {
  const { name, nodes } = type;
  const { createNodeField } = boundActionCreators;

  if (name === "MarkdownRemark") {
    addSiblingNodes(nodes, createNodeField);
  }
};

/** @inheritdoc */
exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const postPage = path.resolve("src/templates/post.tsx");
    const tipPage = path.resolve("src/templates/tip.tsx");
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
            path: `/tags/${kebabCase(tag)}/`,
            component: tagPage,
            context: {
              tag
            }
          });
        });

        const categoryList = Array.from(categorySet);
        categoryList.forEach(category => {
          createPage({
            path: `/categories/${kebabCase(category)}/`,
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

/** @inheritdoc */
exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === "build-javascript") {
    config.plugin("Lodash", webpackLodashPlugin, null);
    config.loader("typescript", {
      test: /\.tsx?$/,
      loaders: [
        `babel-loader?${JSON.stringify({
          presets: ["babel-preset-env"],
          plugins: [extractQueryPlugin]
        })}`,
        "ts-loader"
      ]
    });
  }
};
