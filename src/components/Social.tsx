import * as React from "react";
import * as data from "../../content/data.json";

import { SocialMedias, SocialMedia } from "../interfaces";

const config = data as any;

/**
 * Social component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the social.
 *
 * @public
 * @function
 */
export default function Social(): React.ReactElement<{}> {
  return (
    <div className="social">
      <div
        className="network"
        style={{
          color: config.colors["github-fg"],
          backgroundColor: config.colors["github-bg"]
        }}
      >
        <a
          href={config.profile.social.github.link}
          title={config.profile.social.github.handler}
        >
          <span className={"fa " + config.profile.social.github.icon} />
        </a>
      </div>
      <div
        className="network"
        style={{
          color: config.colors["twitter-fg"],
          backgroundColor: config.colors["twitter-bg"]
        }}
      >
        <a
          href={config.profile.social.twitter.link}
          title={config.profile.social.twitter.handler}
        >
          <span className={"fa " + config.profile.social.twitter.icon} />
        </a>
      </div>
      <div
        className="network"
        style={{
          color: config.colors["linkedin-fg"],
          backgroundColor: config.colors["linkedin-bg"]
        }}
      >
        <a
          href={config.profile.social.linkedin.link}
          title={config.profile.social.linkedin.handler}
        >
          <span className={"fa " + config.profile.social.linkedin.icon} />
        </a>
      </div>
      <div
        id="email"
        className="network"
        style={{
          color: config.colors["email-fg"],
          backgroundColor: config.colors["email-bg"]
        }}
      >
        <a href={"mailto:" + config.profile.email} title={config.profile.email}>
          <span className="fa fa-envelope" />
        </a>
      </div>
    </div>
  );
}
