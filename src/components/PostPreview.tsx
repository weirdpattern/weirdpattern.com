import * as React from "react";
import * as classNames from "classnames";

import Link from "gatsby-link";

import PostMetadata from "./PostMetadata";
import { QueryPost } from "../interfaces";

/**
 * Properties for the PostPreview component.
 * @typedef {Interface} Props
 * @property {QueryPost} data the data of the post to be displayed.
 *
 * @private
 * @interface
 */
interface Props {
  data: QueryPost;
}

/**
 * Extracts the abstract information.
 * @param {QueryPost} data the data to be parsed.
 * @returns {string} the abstract information.
 *
 * @private
 * @function
 */
function getAbstract(data: QueryPost): string {
  let html = data.content.abstract || data.excerpt || data.html;

  const startIndex = data.html.indexOf("<!-- start:abstract -->");
  const endIndex = data.html.indexOf("<!-- end:abstract -->");

  if (data.html && startIndex > -1 && endIndex > -1) {
    html = data.html.substring(startIndex, endIndex);
  }

  return html;
}

/**
 * Post component.
 * @param {Props} props the properties of the component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the post.
 *
 * @public
 * @function
 */
export default function Post({ data }: Props): React.ReactElement<Props> {
  const postClasses = classNames("post-preview", {
    post: data.content.style === "post",
    snippet: data.content.style === "snippet",
    guide: data.content.style === "guide"
  });

  return (
    <div className={postClasses}>
      <h2>
        <Link to={data.fields.slug}>{data.content.title}</Link>
      </h2>
      <PostMetadata data={data} />
      <div
        dangerouslySetInnerHTML={{
          __html: getAbstract(data)
        }}
      />
    </div>
  );
}
