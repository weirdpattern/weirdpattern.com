const request = require("request-promise");
const visit = require("async-unist-util-visit");

module.exports = ({ markdownAST }) => {
  return visit(markdownAST, node => {
    if (node.type !== "inlineCode") {
      return;
    }

    const { value } = node;

    if (!value.startsWith("gist:")) {
      return;
    }

    const id = value.substring(5);
    const [gist, file] = id.split("#");

    let url = `https://gist.github.com/${gist}.json`;
    if (file != null) {
      url += `?file=${file}`;
    }

    return request(url).then(body => {
      const content = JSON.parse(body);

      node.type = "html";
      node.value = content.div;
    });
  });
};
