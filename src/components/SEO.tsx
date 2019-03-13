import * as React from "react";

import { Helmet } from "react-helmet";

import {
  AuthorMetadata,
  NetworkMetadata,
  QueryPost,
  SiteMetadata
} from "../interfaces";

/**
 * Properties for the SEO component.
 * @typedef {Interface} Props
 * @property {SiteMetadata} site the site metadata.
 * @property {QueryPost} post the post information.
 * @property {AuthorMetadata} author the author metadata.
 *
 * @private
 * @interface
 */
interface Props {
  site: SiteMetadata;
  post: QueryPost;
  author: AuthorMetadata;
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
export default function SEO({
  site,
  post,
  author
}: Props): React.ReactElement<Props> {
  const url = site.url + post.fields.slug;
  const { title, abstract, tags, category, style, image } = post.content;
  const description = abstract || post.excerpt;
  const imageUrl = site.url + image.childImageSharp.fluid.src;
  const twitter = author.networks.find(
    (network: NetworkMetadata) => network.id === "twitter"
  );

  return (
    <Helmet>
      <title>
        {title} | {site.title}
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

      {twitter && <meta name="twitter:card" content="summary_large_image" />}
      {twitter && <meta name="twitter:creator" content={twitter.handler} />}
      {twitter && <meta name="twitter:title" content={title} />}
      {twitter && <meta name="twitter:description" content={description} />}
      {twitter && <meta name="twitter:image" content={imageUrl} />}
      {twitter && <link rel="me" href={twitter.link} />}

      <link rel="canonical" href={url} />
    </Helmet>
  );
}
