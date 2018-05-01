import * as React from "react";

import Link from "gatsby-link";

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
  data: QueryPost;
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
  return (
    <div className="post">
      <h1>
        <Link to={data.fields.slug}>{data.content.title}</Link>
      </h1>
      <div
        dangerouslySetInnerHTML={{
          __html:
            data.content.category === "snippets" ? data.html : data.excerpt
        }}
      />
    </div>
  );
}
