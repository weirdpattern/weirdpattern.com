import * as React from "react";

import Link from "gatsby-link";
import { kebabCase } from "lodash";

import { QueryPost } from "../interfaces";

/**
 * Properties for the Metadata component.
 * @typedef {Interface} Props
 * @property {QueryPost} data the data of the post to be displayed.
 *
 * @private
 * @interface
 */
interface Props {
  data: QueryPost;
}

/**
 * Metadata component.
 * @param {Props} props the properties of the component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the metadata.
 *
 * @public
 * @function
 */
export default function Metadata({ data }: Props): React.ReactElement<Props> {
  return (
    <div className="metadata">
      <div className="date">
        <i />
        <span>{data.content.date}</span>
      </div>
      <div className="reading-time">
        <i />
        <span>{data.timeToRead} min read</span>
      </div>
      <div className="category">
        <i />
        <span>
          <Link to={"/categories/" + kebabCase(data.content.category)}>
            {data.content.category}
          </Link>
        </span>
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
  );
}
