import "../scss/main.scss";
import "../scss/themes/ayu-light.scss";

import * as React from "react";

import { Index } from "elasticlunr";

import Header from "./Header";
import Footer from "./Footer";
import Search from "./Search";
import Actions from "./Actions";

import { getCommonActions } from "../utils";
import { Action, Metadata } from "../interfaces";

/**
 * Layout props.
 * @typedef {Interface} Props
 * @property {*} index the index to be used.
 * @property {Metadata} metadata the site metadata.
 * @property {Array<Action>} actions
 *    the actions to be used in the quick action button.
 *
 * @private
 * @interface
 */
interface Props {
  index: any;
  metadata: Metadata;
  actions: Array<Action>;
}

/**
 * Header state.
 * @typedef {Interface} State
 * @property {boolean} searching a flag indicating the user is searching.
 *
 * @private
 * @interface
 */
interface State {
  searching: boolean;
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

    this.state = {
      searching: false
    };

    this.keydownHandler = this.keydownHandler.bind(this);
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
    const { children, actions } = this.props;

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
              name={this.props.metadata.author.name}
              email={this.props.metadata.author.email}
              credentials={this.props.metadata.author.credentials}
              avatar={this.props.metadata.author.avatar}
            />
            <Footer
              networks={this.props.metadata.author.networks}
              copyright={this.props.metadata.copyright}
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
