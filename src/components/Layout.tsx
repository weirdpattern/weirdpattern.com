import "../scss/main.scss";
import "../scss/themes/ayu-light.scss";

import * as React from "react";

import { Index } from "elasticlunr";

import Header from "./Header";
import Footer from "./Footer";
import Search from "./Search";
import Actions from "./Actions";
import { Action, AuthorMetadata, Metadata } from "../interfaces";
import { getCommonActions } from "../utils";

/**
 * Layout props.
 * @typedef {Interface} Props
 * @property {*} index the index to be used.
 * @property {Metadata} metadata the site metadata.
 * @property {Array<string>} supportedActions
 *    the supported actions to be used in the quick action button.
 * @property {Function} onScroll the scroll handler.
 *
 * @private
 * @interface
 */
interface Props {
  index: any;
  metadata: Metadata;
  supportedActions: Array<string>;
  onScroll: (scrolled: boolean, callback: () => void) => void;
}

/**
 * Header state.
 * @typedef {Interface} State
 * @property {boolean} searching a flag indicating the user is searching.
 * @property {Array<Action>} actions
 *    the actions to be used in the quick action button.
 *
 * @private
 * @interface
 */
interface State {
  searching: boolean;
  actions: Array<Action>;
}

/**
 * Layout of the site.
 * @param {Function} children the children.
 * @returns {React.ReactNode} the react node that represents the layout.
 *
 * @public
 * @function
 */
export default class Layout extends React.PureComponent<Props, State> {
  // the site index
  private index: any;

  // control variable
  private ticking: boolean = false;

  /**
   * Class constructor.
   * @param {Props} props the properties of the layout.
   */
  public constructor(props: Props) {
    super(props);

    this.state = {
      searching: false,
      actions: getCommonActions(
        this.props.metadata,
        ...this.props.supportedActions
      )
    };

    this.keydownHandler = this.keydownHandler.bind(this);
    this.scrollHandler = this.scrollHandler.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
  }

  /** @inheritdoc */
  public componentDidMount(): void {
    this.index = this.index || Index.load(this.props.index);
    window.addEventListener("keydown", this.keydownHandler);
    window.addEventListener("scroll", this.scrollHandler);
  }

  /** @inheritdoc */
  public componentWillUnmount(): void {
    window.removeEventListener("keydown", this.keydownHandler);
    window.removeEventListener("scroll", this.scrollHandler);
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    const instance = this;
    const author = this.props.metadata.authors.find(
      (current: AuthorMetadata) => current.id === this.props.metadata.profile
    );

    return (
      <div className="container-fluid">
        <div className="page">
          <Search
            index={this.index}
            searching={this.state.searching}
            close={this.closeSearch}
          />
          <div className="sidepanel">
            <Header
              title={this.props.metadata.site.title}
              description={this.props.metadata.site.description}
              name={author.name}
              email={author.email}
              credentials={author.credentials}
              avatar={this.props.metadata.site.url + author.avatar}
            />
            <Footer
              networks={author.networks}
              copyright={this.props.metadata.copyright}
            />
          </div>
          <div className="mainpanel">{this.props.children}</div>
          <Actions
            actions={this.state.actions.map((action: Action) => {
              action.callback = action.callback.bind(instance);
              return action;
            })}
          />
        </div>
      </div>
    );
  }

  /**
   * Looks for search activation keys.
   * @param {React.KeyboardEvent<HTMLElement>} event the event.
   * @returns {void}
   *
   * @private
   * @method
   */
  private keydownHandler(event: KeyboardEvent): void {
    if (
      event.altKey &&
      event.shiftKey &&
      (event.key === "S" || event.keyCode === 83)
    ) {
      this.setState({ searching: true });

      event.preventDefault();
      event.cancelBubble = true;
    } else if (event.key === "Escape" || event.keyCode === 27) {
      this.setState({ searching: false });
    }
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
      const scrolled = document.documentElement.scrollTop > 0;
      requestAnimationFrame(() => {
        this.props.onScroll(scrolled, () => {
          const actions = scrolled
            ? getCommonActions(
                this.props.metadata,
                "scrollTop",
                ...this.props.supportedActions
              )
            : getCommonActions(
                this.props.metadata,
                ...this.props.supportedActions
              );

          this.setState({ actions });
          this.ticking = false;
        });
      });
    }
  }

  /**
   * Closes the search.
   * @returns {void}
   *
   * @private
   * @method
   */
  private closeSearch(): void {
    this.setState({ searching: false });
  }
}
