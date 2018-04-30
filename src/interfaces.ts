/**
 * The copyright information.
 * @typedef {Interface} Copyrights
 * @property {string} text the copyright text.
 * @property {string} year the copyright year.
 */
export interface Copyrights {
  text: string;
  year: string;
}

/**
 * The social network information.
 * @typedef {Interface} SocialNetwork
 * @property {string} name the name of the social network.
 * @property {string} link the link to the social network.
 * @property {string} handler the handler of the author in the social network.
 *
 * @public
 * @interface
 */
export interface SocialNetwork {
  name: string;
  link: string;
  handler: string;
}

/**
 * The available social networks
 * @typedef {Interface} SocialNetworks
 *
 * @public
 * @interface
 */
export interface SocialNetworks {
  [key: string]: SocialNetwork;
}

/**
 * A post entry.
 * @typedef {Interface} QueryPost
 *
 * @public
 * @interface
 */
export interface QueryPost {
  fields: {
    slug: string;
  };
  excerpt: string;
  timeToRead: string;
  content: {
    title: string;
    tags: string[];
    category: string;
    cover: string;
    date: Date;
  };
}

/**
 * The post query results.
 * @typedef {Interface} MarkdownPost
 *
 * @public
 * @interface
 */
export interface MarkdownPost {
  markdown: {
    posts: Array<{ post: QueryPost }>;
  };
}

export interface Query<T> {
  data: T;
  children: any;
}
