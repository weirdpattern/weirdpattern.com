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
export interface Paths {
  paths: {
    content: string;
  };
}

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
 * The social media available channels,
 * @typedef {Interface} SocialMedias
 * @property {Object} social the available social media networks.
 *
 * @public
 * @interface
 */
export interface Social {
  social: {
    github?: SocialMedia;
    twitter?: SocialMedia;
    facebook?: SocialMedia;
    linkedIn?: SocialMedia;
    googleplus?: SocialMedia;
  };
}

/**
 * The site metadata.
 * @typedef {Interface} SiteMetadata
 * @property {} site the site metadata.
 *
 * @public
 * @interface
 */
export interface SiteMetadata {
  site: {
    metadata: Site & Paths & Social;
  };
}

export interface Post {
  post: {
    html: string;
    excerpt: string;
    timeToRead: string;
    content: {
      title: string;
      tags: string[];
      category: string;
      cover: string;
      date: Date;
    };
    navigation: {
      slug: string;
      suggestions: [
        {
          slug: string;
          title: string;
        }
      ];
    };
  };
}

export interface Posts {
  posts: {
    edges: [
      {
        node: {
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
        };
      }
    ];
  };
}
