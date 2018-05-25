import * as React from "react";

import Helmet from "react-helmet";

import * as data from "../../content/data.json";
import { SocialNetwork, SocialNetworks, QueryPost } from "../interfaces";

const config = data as any;

/**
 * Properties for the SEO component.
 * @typedef {Interface} Props
 * @property {QueryPost} post the post information.
 *
 * @private
 * @interface
 */
interface Props {
  post: QueryPost;
}

/**
 * SEO component.
 * @param {Props} props the properties of the component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the SEO.
 *
 * @public
 * @function
 */
export default function SEO({ post }: Props): React.ReactElement<Props> {
  return (
    <Helmet>
      <title>
        {post.content.title} | {config.title}
      </title>
      <meta
        name="description"
        content={post.content.abstract || post.excerpt}
      />
      <meta name="keywords" content={post.content.tags.join(",")} />
      <meta name="tags" content={post.content.tags.join(",")} />
      <meta name="category" content={post.content.category} />
      <meta name="style" content={post.content.style} />
      <meta name="author" content={post.content.author} />
    </Helmet>
  );
}
