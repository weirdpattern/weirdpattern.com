import * as React from "react";

import LatestEntries from "../components/LatestEntries";
import { GraphResult, Markdowns, Entry, TagCount } from "../interfaces";

const hasOwnProperty = Object.prototype.hasOwnProperty;

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

    const tags: TagCount = markdowns.entries.reduce(
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
        <div className="container">
          <div className="columns">
            <div className="column is-three-quarters">
              <LatestEntries entries={markdowns.entries.map(e => e.entry)} />
            </div>
            <div className="column is-one-quarter" />
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
