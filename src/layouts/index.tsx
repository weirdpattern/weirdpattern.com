import "../scss/main.scss";
import "../scss/themes/prism-ayu-light.scss";

import * as React from "react";

import { Index } from "elasticlunr";

import * as data from "../../content/data.json";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";
import Actions from "../components/Actions";

import { copyToClipboard, getCommonActions } from "../utils";
import { Action, Query, SearchIndex } from "../interfaces";

const config = data as any;

/**
 * Layout props.
 * @typedef {Query<SearchIndex>} Props
 *
 * @private
 * @interface
 */
interface Props extends Query<SearchIndex> {}

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
  private index: any;

  /**
   * Class constructor.
   * @param {Props} props the properties of the layout.
   */
  public constructor(props: Props) {
    super(props);

    this.state = { actions: getCommonActions("search"), searching: false };
    this.keydownHandler = this.keydownHandler.bind(this);
    this.updateActions = this.updateActions.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
  }

  /** @inheritdoc */
  public componentDidMount(): void {
    this.index = this.index || Index.load(this.props.data.search.index);

    window.addEventListener("keydown", this.keydownHandler);

    Array.from(document.querySelectorAll(".gatsby-highlight")).forEach(
      (element: Element) => {
        const pre = element.querySelector("pre[class*='language-']");
        const language = pre.getAttribute("class").split("-")[1];

        const container = document.createElement("div");
        container.setAttribute("class", "code-header");

        const title = document.createElement("span");
        title.innerText =
          language.trim().toLowerCase() !== "text" ? language : "";

        const copy = document.createElement("div");
        copy.setAttribute("class", "copy");
        copy.addEventListener("click", () => {
          const text = pre.querySelector("code").innerText;
          copyToClipboard(text);

          copy.classList.add("success");
          setTimeout(() => {
            copy.classList.remove("success");
          }, 1000);
        });

        container.appendChild(title);
        container.appendChild(copy);

        pre.parentElement.insertBefore(container, pre);
      }
    );
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
    const author = config.authors[config.profile.author];

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
              title={config.title}
              description={config.description}
              name={author.name}
              email={author.email}
              credentials={author.credentials}
              avatar={author.avatar}
            />
            <Footer networks={author.networks} copyright={config.copyright} />
          </div>
          <div className="mainpanel">
            {children({
              ...this.props,
              postToShow: config.posts.postToShow,
              onUpdateActions: this.updateActions
            })}
          </div>
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

export const query = graphql`
  query SearchIndexQuery {
    search: siteSearchIndex {
      index
    }
  }
`;
