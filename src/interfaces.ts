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
 * The config.
 * @typedef {Interface} Metadata
 * @property {SiteMetadata} site the site configuration.
 * @property {CopyrightMetadata} copyright the copyright configuration.
 * @property {AuthorMetadata} author the author configuration.
 * @property {PostsMetadata} posts the posts configuration.
 * @property {DependenciesMetadata} dependencies the dependencies configuration.
 *
 * @public
 * @interface
 */
export interface Metadata {
  site: SiteMetadata;
  copyright: CopyrightMetadata;
  profile: string;
  authors: Array<AuthorMetadata>;
  posts: PostsMetadata;
  dependencies: DependenciesMetadata;
}

/**
 * The site information.
 * @typedef {Interface} SiteMetadata
 * @property {string} title the title of the site.
 * @property {string} description the description of the site.
 * @property {copyright} copyright the copyrights information.
 *
 * @public
 * @interface
 */
export interface SiteMetadata {
  url: string;
  title: string;
  description: string;
  keywords: Array<string>;
}

/**
 * The copyright information.
 * @typedef {Interface} CopyrightMetadata
 * @property {string} text the copyright text.
 * @property {string} year the copyright year.
 *
 * @public
 * @interface
 */
export interface CopyrightMetadata {
  text: string;
  year: string;
}

/**
 * The author information.
 * @typedef {Interface} AuthorMetadata
 * @property {string} id the unique identifier of the author.
 * @property {string} name the name of the author.
 * @property {string} email the email of the author.
 * @property {string} credentials the credentials of the author.
 * @property {string} avatar the avatar of the author.
 * @property {Network} networks the networks of the author.
 *
 * @public
 * @interface
 */
export interface AuthorMetadata {
  id: string;
  name: string;
  email: string;
  credentials: string;
  avatar: string;
  networks: Array<NetworkMetadata>;
}

/**
 * The network information.
 * @typedef {Interface} NetworkMetadata
 * @property {string} id the id of the network.
 * @property {string} name the name of the network.
 * @property {string} link the link to the network.
 * @property {string} handler the handler of the author in the network.
 *
 * @public
 * @interface
 */
export interface NetworkMetadata {
  id: string;
  name: string;
  link: string;
  handler: string;
}

/**
 * The posts information.
 * @typedef {Interface} PostsMetadata
 * @property {string} path the path to the content.
 * @property {boolean} loadOnScroll a flag indicating load on scroll is enabled.
 * @property {number} initialSize the size of the page.
 * @property {number} incrementsBy the page size increment.
 *
 * @public
 * @interface
 */
export interface PostsMetadata {
  path: string;
  loadOnScroll: boolean;
  initialSize: number;
  incrementsBy: number;
}

/**
 * The dependency information.
 * @typedef {Interface} DependenciesMetadata
 * @property {string} sharethis the id of the share this module.
 *
 * @public
 * @interface
 */
export interface DependenciesMetadata {
  sharethis: string;
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
 * The layout query props.
 * @typedef {Interface} LayoutProps
 *
 * @public
 * @interface
 */
export interface LayoutProps {
  site: {
    metadata: Metadata;
  };
  search: {
    index: any;
  };
}

/**
 * The index query props.
 * @typedef {Interface} IndexProps
 *
 * @public
 * @interface
 */
export interface IndexProps extends LayoutProps {
  markdown: {
    tags: Array<ValueCount>;
    categories: Array<ValueCount>;
    entries: Array<{ post: QueryPost }>;
  };
}

/**
 * The post query props.
 * @typedef {Interface} PostProps
 *
 * @public
 * @interface
 */
export interface PostProps extends LayoutProps {
  post: QueryPost;
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
