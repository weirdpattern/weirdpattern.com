import * as React from "react";
import Img from "gatsby-image";
import Link from "gatsby-link";

import { PostSuggestion } from "../interfaces";

/**
 * Properties of the LikeThis Component.
 * @typedef {Interface} Props
 * @property {Array<PostSuggestion>} suggestions the suggested posts.
 *
 * @private
 * @interface
 */
interface Props {
  suggestions: Array<PostSuggestion>;
}

/**
 * LikeThis component.
 * @param {Props} props the properties of the component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the like this.
 *
 * @public
 * @function
 */
export default function LikeThis({
  suggestions
}: Props): React.ReactElement<{}> {
  return (
    <div className="like-this">
      <hr />
      <h4>You may also want to check out</h4>
      <div className="container">
        <div className="row">
          {suggestions
            .slice(0, 5)
            .map((suggestion: PostSuggestion, index: number) => {
              return (
                <div key={index} className="col-sm-4 suggestion">
                  <Link to={suggestion.slug}>
                    <Img
                      title={suggestion.abstract}
                      alt={suggestion.abstract}
                      sizes={suggestion.image.childImageSharp.sizes}
                    />
                    {suggestion.title}
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
