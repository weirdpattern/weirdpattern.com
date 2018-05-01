import * as React from "react";

import { QueryPost } from "../interfaces";

/**
 * Properties for the Header component.
 * @typedef {Interface} Props
 * @property {string} networks the networks of the author.
 *
 * @private
 * @interface
 */
interface Props {
  post: QueryPost;
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
export default function Post({ post }: Props): React.ReactElement<Props> {
  return (
    <div className="post">
      <h1>
        <a href={post.fields.slug}>{post.content.title}</a>
      </h1>
      <p>{post.content.description}</p>
    </div>
  );
}
