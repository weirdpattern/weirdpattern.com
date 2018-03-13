/**
 * The available social medias.
 * @typedef {Type} SocialMedias
 *
 * @private
 * @type
 */
type SocialMedias =
  | "github"
  | "twitter"
  | "facebook"
  | "linkedIn"
  | "googleplus";

/**
 * The social media information.
 * @typedef {Interface} SocialMedia
 * @property {string} icon the icon of the social media.
 * @property {string} handler the handler of the social media.
 * @property {string} link the url to the social media profile.
 *
 * @public
 * @interface
 */
export interface SocialMedia {
  icon: string;
  link: string;
  handler: string;
}

/**
 * The author information.
 * @typedef {Interface} Author
 * @property {string} name the name of the author.
 * @property {string} email the email of the author.
 * @property {string} [biography] the biography of the author.
 * @property {string} [credentials] the credentials of the author.
 * @property {{ social: SocialMedias }} social the social media information.
 *
 * @public
 * @interface
 */
export interface Author {
  name: string;
  email: string;
  biography?: string;
  credentials?: string;
  social: Partial<Record<SocialMedias, SocialMedia>>;
}

/**
 * The author information.
 * @typedef {Interface} Author
 * @property {{ author: Author }}} author the author information.
 *
 * @public
 * @interface
 */
export interface Profile extends Record<"profile", Author> {}

/**
 * The site information.
 * @typedef {Interface} Site
 * @property {string} url the url of the site.
 * @property {string} title the title of the site.
 * @property {string} description the description of the site.
 *
 * @public
 * @interface
 */
export interface Site {
  url: string;
  title: string;
  description: string;
}

/**
 * The path information.
 * @typedef {Interface} Paths
 * @property {Object} paths the important paths of the site.
 *
 * @public
 * @interface
 */
export interface Paths extends Record<"paths", { content: string }> {}

/**
 * The metadata information.
 * @typedef {Type} Metadata
 * @property {Site & Paths & Profile} metadata the metadata.
 *
 * @public
 * @type
 */
export type Metadata = Site & Paths & Profile;

/**
 * An object that has a total count.
 * @typedef {Interface} Countable
 * @property {number} totalCount the total count of elements.
 *
 * @public
 * @interface
 */
export interface Countable {
  totalCount: number;
}

/**
 * @typedef {Object} Content
 * @property {Date} date the date of the post/tip.
 * @property {string} title the title of the post/tip.
 * @property {string[]} tags the tags of the post/tip.
 * @property {string} category whether this is a post or tip.
 * @property {string} [description] the description of the post/tip.
 * @property {string} [cover] a url to the image to be used.
 */

/**
 * @typedef {Object} Fields
 * @property {string} slug the url of the post/tip.
 * @property {Suggestion[]} [suggestions] the suggestions to the post/tip.
 */

/**
 * @typedef {Object} Suggestion
 * @property {string} slug the url of the suggested post/tip.
 * @property {string} title the title of the suggested post/tip.
 * @property {string} [description] the description of the suggested post/tip.
 */

/**
 * The entry information.
 * Could be either a post or a tip.
 * @typedef {Interface} Entry
 * @property {string} [html] the html of the post/tip.
 * @property {string} [excerpt] the excerpt of the post/tip.
 * @property {string} [timeToRead] the time it will take to read the post/tip.
 * @property {Content} content the content of the post/tip.
 * @property {Fields} fields the fields of the post/tip.
 *
 * @public
 * @interface
 */
export interface Entry {
  html?: string;
  excerpt?: string;
  timeToRead?: string;
  content: {
    date: Date;
    title: string;
    tags: string[];
    category: string;
    description?: string;
    cover?: string;
  };
  fields: {
    slug: string;
    suggestions?: [
      {
        slug: string;
        title: string;
        description?: string;
      }
    ];
  };
}

/**
 * A set of entries (posts or tips)
 * @typedef {Countable} Entries
 * @property {Array<{ entry: Entry }>} entries the entries.
 *
 * @public
 * @interface
 */
export interface Entries extends Countable {
  entries: Array<Record<"entry", Entry>>;
}

/**
 * A set of posts.
 * @typedef {Interface} Posts
 * @property {Entries} posts the posts.
 *
 * @public
 * @interface
 */
export interface Posts extends Record<"posts", Entries> {}

/**
 * A set of snippets.
 * @typedef {Interface} Snippets
 * @property {Entries} snippets the snippets.
 *
 * @public
 * @interface
 */
export interface Snippets extends Record<"snippets", Entries> {}

/**
 * The data object from a graphql query.
 * @typedef {Interface} GraphResult
 * @property {T} data the data item.
 *
 * @public
 * @interface
 */
export interface GraphResult<T> {
  data: T;
  children: any;
}
