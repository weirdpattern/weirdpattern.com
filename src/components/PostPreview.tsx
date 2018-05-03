import * as React from "react";
import * as classNames from "classnames";

import Link from "gatsby-link";
import { kebabCase } from "lodash";

import { QueryPost } from "../interfaces";

/**
 * Properties for the Header component.
 * @typedef {Interface} Props
 * @property {string} networks the networks of the author.
 *
 * @private
 * @interface
 */
interface Props {
  data: QueryPost;
}

/**
 * Post component.
 * @param {Props} props the properties of the component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the post.
 *
 * @public
 * @function
 */
export default function Post({ data }: Props): React.ReactElement<Props> {
  const postClasses = classNames("post", {
    post: data.content.category === "post",
    snippet: data.content.category === "snippet"
  });

  return (
    <React.Fragment>
      <div className={data.content.category}>
        <Link to={"/categories/" + kebabCase(data.content.category)}>
          {data.content.category}
        </Link>
      </div>
      <div className="post">
        <h1>
          <Link to={data.fields.slug}>{data.content.title}</Link>
        </h1>
        <div className="metadata">
          <div className="date">
            <i />
            <span>{data.content.date}</span>
          </div>
          <div className="reading-time">
            <i />
            <span>{data.timeToRead} min read</span>
          </div>
          <div className="tags">
            <i />
            {data.content.tags.sort().map((tag: string, index: number) => {
              return (
                <React.Fragment key={index}>
                  <span>
                    <Link to={"/tags/" + kebabCase(tag)}>{tag}</Link>
                  </span>
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html:
              data.content.category === "snippet" ? data.html : data.excerpt
          }}
        />
      </div>
    </React.Fragment>
  );
}
