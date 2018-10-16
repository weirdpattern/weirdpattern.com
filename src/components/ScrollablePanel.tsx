import * as React from "react";

import { getCommonActions } from "../utils";
import { Action, QueryPost, Metadata } from "../interfaces";

/**
 * Properties of the scrollable panel component.
 * @typedef {Interface} Props
 * @property {Array<{ post: QueryPost }>} entries the entries to be displayed.
 * @property {Metadata} metadata the site metadata.
 * @property {Function} onScroll the scroll handler.
 * @property {Function} onActionRefresh the action refresh handler.
 *
 * @private
 * @interface
 */
interface Props {
  entries: Array<{ post: QueryPost }>;
  metadata: Metadata;
  onScroll: (scrolled: boolean) => void;
  onActionRefresh: (actions: Array<Action>) => void;
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
 * Scrollabel panel component.
 *
 * @public
 * @class
 */
export default class ScollablePanel extends React.PureComponent<Props, State> {
  // control variable
  private ticking: boolean = false;

  // the page size
  private incrementsBy: number = 10;

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

    this.scrollHandler = this.scrollHandler.bind(this);
    this.loadMoreHandler = this.loadMoreHandler.bind(this);
  }

  /** @inheritdoc */
  public componentDidMount(): void {
    window.addEventListener("scroll", this.scrollHandler);
  }

  /** @inheritdoc */
  public componentWillUnmount(): void {
    window.removeEventListener("scroll", this.scrollHandler);
  }

  /**
   * Updates the existing list.
   * @returns {void}.
   *
   * @private
   * @method
   */
  private update(): void {
    const distanceToBottom =
      document.documentElement.offsetHeight -
      window.scrollY +
      window.innerHeight;

    if (this.state.progressiveLoad && distanceToBottom < 100) {
      this.loadMoreHandler();
    }

    if (document.documentElement.scrollTop > 0) {
      this.props.onScroll(true);
      this.props.onActionRefresh(
        getCommonActions(this.props.metadata, "scrollTop", "search")
      );
    } else {
      this.props.onScroll(false);
      this.props.onActionRefresh(
        getCommonActions(this.props.metadata, "search")
      );
    }

    this.ticking = false;
  }

  /**
   * Handles the scroll events.
   * @returns {void}.
   *
   * @private
   * @method
   */
  private scrollHandler(): void {
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => this.update());
    }
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
