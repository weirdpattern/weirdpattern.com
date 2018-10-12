import "../scss/main.scss";
import "../scss/themes/ayu-light.scss";

import * as React from "react";

import { Index } from "elasticlunr";

import Header from "./Header";
import Footer from "./Footer";
import Search from "./Search";
import Actions from "./Actions";

import { getCommonActions } from "../utils";
import {
  Action,
  SiteMetadata,
  CopyrightMetadata,
  AuthorMetadata
} from "../interfaces";

/**
 * Layout props.
 * @typedef {Interface} Props
 * @property {*} index the index to be used.
 * @property {SiteMetadata} site the site information.
 * @property {CopyrightMetadata} copyright the copyright information.
 * @property {AuthorMetadata} author the author information.
 *
 * @private
 * @interface
 */
interface Props {
  index: any;
  site: SiteMetadata;
  copyright: CopyrightMetadata;
  author: AuthorMetadata;
}

/**
 * Header state.
 * @typedef {Interface} State
 * @property {boolean} searching a flag indicating the user is searching.
 * @property {Array<Action>} actions the actions available in the page.
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

  /**
   * Class constructor.
   * @param {Props} props the properties of the layout.
   */
  public constructor(props: Props) {
    super(props);

    this.state = { searching: false, actions: getCommonActions("search") };

    this.keydownHandler = this.keydownHandler.bind(this);
    this.updateActions = this.updateActions.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
  }

  /** @inheritdoc */
  public componentDidMount(): void {
    this.index = this.index || Index.load(this.props.index);
    window.addEventListener("keydown", this.keydownHandler);
  }

  /** @inheritdoc */
  public componentWillUnmount(): void {
    window.addEventListener("keydown", this.keydownHandler);
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    const instance = this;
    const { children } = this.props;
    const { actions } = this.state;

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
              title={this.props.site.title}
              description={this.props.site.description}
              name={this.props.author.name}
              email={this.props.author.email}
              credentials={this.props.author.credentials}
              avatar={this.props.author.avatar}
            />
            <Footer
              networks={this.props.author.networks}
              copyright={this.props.copyright}
            />
          </div>
          <div className="mainpanel">{children}</div>
          <Actions
            actions={actions.map((action: Action) => {
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
   * Updates the actions on the page.
   * @param {Array<Action>} actions the actions to be displayed.
   * @returns {void}
   *
   * @private
   * @method
   */
  private updateActions(actions: Array<Action>): void {
    this.setState({ actions });
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
