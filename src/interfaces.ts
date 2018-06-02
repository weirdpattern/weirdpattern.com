/**
 * The action definition.
 * @property {string} name the name of the action.
 * @property {Function} callback the callback to be executed.
 *
 * @public
 * @interface
 */
export interface Action {
  name: string;
  callback: Function;
}

/**
 * The copyright information.
 * @typedef {Interface} Copyrights
 * @property {string} text the copyright text.
 * @property {string} year the copyright year.
 *
 * @public
 * @interface
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
 * The available social networks.
 * @typedef {Interface} SocialNetworks
 *
 * @public
 * @interface
 */
export interface SocialNetworks {
  [key: string]: SocialNetwork;
}

/**
 * The value count keypair.
 * @typedef {Interface} ValueCount
 *
 * @public
 * @interface
 */
export interface ValueCount {
  fieldValue: string;
  totalCount: number;
}

/**
 * A post suggestion
 * @typedef {Interface} PostSuggestion
 * @property {string} slug the url of the post.
 * @property {string} title the title of the post.
 * @property {string} abstract the abstract of the post.
 * @property {string} image the image of the post.
 * @property {string} date the date of the post.
 *
 * @public
 * @interface
 */
export interface PostSuggestion {
  slug: string;
  title: string;
  abstract: string;
  image: any;
  date: string;
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
    suggestions?: Array<PostSuggestion>;
  };
  html: string;
  excerpt: string;
  timeToRead: string;
  content: {
    title: string;
    abstract: string;
    style: string;
    tags: string[];
    category: string;
    author: string;
    image: any;
    date: Date;
  };
}

/**
 * The posts query results.
 * @typedef {Interface} MarkdownPosts
 *
 * @public
 * @interface
 */
export interface MarkdownPosts {
  markdown: {
    tags: Array<ValueCount>;
    categories: Array<ValueCount>;
    posts: Array<{ post: QueryPost }>;
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
  post: QueryPost;
}

/**
 * The search index.
 * @typedef {Interface} SearchIndex
 *
 * @public
 * @interface
 */
export interface SearchIndex {
  search: {
    index: any;
  };
}

/**
 * The query result container.
 * @typedef {Interface} Query
 *
 * @public
 * @interface
 */
export interface Query<T> {
  data: T;
  children: any;
}

/**
 * The search post result.
 * @typedef {Interface} SearchPost
 * @property {string} url the url information.
 * @property {string} date the date information.
 * @property {string} title the title information.
 * @property {string} style the style information.
 *
 * @public
 * @interface
 */
export interface SearchPost {
  url: string;
  date: string;
  title: string;
  style: string;
}
