import * as React from "react";

import Helmet from "react-helmet";

import * as data from "../../config.json";
import { QueryPost } from "../interfaces";

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
  const url = config.url + post.fields.slug;
  const { title, abstract, tags, category, style, image } = post.content;
  const description = abstract || post.excerpt;
  const author = config.authors[post.content.author];
  const imageUrl = config.url + image.childImageSharp.sizes.src;

  return (
    <Helmet>
      <title>
        {title} | {config.title}
      </title>
      <meta name="description" content={description} />
      <meta name="keywords" content={tags.join(",")} />
      <meta name="tags" content={tags.join(",")} />
      <meta name="category" content={category} />
      <meta name="style" content={style} />
      <meta name="author" content={author.name} />
      <meta name="image" content={imageUrl} />

      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={author.networks.twitter.handler} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <link rel="me" href={author.networks.twitter.link} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
