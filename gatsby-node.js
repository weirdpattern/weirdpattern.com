const path = require("path");
const { has, kebabCase } = require("lodash");
const webpackLodashPlugin = require("lodash-webpack-plugin");

const postNodes = [];
const extractQueryPlugin = path.resolve(
  __dirname,
  "node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js"
);

/**
 * Adds related sibling nodes.
 * @param {Function} createNodeField the factory method to be used.
 * @returns {void}
 *
 * @private
 * @function
 */
function addSiblingNodes(createNodeField) {
  postNodes.sort(
    ({ frontmatter: { date: date1 } }, { frontmatter: { date: date2 } }) =>
      new Date(date1) - new Date(date2)
  );

  for (let i = 0; i < postNodes.length; i += 1) {
    const nextID = i + 1 < postNodes.length ? i + 1 : 0;
    const prevID = i - 1 > 0 ? i - 1 : postNodes.length - 1;

    const currNode = postNodes[i];
    const nextNode = postNodes[nextID];
    const prevNode = postNodes[prevID];

    createNodeField({
      node: currNode,
      name: "nextTitle",
      value: nextNode.frontmatter.title
    });

    createNodeField({
      node: currNode,
      name: "nextSlug",
      value: nextNode.fields.slug
    });

    createNodeField({
      node: currNode,
      name: "prevTitle",
      value: prevNode.frontmatter.title
    });

    createNodeField({
      node: currNode,
      name: "prevSlug",
      value: prevNode.fields.slug
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
    postNodes.push(node);
  }
};

/** @inheritdoc */
exports.setFieldsOnGraphQLNodeType = ({ type, boundActionCreators }) => {
  const { name } = type;
  const { createNodeField } = boundActionCreators;

  if (name === "MarkdownRemark") {
    addSiblingNodes(createNodeField);
  }
};

/** @inheritdoc */
exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const postPage = path.resolve("src/templates/post.tsx");
    const tagPage = path.resolve("src/templates/tag.tsx");
    const categoryPage = path.resolve("src/templates/category.tsx");

    resolve(
      graphql(
        `
          {
            posts: allMarkdownRemark {
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
        result.data.posts.edges.forEach(edge => {
          if (edge.node.frontmatter.tags) {
            edge.node.frontmatter.tags.forEach(tag => {
              tagSet.add(tag);
            });
          }

          if (edge.node.frontmatter.category) {
            categorySet.add(edge.node.frontmatter.category);
          }

          createPage({
            path: edge.node.fields.slug,
            component: postPage,
            context: {
              slug: edge.node.fields.slug
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
