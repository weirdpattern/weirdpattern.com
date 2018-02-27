import * as React from "react";

import { SocialMedia, SocialMedias } from "../interfaces";

interface Props {
  title: string;
  social?: SocialMedias;
}

export default class Sidebar extends React.PureComponent<Props, {}> {
  /** @inheritdoc */
  public render() {
    const { title, social } = this.props;
    return (
      <section className="sidebar">
        <div className="sidebar-title">{{ title }}</div>
        {social != null && (
          <ul className="sidebar-social">
            {Object.values(social).map((value: SocialMedia, index: number) => {
              return <li key={index} className={`fab/${value.icon}`} />;
            })}
          </ul>
        )}
      </section>
    );
  }
}
