import * as React from "react";

import Summary from "../components/Summary";
import LatestEntries from "../components/LatestEntries";
import { GraphResult, Markdowns, Entry } from "../interfaces";

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Count by tag.
 * @typedef {Interface} TagCount
 *
 * @private
 * @interface
 */
interface TagCount {
  [key: string]: number;
}

/**
 * Index properties.
 * @typedef {Interface} Props
 *
 * @private
 * @interface
 */
interface Props extends GraphResult<Markdowns> {}

/**
 * Page component.
 *
 * @public
 * @class
 */
export default class Index extends React.Component<Props, {}> {
  /** @inheritdoc */
  public render(): React.ReactNode {
    const { markdowns = { entries: [] } } = this.props.data;

    const posts = markdowns.entries.filter(
      e => e.entry.content.category === "post"
    );

    const snippets = markdowns.entries.filter(
      e => e.entry.content.category === "snippet"
    );

    var tags = markdowns.entries.reduce(
      (reductor: TagCount, record: Record<"entry", Entry>): TagCount => {
        for (const tag in record.entry.content.tags) {
          if (hasOwnProperty.call(reductor, tag)) {
            reductor[tag]++;
          } else {
            reductor[tag] = 1;
          }
        }
        return reductor;
      },
      {}
    );

    return (
      <section className="body">
        <Summary posts={posts.length} snippets={snippets.length} />
        <div className="container">
          <div className="columns">
            <div className="column is-three-quarters">
              <LatestEntries
                posts={{ entries: posts }}
                snippets={{ entries: snippets }}
              />
            </div>
            <div className="column is-one-quarter">
              <Tags tags={tags} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export const query = graphql`
  query IndexQuery {
    markdowns: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      entries: edges {
        entry: node {
          excerpt
          content: frontmatter {
            title
            tags
            category
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
