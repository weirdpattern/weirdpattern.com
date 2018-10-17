import * as React from "react";

import { chunk } from "lodash";

import PostPreview from "./PostPreview";
import { getCommonActions } from "../utils";
import { Action, QueryPost, Metadata } from "../interfaces";

/**
 * Properties of the scrollable panel component.
 * @typedef {Interface} Props
 * @property {Array<{ post: QueryPost }>} entries the entries to be displayed.
 * @property {Metadata} metadata the site metadata.
 * @property {boolean} checkProgressiveLoad
 *    a flag indicating the component needs to check for progressive load.
 *
 * @private
 * @interface
 */
interface Props {
  entries: Array<{ post: QueryPost }>;
  metadata: Metadata;
  checkProgressiveLoad: boolean;
}

/**
 * State of the scrollable panel component.
 * @typedef {Interface} State
 * @property {number} numberOfEntries
 *    the current number of entries being displayed.
 * @property {boolean} loadMoreVisible
 *    a flag indicating the load more button visible state.
 * @property {boolean} progressiveLoad
 *    a flag indicating progressive load has been activated.
 */
interface State {
  numberOfEntries: number;
  loadMoreVisible: boolean;
  progressiveLoad: boolean;
}

/**
 * Entries component.
 *
 * @public
 * @class
 */
export default class Entries extends React.PureComponent<Props, State> {
  // the page size
  private incrementsBy: number = 5;

  /**
   * Class constructor.
   * @param {Props} props the properties of the component.
   */
  public constructor(props: Props) {
    super(props);

    this.incrementsBy =
      this.props.metadata.posts.incrementsBy || this.incrementsBy;

    this.state = {
      numberOfEntries:
        this.props.metadata.posts.initialSize || this.incrementsBy,
      loadMoreVisible: this.props.entries.length > this.incrementsBy,
      progressiveLoad: false
    };

    this.loadMoreHandler = this.loadMoreHandler.bind(this);
  }

  /** @inheritdoc */
  public static getDerivedStateFromProps(
    nextProps: Props,
    prevState: State
  ): State | null {
    if (prevState.progressiveLoad && nextProps.checkProgressiveLoad) {
      const incrementsBy = nextProps.metadata.posts.incrementsBy || 5;
      return {
        numberOfEntries: prevState.numberOfEntries + incrementsBy,
        loadMoreVisible: !nextProps.metadata.posts.loadOnScroll,
        progressiveLoad: nextProps.metadata.posts.loadOnScroll
      };
    }

    return null;
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <div className="post-list">
          {chunk(
            this.props.entries.slice(0, this.state.numberOfEntries),
            this.incrementsBy
          ).map((piece: Array<{ post: QueryPost }>, index: number) => {
            return (
              <React.Fragment key={index}>
                {piece.map((data: { post: QueryPost }) => {
                  return (
                    <PostPreview key={data.post.fields.slug} data={data.post} />
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
        {this.state.loadMoreVisible && (
          <div className="load-container">
            <button className="load-more" onClick={this.loadMoreHandler}>
              Load More
            </button>
          </div>
        )}
      </React.Fragment>
    );
  }

  /**
   * Handles the load more events.
   * @returns {void}
   *
   * @private
   * @method
   */
  private loadMoreHandler(): void {
    this.setState({
      numberOfEntries: this.state.numberOfEntries + this.incrementsBy,
      loadMoreVisible: !this.props.metadata.posts.loadOnScroll,
      progressiveLoad: this.props.metadata.posts.loadOnScroll
    });
  }
}
