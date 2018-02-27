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
 * @property {SocialMedia} [github] the github channel.
 * @property {SocialMedia} [twitter] the twitter channel.
 * @property {SocialMedia} [facebook] the facebook channel.
 * @property {SocialMedia} [linkedIn] the linkedIn channel.
 * @property {SocialMedia} [googleplus] the google+ channel.
 */
export interface SocialMedias {
  github?: SocialMedia;
  tiwtter?: SocialMedia;
  facebook?: SocialMedia;
  linkedIn?: SocialMedia;
  googleplus?: SocialMedia;
}
