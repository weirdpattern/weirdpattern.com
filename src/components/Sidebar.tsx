import * as React from "react";

import { SocialMedia, SocialMedias } from "../interfaces";

/**
 * Sidebar props.
 * @typedef {Interface} Props
 * @property {string} title the title of the website.
 * @property {SocialMedias} [social] the social media information.
 *
 * @private
 * @interface
 */
interface Props {
  title: string;
  social?: SocialMedias;
}

/**
 * Sidebar component
 * @public
 * @class
 */
export default class Sidebar extends React.PureComponent<Props, {}> {
  /** @inheritdoc */
  public render() {
    const { title, social } = this.props;
    const content = (
      <React.Fragment>
        <h1 className="sidebar-title has-text-centered">{title}</h1>
        {social != null ? (
          <ul className="sidebar-social has-text-centered">
            {Object.values(social).map((value: SocialMedia, index: number) => {
              return (
                <li key={index}>
                  <i className={`fa ${value.icon}`} />
                </li>
              );
            })}
          </ul>
        ) : null}
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <div className="sidebar column is-one-quarter is-hidden-mobile">
          {content}
        </div>
        <div className="sidebar column is-hidden-tablet">{content}</div>
      </React.Fragment>
    );
  }
}
